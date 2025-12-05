import { BlogPost, Author } from "@/types/blog";

// Authors
export const blogAuthors: Author[] = [
  {
    id: "1",
    name: "Dr. Aminata Kamara",
    title: "Clinical Psychologist",
    bio: "Specializing in trauma-informed care and community mental health in Sierra Leone with over 15 years of experience.",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80",
    credentials: ["PhD in Clinical Psychology", "Licensed Therapist"],
    socialLinks: {
      twitter: "https://twitter.com/drkamara",
      linkedin: "https://linkedin.com/in/aminata-kamara",
    },
  },
  {
    id: "2",
    name: "Ibrahim Sesay",
    title: "Mental Health Advocate",
    bio: "Community organizer and lived experience advocate working to reduce stigma around mental health in Sierra Leone.",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80",
    credentials: ["Peer Support Specialist", "Community Health Worker"],
    socialLinks: {
      twitter: "https://twitter.com/isesay",
    },
  },
  {
    id: "3",
    name: "Dr. Fatmata Bangura",
    title: "Psychiatrist",
    bio: "Board-certified psychiatrist focusing on mood disorders and youth mental health services in Freetown.",
    avatar: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&q=80",
    credentials: ["MD Psychiatry", "Child & Adolescent Specialist"],
    socialLinks: {
      linkedin: "https://linkedin.com/in/fatmata-bangura",
    },
  },
  {
    id: "4",
    name: "Mohamed Conteh",
    title: "Social Worker",
    bio: "Licensed clinical social worker providing culturally-sensitive therapy and family counseling services.",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80",
    credentials: ["LCSW", "Family Therapy Certification"],
  },
];

