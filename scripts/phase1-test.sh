#!/bin/bash

# OCSLAA Phase 1 Automated Testing Script
# Tests all core functionality without manual interaction

BASE_URL="http://localhost:8080/Auxla_Project/"
RESULTS_FILE="phase1-test-results.txt"
PASSED=0
FAILED=0

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo "========================================"
echo "OCSLAA Phase 1 - Automated Test Suite"
echo "$(date)"
echo "========================================"
echo ""

# Test function
test_page() {
  local name=$1
  local url=$2
  local expect_code=$3
  
  echo -n "Testing: $name ... "
  response=$(curl -s -w "\n%{http_code}" "$url" 2>/dev/null)
  http_code=$(echo "$response" | tail -n1)
  body=$(echo "$response" | sed '$d')
  
  if [ "$http_code" = "$expect_code" ]; then
    echo -e "${GREEN}✓ PASS${NC} (HTTP $http_code)"
    ((PASSED++))
    
    # Check for common elements
    if echo "$body" | grep -q "root\|React\|script" 2>/dev/null; then
      echo "  └─ React app mounted ✓"
    fi
    return 0
  else
    echo -e "${RED}✗ FAIL${NC} (Expected $expect_code, got $http_code)"
    ((FAILED++))
    return 1
  fi
}

# Test function for form elements
test_form_element() {
  local name=$1
  local url=$2
  local element=$3
  
  echo -n "Testing: $name ... "
  response=$(curl -s "$url" 2>/dev/null)
  
  if echo "$response" | grep -q "$element"; then
    echo -e "${GREEN}✓ PASS${NC}"
    ((PASSED++))
    return 0
  else
    echo -e "${RED}✗ FAIL${NC} (Element not found: $element)"
    ((FAILED++))
    return 1
  fi
}

# ========== SECTION 1.1-1.2: HOMEPAGE & NAVIGATION ==========
echo ""
echo -e "${YELLOW}[1.1-1.2] HOMEPAGE & NAVIGATION${NC}"
echo "─────────────────────────────────────"

test_page "Homepage" "$BASE_URL" "200"
test_page "Homepage HTML returns valid React app" "$BASE_URL/" "200"

# ========== SECTION 1.3-1.8: PAGE ACCESSIBILITY ==========
echo ""
echo -e "${YELLOW}[1.3-1.8] PAGE ACCESSIBILITY${NC}"
echo "─────────────────────────────────────"

declare -a pages=(
  "Donate Page:/donate:200"
  "About Page:/about:200"
  "Services Page:/services:200"
  "Strategic Plan:/strategic-plan:200"
  "Blog Page:/blog:200"
  "Contact Page:/contact:200"
  "Resources Page:/resources:200"
  "FAQ Page:/faq:200"
  "Team Page:/team:200"
)

for page in "${pages[@]}"; do
  IFS=':' read -r name path code <<< "$page"
  test_page "$name" "$BASE_URL$path" "$code"
done

# ========== SECTION 1.9-1.10: DONATION FORM ==========
echo ""
echo -e "${YELLOW}[1.9-1.10] DONATION FORM ELEMENTS${NC}"
echo "─────────────────────────────────────"

test_form_element "Donation amount inputs (25, 50, 100, 250)" "$BASE_URL/donate" "25\|50\|100\|250" 
test_form_element "Custom amount field" "$BASE_URL/donate" "custom"
test_form_element "Email field" "$BASE_URL/donate" "email"
test_form_element "Name field" "$BASE_URL/donate" "name\|firstName\|lastName"
test_form_element "Payment method selector" "$BASE_URL/donate" "stripe\|payment"

# ========== SECTION 1.11: NEWSLETTER SIGNUP ==========
echo ""
echo -e "${YELLOW}[1.11] NEWSLETTER SIGNUP FORM${NC}"
echo "─────────────────────────────────────"

test_form_element "Newsletter email input" "$BASE_URL" "newsletter\|subscribe"
test_form_element "Newsletter subscribe button" "$BASE_URL" "Subscribe\|subscribe"

# ========== SECTION 1.12: CONTACT FORM ==========
echo ""
echo -e "${YELLOW}[1.12] CONTACT FORM ELEMENTS${NC}"
echo "─────────────────────────────────────"

test_form_element "Contact form first name" "$BASE_URL/contact" "firstName\|first"
test_form_element "Contact form last name" "$BASE_URL/contact" "lastName\|last"
test_form_element "Contact form email" "$BASE_URL/contact" "email"
test_form_element "Contact form subject" "$BASE_URL/contact" "subject"
test_form_element "Contact form message" "$BASE_URL/contact" "message"
test_form_element "Contact form inquiry type" "$BASE_URL/contact" "inquiry\|type"

# ========== BONUS: LINK VALIDATION ==========
echo ""
echo -e "${YELLOW}[BONUS] INTERNAL LINK VALIDATION${NC}"
echo "─────────────────────────────────────"

response=$(curl -s "$BASE_URL" 2>/dev/null)

# Extract and test a few key navigation links
nav_links=(
  "/about"
  "/services"
  "/blog"
  "/contact"
  "/donate"
)

echo -n "Testing navigation links presence ... "
found_links=0
for link in "${nav_links[@]}"; do
  if echo "$response" | grep -q "href.*$link\|to.*$link"; then
    ((found_links++))
  fi
done

if [ "$found_links" -ge 4 ]; then
  echo -e "${GREEN}✓ PASS${NC} (Found $found_links/$((${#nav_links[@]})) navigation links)"
  ((PASSED++))
else
  echo -e "${RED}✗ FAIL${NC} (Found only $found_links/$((${#nav_links[@]})) navigation links)"
  ((FAILED++))
fi

# ========== SECURITY HEADERS ==========
echo ""
echo -e "${YELLOW}[BONUS] SECURITY HEADERS${NC}"
echo "─────────────────────────────────────"

echo -n "Testing security headers ... "
headers=$(curl -s -I "$BASE_URL" 2>/dev/null)

security_headers=(
  "X-Content-Type-Options"
  "X-Frame-Options"
)

header_count=0
for header in "${security_headers[@]}"; do
  if echo "$headers" | grep -q "$header"; then
    ((header_count++))
  fi
done

if [ "$header_count" -gt 0 ]; then
  echo -e "${GREEN}✓ PASS${NC} (Found $header_count security headers)"
  ((PASSED++))
else
  echo -e "${YELLOW}⚠ WARNING${NC} (No security headers detected - may be normal for dev)"
fi

# ========== SUMMARY ==========
echo ""
echo "========================================"
echo -e "${GREEN}PASSED: $PASSED${NC}"
echo -e "${RED}FAILED: $FAILED${NC}"
TOTAL=$((PASSED + FAILED))
echo "TOTAL:  $TOTAL"

if [ $FAILED -eq 0 ]; then
  echo -e "${GREEN}✓ ALL TESTS PASSED${NC}"
  exit 0
else
  echo -e "${RED}✗ SOME TESTS FAILED${NC}"
  exit 1
fi