// Mock Blog Posts
export const mockBlogPosts: BlogPost[] = [
  {
    id: "1",
    title: "Understanding Depression in Sierra Leone: Breaking the Silence",
    slug: "understanding-depression-sierra-leone",
    excerpt: "Depression affects millions across Sierra Leone, yet stigma keeps many from seeking help. Learn about the signs, cultural perspectives, and pathways to healing.",
    content: `# Understanding Depression in Sierra Leone: Breaking the Silence

Depression is one of the most common mental health conditions affecting people in Sierra Leone, yet it remains widely misunderstood and stigmatized. Many in our communities still view depression as a personal weakness or spiritual problem rather than a treatable medical condition.

## What is Depression?

Depression is more than just feeling sad. It's a serious mental health condition that affects how you think, feel, and function in daily life. Common symptoms include:

- Persistent sadness or empty mood
- Loss of interest in activities once enjoyed
- Changes in sleep patterns
- Fatigue and low energy
- Difficulty concentrating
- Changes in appetite
- Thoughts of death or suicide

## Cultural Context in Sierra Leone

In Sierra Leone, mental health challenges are often attributed to spiritual causes or seen as signs of weakness. This cultural context can make it difficult for people to recognize depression and seek appropriate help.

## Finding Help

If you or someone you know is experiencing symptoms of depression, know that help is available. OCSLAA offers:

- Free mental health screenings
- Connection to qualified therapists
- Support groups
- Crisis intervention services

Remember: seeking help is a sign of strength, not weakness. Recovery is possible, and you don't have to face this alone.

*If you're in crisis, please call our helpline immediately at [crisis number] or visit your nearest hospital.*`,
    category: "mental-health",
    tags: ["depression", "mental-health-awareness", "sierra-leone", "stigma"],
    author: blogAuthors[0],
    coverImage: "https://images.unsplash.com/photo-1543385426-191664295b58?w=1200&q=80",
    publishedAt: "2024-11-15T10:00:00Z",
    readTime: 7,
    featured: true,
    viewCount: 2450,
    likeCount: 186,
  },
  {
    id: "2",
    title: "5 Daily Practices for Better Mental Wellness",
    slug: "5-daily-practices-mental-wellness",
    excerpt: "Simple, evidence-based strategies you can incorporate into your daily routine to support your mental health and emotional well-being.",
    content: `# 5 Daily Practices for Better Mental Wellness

Building mental wellness is like building physical fitness - it requires consistent daily practices. Here are five evidence-based strategies that can make a real difference.

## 1. Morning Mindfulness (5 minutes)

Start your day with 5 minutes of mindfulness practice. This could be meditation, deep breathing, or simply sitting quietly with your thoughts.

## 2. Physical Movement

Even 20 minutes of walking can significantly improve your mood. Exercise releases endorphins and reduces stress hormones.

## 3. Connection Time

Reach out to at least one person daily - whether it's a friend, family member, or community member. Human connection is essential for mental health.

## 4. Gratitude Practice

Write down three things you're grateful for each day. This simple practice can shift your mindset and improve overall well-being.

## 5. Sleep Hygiene

Prioritize 7-8 hours of quality sleep. Maintain a consistent sleep schedule and create a calming bedtime routine.

## Making It Sustainable

Start with one practice and gradually add others. Small, consistent actions create lasting change.`,
    category: "wellness-tips",
    tags: ["self-care", "mental-wellness", "daily-habits", "mindfulness"],
    author: blogAuthors[1],
    coverImage: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=1200&q=80",
    publishedAt: "2024-11-20T08:30:00Z",
    readTime: 5,
    featured: true,
    viewCount: 3120,
    likeCount: 245,
  },
  {
    id: "3",
    title: "Anxiety in Young Adults: Recognition and Support",
    slug: "anxiety-young-adults-support",
    excerpt: "Anxiety disorders are increasingly common among young people in Sierra Leone. Learn how to recognize the signs and access support.",
    content: `# Anxiety in Young Adults: Recognition and Support

Anxiety disorders are among the most common mental health challenges facing young adults in Sierra Leone today. Understanding anxiety and knowing where to find help can make all the difference.

## What Does Anxiety Look Like?

Anxiety manifests differently in different people, but common signs include:

- Excessive worry that's hard to control
- Physical symptoms: racing heart, sweating, trembling
- Restlessness or feeling on edge
- Difficulty concentrating
- Sleep problems
- Avoiding situations that cause anxiety

## Why Are Young Adults Vulnerable?

Young adulthood brings unique stressors:
- Academic and career pressures
- Financial concerns
- Relationship challenges
- Identity formation
- Social media comparison

## Coping Strategies

**Immediate Relief:**
- Deep breathing exercises
- Grounding techniques (5-4-3-2-1 method)
- Physical activity
- Talking to a trusted person

**Long-term Management:**
- Therapy (especially CBT)
- Stress management techniques
- Building a support network
- Lifestyle modifications

## When to Seek Professional Help

If anxiety is interfering with daily life, work, or relationships, it's time to reach out to a mental health professional. OCSLAA can connect you with qualified therapists who understand the unique challenges young people face.

Remember: you're not alone, and help is available.`,
    category: "mental-health",
    tags: ["anxiety", "youth-mental-health", "coping-strategies", "young-adults"],
    author: blogAuthors[2],
    coverImage: "https://images.unsplash.com/photo-1527689368864-3a821dbccc34?w=1200&q=80",
    publishedAt: "2024-11-18T14:00:00Z",
    readTime: 6,
    featured: true,
    viewCount: 1890,
    likeCount: 142,
  },
  {
    id: "4",
    title: "My Journey Through PTSD: A Personal Story of Hope",
    slug: "ptsd-personal-story-hope",
    excerpt: "One survivor's journey through post-traumatic stress disorder and the path to healing. A story of resilience and recovery in Sierra Leone.",
    content: `# My Journey Through PTSD: A Personal Story of Hope

*By Ibrahim Sesay*

For years, I carried the weight of trauma silently. Like many in Sierra Leone, I thought my struggles were something I had to endure alone. Today, I'm sharing my story to let others know that healing is possible.

## The Beginning

The civil war left deep scars on many of us. I experienced events that no person should endure. For years afterward, I struggled with nightmares, flashbacks, and an overwhelming sense of fear that I couldn't shake.

## The Turning Point

It took me years to realize what I was experiencing had a name: Post-Traumatic Stress Disorder (PTSD). More importantly, it was treatable. The turning point came when a friend connected me with OCSLAA.

## The Healing Process

Recovery wasn't linear. Some days were harder than others. But with the help of a trauma-informed therapist, I learned:

- It wasn't my fault
- My reactions were normal responses to abnormal events
- I could learn to manage my symptoms
- Connection and community were essential to healing

## Tools That Helped Me

- Trauma-focused therapy
- Support groups with others who understood
- Grounding techniques for flashbacks
- Rebuilding trust in relationships
- Finding purpose in advocacy

## To Anyone Struggling

If you're living with trauma, please know:
- You're not alone
- What you're experiencing is real
- Help is available
- Recovery is possible
- Your story matters

Seeking help was the bravest thing I ever did. Today, I'm not just surviving - I'm thriving. And I want that for you too.

*OCSLAA offers trauma-informed care and support groups for trauma survivors. Reach out - we're here to help.*`,
    category: "personal-stories",
    tags: ["ptsd", "trauma", "recovery", "personal-story", "hope"],
    author: blogAuthors[1],
    coverImage: "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=1200&q=80",
    publishedAt: "2024-11-12T09:00:00Z",
    readTime: 8,
    featured: false,
    viewCount: 1650,
    likeCount: 198,
  },
  {
    id: "5",
    title: "Supporting a Loved One with Mental Illness: A Family Guide",
    slug: "supporting-loved-one-mental-illness-family-guide",
    excerpt: "Practical advice for families navigating mental health challenges. Learn how to provide effective support while maintaining your own well-being.",
    content: `# Supporting a Loved One with Mental Illness: A Family Guide

When someone you love is struggling with mental health challenges, it affects the entire family. This guide offers practical strategies for providing support while maintaining your own well-being.

## Understanding Your Role

As a family member, you're not a therapist, but you are an essential part of the support system. Your role is to:
- Provide emotional support
- Encourage professional help
- Maintain healthy boundaries
- Practice patience and understanding

## Do's and Don'ts

**Do:**
- Listen without judgment
- Educate yourself about their condition
- Encourage treatment
- Celebrate small victories
- Take care of yourself too

**Don't:**
- Blame them or tell them to "snap out of it"
- Take their symptoms personally
- Try to fix everything yourself
- Neglect your own mental health
- Share their private information without permission

## Communication Tips

- Use "I" statements: "I'm concerned about you" instead of "You're acting crazy"
- Ask how you can help rather than assuming
- Respect their autonomy and choices
- Be patient - recovery takes time

## When to Seek Emergency Help

Call for immediate help if your loved one:
- Talks about suicide or harming themselves
- Shows severe behavior changes
- Is unable to care for themselves
- Is a danger to others

## Resources for Families

OCSLAA offers:
- Family therapy sessions
- Support groups for caregivers
- Educational workshops
- Crisis intervention services

## Taking Care of Yourself

Remember: you can't pour from an empty cup. Make sure to:
- Maintain your own support network
- Set healthy boundaries
- Practice self-care
- Seek your own counseling if needed

Supporting a loved one with mental illness is challenging, but you don't have to do it alone. Reach out to OCSLAA for guidance and support.`,
    category: "community",
    tags: ["family-support", "caregiving", "mental-illness", "support-strategies"],
    author: blogAuthors[3],
    coverImage: "https://images.unsplash.com/photo-1511895426328-dc8714191300?w=1200&q=80",
    publishedAt: "2024-11-10T11:30:00Z",
    readTime: 7,
    featured: false,
    viewCount: 1420,
    likeCount: 107,
  },
  {
    id: "6",
    title: "The Connection Between Physical and Mental Health",
    slug: "connection-physical-mental-health",
    excerpt: "Understanding the powerful link between body and mind, and how holistic health approaches can improve overall well-being.",
    content: `# The Connection Between Physical and Mental Health

Your physical and mental health are deeply interconnected. Understanding this relationship can help you take a more holistic approach to wellness.

## The Mind-Body Connection

When you're stressed or anxious, your body responds with:
- Increased heart rate
- Muscle tension
- Digestive issues
- Weakened immune system
- Sleep problems

Similarly, physical health problems can contribute to mental health challenges like depression and anxiety.

## Exercise as Medicine

Regular physical activity is one of the most effective treatments for:
- Depression
- Anxiety
- Stress
- Low self-esteem

Even moderate exercise like walking 30 minutes daily can significantly improve mood.

## Nutrition Matters

What you eat affects your mental health. Foods that support brain health include:
- Omega-3 fatty acids (fish, nuts)
- Whole grains
- Fruits and vegetables
- Lean proteins

Limit: processed foods, excess sugar, and alcohol.

## Sleep is Essential

Poor sleep contributes to mental health problems, and mental health problems can disrupt sleep. Prioritize:
- 7-9 hours nightly
- Consistent sleep schedule
- Calming bedtime routine
- Sleep-friendly environment

## Chronic Illness and Mental Health

Living with chronic physical conditions increases risk for depression and anxiety. If you're managing a chronic illness:
- Acknowledge the emotional impact
- Seek mental health support
- Join support groups
- Practice self-compassion

## Taking a Holistic Approach

True wellness addresses both mind and body:
- Regular exercise
- Nutritious diet
- Adequate sleep
- Stress management
- Social connection
- Mental health care

OCSLAA's wellness programs integrate physical and mental health support to help you thrive in all areas of life.`,
    category: "wellness-tips",
    tags: ["holistic-health", "exercise", "nutrition", "mind-body-connection"],
    author: blogAuthors[0],
    coverImage: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200&q=80",
    publishedAt: "2024-11-08T10:00:00Z",
    readTime: 6,
    featured: false,
    viewCount: 1780,
    likeCount: 134,
  },
  {
    id: "7",
    title: "Understanding Grief and Loss in Our Communities",
    slug: "understanding-grief-loss-communities",
    excerpt: "Grief is a natural response to loss, but in Sierra Leone, cultural expectations can complicate the grieving process. Learn about healthy mourning and healing.",
    content: `# Understanding Grief and Loss in Our Communities

Grief is a universal human experience, yet how we grieve is deeply influenced by our culture and community. In Sierra Leone, understanding both traditional and mental health perspectives on grief can support healing.

## What is Grief?

Grief is the natural response to loss - whether that's the death of a loved one, loss of a relationship, job, health, or way of life. It's not a linear process and affects people differently.

## Common Grief Reactions

- Emotional: sadness, anger, guilt, numbness
- Physical: fatigue, sleep changes, appetite changes
- Cognitive: difficulty concentrating, confusion
- Behavioral: withdrawal, restlessness, crying

## Cultural Aspects of Grief in Sierra Leone

Our communities have rich traditions for honoring the dead and supporting the bereaved. These practices provide comfort and connection. However, some cultural expectations can complicate grief:

- Pressure to "be strong"
- Limited time for mourning before returning to normal life
- Stigma around expressing certain emotions
- Gendered expectations about grieving

## Healthy Grieving

There's no "right" way to grieve, but healthy grieving includes:
- Allowing yourself to feel emotions
- Accepting support from others
- Maintaining self-care
- Honoring your loss in meaningful ways
- Giving yourself time

## When Grief Becomes Complicated

Most people gradually adjust to loss. However, seek professional help if:
- Intense grief doesn't lessen over time
- You can't function in daily life
- You experience thoughts of self-harm
- You turn to substances to cope

## Supporting Someone Who's Grieving

- Be present - sometimes silence is enough
- Listen without trying to fix
- Offer practical help
- Remember significant dates
- Check in long-term - grief doesn't end after the funeral

## Community Support

OCSLAA offers:
- Grief counseling
- Bereavement support groups
- Memorial rituals and ceremonies
- Family therapy

Remember: grieving is not weakness. It's love with nowhere to go. Give yourself permission to mourn, heal, and eventually, find meaning again.`,
    category: "mental-health",
    tags: ["grief", "loss", "bereavement", "cultural-healing", "community-support"],
    author: blogAuthors[3],
    coverImage: "https://images.unsplash.com/photo-1473830394358-91588751b241?w=1200&q=80",
    publishedAt: "2024-11-05T13:00:00Z",
    readTime: 7,
    featured: false,
    viewCount: 1230,
    likeCount: 98,
  },
  {
    id: "8",
    title: "Breaking Mental Health Stigma: Why Language Matters",
    slug: "breaking-mental-health-stigma-language-matters",
    excerpt: "The words we use to talk about mental health shape attitudes and behaviors. Learn how thoughtful language can reduce stigma and promote healing.",
    content: `# Breaking Mental Health Stigma: Why Language Matters

The language we use when discussing mental health has real consequences. Words can either break down stigma or reinforce harmful stereotypes. Let's explore why language matters and how we can do better.

## The Problem with Stigmatizing Language

Common phrases that perpetuate stigma:
- "That's crazy" or "insane" as casual expressions
- "Schizophrenic" to mean indecisive
- "OCD" to describe being organized
- "Psycho" or "mental" as insults

These phrases:
- Trivialize serious conditions
- Reinforce stereotypes
- Discourage people from seeking help
- Cause pain to those living with mental illness

## Person-First Language

Instead of defining people by their condition:
- Say: "person with schizophrenia" not "schizophrenic"
- Say: "person living with depression" not "depressed person"
- Say: "died by suicide" not "committed suicide" (which implies crime)

This approach emphasizes that mental illness is something a person has, not who they are.

## Respectful Ways to Talk About Mental Health

**Instead of:** "suffering from mental illness"
**Try:** "living with a mental health condition"

**Instead of:** "crazy" or "insane"
**Try:** "unusual" or "unexpected"

**Instead of:** "attention-seeking"
**Try:** "expressing distress" or "asking for help"

## Impact in Our Communities

In Sierra Leone, stigmatizing language is often reinforced by:
- Lack of mental health education
- Cultural beliefs about mental illness
- Fear and misunderstanding
- Media portrayals

Changing language is one step toward changing attitudes.

## What You Can Do

1. **Educate yourself** about mental health conditions
2. **Speak up** when you hear stigmatizing language
3. **Share stories** that humanize mental illness
4. **Model** respectful language in your own speech
5. **Teach children** to talk about mental health compassionately

## Starting Conversations

If someone uses stigmatizing language:
- Assume good intentions
- Gently explain why the language is harmful
- Suggest alternatives
- Share personal experiences if comfortable

## Language in Crisis

When someone is in crisis, language is especially important:
- Avoid judgmental phrases
- Express concern, not alarm
- Use calm, clear communication
- Validate their feelings

## Moving Forward

Changing how we talk about mental health is an ongoing process. Be patient with yourself and others. Every conversation is an opportunity to reduce stigma and create a more supportive community.

At OCSLAA, we're committed to promoting respectful, accurate language about mental health. Join us in creating a culture where everyone feels safe seeking the help they need.`,
    category: "community",
    tags: ["stigma", "language", "awareness", "advocacy", "education"],
    author: blogAuthors[1],
    coverImage: "https://images.unsplash.com/photo-1488998527040-85054a85150e?w=1200&q=80",
    publishedAt: "2024-11-01T09:30:00Z",
    readTime: 6,
    featured: false,
    viewCount: 1560,
    likeCount: 127,
  },
  {
    id: "9",
    title: "Sleep and Mental Health: Why Rest Matters",
    slug: "sleep-mental-health-why-rest-matters",
    excerpt: "Poor sleep affects mental health, and mental health affects sleep. Break the cycle with evidence-based strategies for better rest.",
    content: `# Sleep and Mental Health: Why Rest Matters

Sleep and mental health have a bidirectional relationship: poor sleep contributes to mental health problems, and mental health problems disrupt sleep. Understanding this connection is key to breaking the cycle.

## How Sleep Affects Mental Health

Insufficient sleep increases risk for:
- Depression
- Anxiety disorders
- Mood swings
- Irritability
- Difficulty coping with stress
- Impaired judgment
- Reduced emotional regulation

## How Mental Health Affects Sleep

Mental health conditions commonly cause:
- Insomnia (trouble falling or staying asleep)
- Hypersomnia (excessive sleeping)
- Nightmares
- Restless sleep
- Disrupted sleep cycles

## The Science of Sleep

Adults need 7-9 hours of sleep per night. During sleep:
- The brain processes emotions and memories
- The body repairs itself
- Stress hormones decrease
- Neural connections strengthen

## Common Sleep Disruptors

- Stress and anxiety
- Depression
- PTSD and trauma
- Medications (some antidepressants affect sleep)
- Substance use
- Poor sleep habits

## Building Better Sleep Habits

**Consistency:**
- Go to bed and wake up at the same time daily
- Even on weekends

**Environment:**
- Dark, quiet, cool room
- Comfortable mattress and pillows
- Minimize electronic device use before bed

**Bedtime Routine:**
- Wind down 30-60 minutes before bed
- Relaxing activities: reading, gentle stretching, meditation
- Avoid screens (blue light disrupts melatonin)

**Daytime Habits:**
- Regular exercise (but not close to bedtime)
- Limit caffeine after noon
- Get natural daylight exposure
- Manage stress throughout the day

## When to Seek Help

Consult a healthcare provider if:
- Sleep problems persist for weeks
- Daytime functioning is impaired
- You suspect a sleep disorder (sleep apnea, restless leg syndrome)
- Sleep issues are affecting your mental health

## Treatment Options

Depending on the cause, treatment may include:
- Cognitive Behavioral Therapy for Insomnia (CBT-I)
- Addressing underlying mental health conditions
- Sleep hygiene education
- Relaxation techniques
- Medication (when appropriate)

## Sleep Tips for Specific Conditions

**For Anxiety:**
- Practice progressive muscle relaxation
- Try the 4-7-8 breathing technique
- Keep a worry journal before bed

**For Depression:**
- Maintain consistent sleep schedule
- Get morning sunlight exposure
- Gentle evening exercise

**For PTSD:**
- Create a safe sleep environment
- Address nightmares with imagery rehearsal therapy
- Practice grounding techniques before bed

## Community Resources

OCSLAA offers:
- Sleep hygiene education
- CBT-I groups
- Stress management workshops
- Mental health treatment that addresses sleep

Remember: quality sleep is not a luxury - it's essential for mental health. Prioritizing rest is an act of self-care that benefits every aspect of your life.`,
    category: "wellness-tips",
    tags: ["sleep", "insomnia", "mental-health", "sleep-hygiene", "rest"],
    author: blogAuthors[2],
    coverImage: "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=1200&q=80",
    publishedAt: "2024-10-28T08:00:00Z",
    readTime: 8,
    featured: false,
    viewCount: 1990,
    likeCount: 156,
  },
  {
    id: "10",
    title: "Building Resilience: Thriving Through Life's Challenges",
    slug: "building-resilience-thriving-through-challenges",
    excerpt: "Resilience is the ability to bounce back from adversity. Learn practical strategies to build resilience and thrive through difficult times.",
    content: `# Building Resilience: Thriving Through Life's Challenges

Resilience isn't something you're born with - it's a set of skills you can develop. In Sierra Leone, where many have faced significant adversity, building resilience is essential for mental health and well-being.

## What is Resilience?

Resilience is the ability to:
- Adapt to stress and adversity
- Recover from setbacks
- Find meaning in difficult experiences
- Maintain hope and purpose
- Grow through challenges

## Factors That Build Resilience

**1. Strong Relationships**
- Supportive family and friends
- Community connections
- Mentors and role models

**2. Positive Self-View**
- Self-confidence
- Recognition of personal strengths
- Belief in your ability to cope

**3. Effective Communication**
- Expressing needs and feelings
- Problem-solving skills
- Seeking and accepting help

**4. Emotional Regulation**
- Managing strong emotions
- Healthy coping strategies
- Self-awareness

**5. Sense of Purpose**
- Clear values and goals
- Contributing to something larger
- Finding meaning in experiences

## Practical Resilience-Building Strategies

### Cultivate Connections
- Nurture relationships with people who care about you
- Join community groups or organizations
- Help others - volunteering builds resilience

### Practice Self-Care
- Maintain physical health through exercise, nutrition, sleep
- Engage in activities you enjoy
- Practice relaxation techniques

### Develop Problem-Solving Skills
- Break problems into manageable steps
- Brainstorm multiple solutions
- Learn from past experiences
- Be flexible and willing to adapt

### Reframe Negative Thoughts
- Challenge catastrophic thinking
- Look for what you can control
- Find opportunities in difficulties
- Practice self-compassion

### Set Realistic Goals
- Identify what you want to achieve
- Break big goals into small steps
- Celebrate progress along the way
- Be patient with yourself

## Resilience in Sierra Leone Context

Our communities have demonstrated remarkable resilience through:
- Civil war recovery
- Ebola epidemic
- Economic challenges
- Natural disasters

Drawing on cultural strengths like:
- Strong family and community bonds
- Faith and spirituality
- Collective problem-solving
- Oral tradition and storytelling

## Teaching Children Resilience

Help children develop resilience by:
- Modeling healthy coping
- Encouraging independence
- Teaching problem-solving
- Maintaining routines and stability
- Validating emotions
- Fostering positive relationships

## When Resilience Isn't Enough

Sometimes challenges are too overwhelming to handle alone. Seek professional help if:
- You're using harmful coping methods
- Daily functioning is impaired
- Symptoms persist despite your efforts
- You experience thoughts of self-harm

Asking for help is itself an act of resilience.

## Moving Forward

Building resilience is an ongoing process. There will be setbacks - that's normal. What matters is continuing to practice resilience skills and reaching out for support when needed.

At OCSLAA, we offer:
- Resilience training workshops
- Support groups
- Individual therapy
- Community programs

Remember: you are stronger than you think. You have survived 100% of your worst days. With the right tools and support, you can not just survive future challenges - you can thrive.`,
    category: "wellness-tips",
    tags: ["resilience", "coping-skills", "mental-strength", "personal-growth", "adversity"],
    author: blogAuthors[0],
    coverImage: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=1200&q=80",
    publishedAt: "2024-10-25T10:30:00Z",
    readTime: 9,
    featured: false,
    viewCount: 2100,
    likeCount: 174,
  },
];

// Helper function to get posts by category
export const getPostsByCategory = (category: BlogPost["category"]): BlogPost[] => {
  return mockBlogPosts.filter((post) => post.category === category);
};

// Helper function to get featured posts
export const getFeaturedPosts = (): BlogPost[] => {
  return mockBlogPosts.filter((post) => post.featured);
};

// Helper function to get posts by author
export const getPostsByAuthor = (authorId: string): BlogPost[] => {
  return mockBlogPosts.filter((post) => post.author.id === authorId);
};

// Helper function to get posts by tag
export const getPostsByTag = (tag: string): BlogPost[] => {
  return mockBlogPosts.filter((post) => post.tags.includes(tag));
};

// Get all unique tags
export const getAllTags = (): string[] => {
  const tags = new Set<string>();
  mockBlogPosts.forEach((post) => {
    post.tags.forEach((tag) => tags.add(tag));
  });
  return Array.from(tags).sort();
};
