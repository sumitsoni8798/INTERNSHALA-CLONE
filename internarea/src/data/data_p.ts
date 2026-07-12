/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { User, Post } from '../types/types_p';

// ============================================================
// Reliable Professional Image URLs (Unsplash, guaranteed to work)
// ============================================================
const PROFESSIONAL_AVATARS = [
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop',    // Man 1
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop',    // Woman 1
  'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop',    // Man 2
  'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop',    // Woman 2
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop',    // Man 3
  'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop',      // Woman 3
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop',    // Woman 4
  'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop',    // Woman 5
  'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&h=150&fit=crop',    // Man 4
  'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&h=150&fit=crop',    // Man 5
  'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&h=150&fit=crop',    // Man 6
  'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=150&h=150&fit=crop',    // Woman 6
  'https://images.unsplash.com/photo-1548142813-c348350df52b?w=150&h=150&fit=crop',      // Woman 7
  'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150&h=150&fit=crop',    // Woman 8
];

const PROFESSIONAL_POST_IMAGES = [
  'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80',              // Coding setup
  'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&q=80',              // Team coding
  'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80',              // Team meeting
  'https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=800&q=80',              // Desk setup
  'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&q=80',              // Office team
  'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&q=80',              // Hackathon
  'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&q=80',              // Office interior
  'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&q=80',              // Studying/laptop
  'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&q=80',              // Laptop coding
  'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',              // Data dashboard
  'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&q=80',                 // Whiteboard strategy
  'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80',              // Workspace desk
  'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=800&q=80',              // Presentation
  'https://images.unsplash.com/photo-1531545514256-b1400bc00f31?w=800&q=80',              // Conference
  'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&q=80',              // Code on screen
  'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80',              // Certificate
  'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&q=80',                 // Team presentation
  'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&q=80',              // College event
  'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&q=80',              // Workshop
  'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&q=80',              // Tech team
];

const PROFESSIONAL_VIDEOS = [
  {
    url: 'https://assets.mixkit.co/videos/preview/mixkit-man-working-on-a-laptop-in-a-modern-office-31549-large.mp4',
    poster: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&q=80'
  },
  {
    url: 'https://assets.mixkit.co/videos/preview/mixkit-hacker-typing-on-computer-while-using-his-phone-37678-large.mp4',
    poster: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&q=80'
  },
  {
    url: 'https://assets.mixkit.co/videos/preview/mixkit-young-woman-working-on-a-laptop-in-a-cozy-cafe-44481-large.mp4',
    poster: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&q=80'
  },
];

// Use a local placeholder as fallback
const PLACEHOLDER_AVATAR = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop';

function seededRandom(index: number): number {
  const x = Math.sin(index + 1) * 10000;
  return x - Math.floor(x);
}

function pickImage(index: number): string {
  return PROFESSIONAL_POST_IMAGES[index % PROFESSIONAL_POST_IMAGES.length];
}

function pickAvatar(index: number): string {
  return PROFESSIONAL_AVATARS[index % PROFESSIONAL_AVATARS.length];
}

function pickVideo(index: number): { url: string; poster: string } {
  return PROFESSIONAL_VIDEOS[index % PROFESSIONAL_VIDEOS.length];
}

function hoursAgo(hours: number): string {
  return new Date(Date.now() - 3600000 * hours).toISOString();
}

// ============================================================
// Professional LinkedIn-style Seed Posts
// ============================================================
export const PRELOADED_POSTS: Post[] = [
  {
    id: 'post_1',
    userId: 'user_jordan',
    userName: 'Priya Sharma',
    userAvatar: pickAvatar(1),
    content: 'publicSpace.seedTexts.0',
    mediaUrl: pickImage(0),
    mediaType: 'image',
    createdAt: hoursAgo(2),
    likes: ['user_taylor', 'user_bailey', 'user_morgan', 'user_reagan', 'user_directory_1'],
    comments: [
      {
        id: 'comment_1_1',
        userId: 'user_taylor',
        userName: 'Rahul Verma',
        userAvatar: pickAvatar(0),
        content: 'publicSpace.seedTexts.0',
        createdAt: hoursAgo(1.5)
      },
      {
        id: 'comment_1_2',
        userId: 'user_bailey',
        userName: 'Ananya Patel',
        userAvatar: pickAvatar(2),
        content: 'publicSpace.seedTexts.1',
        createdAt: hoursAgo(1)
      }
    ],
    sharesCount: 12
  },
  {
    id: 'post_2',
    userId: 'user_morgan',
    userName: 'Arjun Mehta',
    userAvatar: pickAvatar(3),
    content: 'publicSpace.seedTexts.1',
    mediaUrl: pickImage(5),
    mediaType: 'image',
    createdAt: hoursAgo(6),
    likes: ['user_jordan', 'user_reagan', 'user_taylor', 'user_directory_3', 'user_directory_5'],
    comments: [
      {
        id: 'comment_2_1',
        userId: 'user_alex',
        userName: 'Vikram Singh',
        userAvatar: pickAvatar(4),
        content: 'publicSpace.seedTexts.2',
        createdAt: hoursAgo(5)
      }
    ],
    sharesCount: 24
  },
  {
    id: 'post_3',
    userId: 'user_reagan',
    userName: 'Sneha Kapoor',
    userAvatar: pickAvatar(5),
    content: 'publicSpace.seedTexts.2',
    mediaUrl: pickImage(7),
    mediaType: 'image',
    createdAt: hoursAgo(12),
    likes: ['user_jordan', 'user_morgan', 'user_taylor', 'user_bailey', 'user_directory_2'],
    comments: [
      {
        id: 'comment_3_1',
        userId: 'user_jordan',
        userName: 'Priya Sharma',
        userAvatar: pickAvatar(1),
        content: 'publicSpace.seedTexts.3',
        createdAt: hoursAgo(11)
      },
      {
        id: 'comment_3_2',
        userId: 'user_bailey',
        userName: 'Ananya Patel',
        userAvatar: pickAvatar(2),
        content: 'publicSpace.seedTexts.4',
        createdAt: hoursAgo(10)
      }
    ],
    sharesCount: 18
  },
  {
    id: 'post_4',
    userId: 'user_taylor',
    userName: 'Rahul Verma',
    userAvatar: pickAvatar(0),
    content: 'publicSpace.seedTexts.3',
    mediaUrl: pickImage(15),
    mediaType: 'image',
    createdAt: hoursAgo(18),
    likes: ['user_jordan', 'user_reagan', 'user_morgan', 'user_directory_4', 'user_directory_6'],
    comments: [
      {
        id: 'comment_4_1',
        userId: 'user_jordan',
        userName: 'Priya Sharma',
        userAvatar: pickAvatar(1),
        content: 'publicSpace.seedTexts.5',
        createdAt: hoursAgo(16)
      }
    ],
    sharesCount: 45
  },
  {
    id: 'post_5',
    userId: 'user_bailey',
    userName: 'Ananya Patel',
    userAvatar: pickAvatar(2),
    content: 'publicSpace.seedTexts.4',
    mediaUrl: pickImage(1),
    mediaType: 'image',
    createdAt: hoursAgo(24),
    likes: ['user_taylor', 'user_jordan', 'user_reagan', 'user_directory_7'],
    comments: [
      {
        id: 'comment_5_1',
        userId: 'user_taylor',
        userName: 'Rahul Verma',
        userAvatar: pickAvatar(0),
        content: 'publicSpace.seedTexts.6',
        createdAt: hoursAgo(22)
      }
    ],
    sharesCount: 8
  },
  {
    id: 'post_6',
    userId: 'user_alex',
    userName: 'Vikram Singh',
    userAvatar: pickAvatar(4),
    content: 'publicSpace.seedTexts.5',
    mediaUrl: pickVideo(0).url,
    mediaType: 'video',
    createdAt: hoursAgo(30),
    likes: ['user_jordan', 'user_morgan', 'user_directory_1', 'user_directory_8'],
    comments: [
      {
        id: 'comment_6_1',
        userId: 'user_morgan',
        userName: 'Arjun Mehta',
        userAvatar: pickAvatar(3),
        content: 'publicSpace.seedTexts.7',
        createdAt: hoursAgo(28)
      }
    ],
    sharesCount: 5
  },
  {
    id: 'post_7',
    userId: 'user_directory_1',
    userName: 'Neha Gupta',
    userAvatar: pickAvatar(6),
    content: 'publicSpace.seedTexts.6',
    mediaUrl: pickImage(13),
    mediaType: 'image',
    createdAt: hoursAgo(36),
    likes: ['user_taylor', 'user_jordan', 'user_reagan', 'user_bailey', 'user_directory_3'],
    comments: [
      {
        id: 'comment_7_1',
        userId: 'user_taylor',
        userName: 'Rahul Verma',
        userAvatar: pickAvatar(0),
        content: 'publicSpace.seedTexts.8',
        createdAt: hoursAgo(34)
      }
    ],
    sharesCount: 32
  },
  {
    id: 'post_8',
    userId: 'user_directory_3',
    userName: 'Ishaan Patel',
    userAvatar: pickAvatar(7),
    content: 'publicSpace.seedTexts.7',
    mediaUrl: pickImage(16),
    mediaType: 'image',
    createdAt: hoursAgo(48),
    likes: ['user_alex', 'user_jordan', 'user_morgan', 'user_directory_5'],
    comments: [
      {
        id: 'comment_8_1',
        userId: 'user_alex',
        userName: 'Vikram Singh',
        userAvatar: pickAvatar(4),
        content: 'publicSpace.seedTexts.9',
        createdAt: hoursAgo(46)
      }
    ],
    sharesCount: 15
  },
  {
    id: 'post_9',
    userId: 'user_directory_5',
    userName: 'Kavya Nair',
    userAvatar: pickAvatar(8),
    content: 'publicSpace.seedTexts.8',
    mediaUrl: pickImage(17),
    mediaType: 'image',
    createdAt: hoursAgo(60),
    likes: ['user_jordan', 'user_taylor', 'user_bailey', 'user_reagan', 'user_directory_7', 'user_directory_8'],
    comments: [
      {
        id: 'comment_9_1',
        userId: 'user_jordan',
        userName: 'Priya Sharma',
        userAvatar: pickAvatar(1),
        content: 'publicSpace.seedTexts.0',
        createdAt: hoursAgo(58)
      }
    ],
    sharesCount: 28
  },
  {
    id: 'post_10',
    userId: 'user_directory_2',
    userName: 'Rohan Desai',
    userAvatar: pickAvatar(9),
    content: 'publicSpace.seedTexts.9',
    mediaUrl: pickImage(9),
    mediaType: 'image',
    createdAt: hoursAgo(72),
    likes: ['user_taylor', 'user_bailey', 'user_directory_4'],
    comments: [
      {
        id: 'comment_10_1',
        userId: 'user_bailey',
        userName: 'Ananya Patel',
        userAvatar: pickAvatar(2),
        content: 'publicSpace.seedTexts.1',
        createdAt: hoursAgo(70)
      }
    ],
    sharesCount: 10
  },
  {
    id: 'post_11',
    userId: 'user_directory_4',
    userName: 'Aditi Krishnan',
    userAvatar: pickAvatar(10),
    content: 'publicSpace.seedTexts.0',
    mediaUrl: pickImage(10),
    mediaType: 'image',
    createdAt: hoursAgo(84),
    likes: ['user_jordan', 'user_morgan', 'user_taylor', 'user_directory_6'],
    comments: [
      {
        id: 'comment_11_1',
        userId: 'user_morgan',
        userName: 'Arjun Mehta',
        userAvatar: pickAvatar(3),
        content: 'publicSpace.seedTexts.2',
        createdAt: hoursAgo(82)
      }
    ],
    sharesCount: 20
  },
  {
    id: 'post_12',
    userId: 'user_directory_7',
    userName: 'Meera Joshi',
    userAvatar: pickAvatar(11),
    content: 'publicSpace.seedTexts.1',
    mediaUrl: pickImage(19),
    mediaType: 'image',
    createdAt: hoursAgo(96),
    likes: ['user_jordan', 'user_reagan', 'user_alex', 'user_bailey', 'user_directory_1', 'user_directory_3'],
    comments: [
      {
        id: 'comment_12_1',
        userId: 'user_alex',
        userName: 'Vikram Singh',
        userAvatar: pickAvatar(4),
        content: 'publicSpace.seedTexts.3',
        createdAt: hoursAgo(94)
      },
      {
        id: 'comment_12_2',
        userId: 'user_reagan',
        userName: 'Sneha Kapoor',
        userAvatar: pickAvatar(5),
        content: 'publicSpace.seedTexts.4',
        createdAt: hoursAgo(92)
      }
    ],
    sharesCount: 55
  },
  {
    id: 'post_13',
    userId: 'user_directory_6',
    userName: 'Arjun Nair',
    userAvatar: pickAvatar(12),
    content: 'publicSpace.seedTexts.2',
    mediaUrl: pickImage(3),
    mediaType: 'image',
    createdAt: hoursAgo(108),
    likes: ['user_jordan', 'user_taylor', 'user_alex', 'user_directory_8'],
    comments: [
      {
        id: 'comment_13_1',
        userId: 'user_alex',
        userName: 'Vikram Singh',
        userAvatar: pickAvatar(4),
        content: 'publicSpace.seedTexts.5',
        createdAt: hoursAgo(106)
      }
    ],
    sharesCount: 7
  },
  {
    id: 'post_14',
    userId: 'user_directory_8',
    userName: 'Pooja Reddy',
    userAvatar: pickAvatar(13),
    content: 'publicSpace.seedTexts.3',
    mediaUrl: pickImage(18),
    mediaType: 'image',
    createdAt: hoursAgo(120),
    likes: ['user_bailey', 'user_taylor', 'user_jordan', 'user_reagan', 'user_directory_1'],
    comments: [
      {
        id: 'comment_14_1',
        userId: 'user_bailey',
        userName: 'Ananya Patel',
        userAvatar: pickAvatar(2),
        content: 'publicSpace.seedTexts.6',
        createdAt: hoursAgo(118)
      }
    ],
    sharesCount: 38
  },
  {
    id: 'post_15',
    userId: 'user_reagan',
    userName: 'Sneha Kapoor',
    userAvatar: pickAvatar(5),
    content: 'publicSpace.seedTexts.4',
    mediaUrl: pickImage(6),
    mediaType: 'image',
    createdAt: hoursAgo(132),
    likes: ['user_jordan', 'user_morgan', 'user_taylor', 'user_alex', 'user_directory_2', 'user_directory_5'],
    comments: [
      {
        id: 'comment_15_1',
        userId: 'user_morgan',
        userName: 'Arjun Mehta',
        userAvatar: pickAvatar(3),
        content: 'publicSpace.seedTexts.7',
        createdAt: hoursAgo(130)
      }
    ],
    sharesCount: 62
  }
];

// Seed texts for random post generation (used via translations)
export const SEED_TEXTS = [
  'publicSpace.seedTexts.0',
  'publicSpace.seedTexts.1',
  'publicSpace.seedTexts.2',
  'publicSpace.seedTexts.3',
  'publicSpace.seedTexts.4',
  'publicSpace.seedTexts.5',
  'publicSpace.seedTexts.6',
  'publicSpace.seedTexts.7',
  'publicSpace.seedTexts.8',
  'publicSpace.seedTexts.9',
];

// ============================================================
// Professional Users
// ============================================================
export const PRESET_USERS: User[] = [
  {
    id: 'user_alex',
    name: 'Vikram Singh',
    username: 'vikram_singh',
    avatar: pickAvatar(4),
    friends: [],
    postsToday: [],
    bio: 'DevOps Engineer | Cloud Enthusiast | CI/CD pipelines, Kubernetes, and automation. Open to connecting with fellow engineers.',
    joinedDate: 'June 2026'
  },
  {
    id: 'user_bailey',
    name: 'Ananya Patel',
    username: 'ananya_patel',
    avatar: pickAvatar(2),
    friends: ['user_taylor'],
    postsToday: [],
    bio: 'Full Stack Developer | Next.js & React | Building web apps that make a difference. Passionate about tech education.',
    joinedDate: 'May 2026'
  },
  {
    id: 'user_taylor',
    name: 'Rahul Verma',
    username: 'rahul_verma',
    avatar: pickAvatar(0),
    friends: ['user_bailey', 'user_jordan'],
    postsToday: [],
    bio: 'AI/ML Researcher | NLP @ IIT Bombay | Published at ACL 2026 | Open source contributor.',
    joinedDate: 'March 2026'
  },
  {
    id: 'user_jordan',
    name: 'Priya Sharma',
    username: 'priya_sharma',
    avatar: pickAvatar(1),
    friends: [
      'user_bailey', 'user_taylor', 'user_morgan', 'user_reagan',
      'user_directory_1', 'user_directory_2', 'user_directory_3',
      'user_directory_4', 'user_directory_5', 'user_directory_6',
      'user_directory_7', 'user_directory_8'
    ],
    postsToday: [],
    bio: 'Software Engineer Intern @ Google | Cloud AI | Distributed Systems | Passionate about mentoring junior developers.',
    joinedDate: 'January 2025'
  }
];

// ============================================================
// Professional Directory Users
// ============================================================
export interface DirectoryUser {
  id: string;
  name: string;
  username: string;
  avatar: string;
  bio: string;
}

export const DIRECTORY_USERS: DirectoryUser[] = [
  {
    id: 'user_morgan',
    name: 'Arjun Mehta',
    username: 'arjun_mehta',
    avatar: pickAvatar(3),
    bio: 'ML Engineer | Hackathon winner | Building AI for social impact.'
  },
  {
    id: 'user_reagan',
    name: 'Sneha Kapoor',
    username: 'sneha_kapoor',
    avatar: pickAvatar(5),
    bio: 'SWE Intern @ Microsoft | Azure DevOps | Placement prep mentor.'
  },
  {
    id: 'user_directory_1',
    name: 'Neha Gupta',
    username: 'neha_gupta',
    avatar: pickAvatar(6),
    bio: 'Software Engineer | Go & gRPC | GDG speaker. Building scalable systems.'
  },
  {
    id: 'user_directory_2',
    name: 'Rohan Desai',
    username: 'rohan_desai',
    avatar: pickAvatar(9),
    bio: 'Frontend Developer | Next.js & Framer Motion | UI/UX enthusiast.'
  },
  {
    id: 'user_directory_3',
    name: 'Ishaan Patel',
    username: 'ishaan_patel',
    avatar: pickAvatar(7),
    bio: 'Cloud Architect | AWS Certified SA | Serverless & Microservices.'
  },
  {
    id: 'user_directory_4',
    name: 'Aditi Krishnan',
    username: 'aditi_krishnan',
    avatar: pickAvatar(10),
    bio: 'Data Science Intern @ Amazon | ML & Spark | Personalization algorithms.'
  },
  {
    id: 'user_directory_5',
    name: 'Kavya Nair',
    username: 'kavya_nair',
    avatar: pickAvatar(8),
    bio: 'Tech Event Organizer | College Fest Lead | Community builder.'
  },
  {
    id: 'user_directory_6',
    name: 'Arjun Nair',
    username: 'arjun_nair2',
    avatar: pickAvatar(12),
    bio: 'Remote Developer | Productivity geek | Clean code advocate.'
  },
  {
    id: 'user_directory_7',
    name: 'Meera Joshi',
    username: 'meera_joshi',
    avatar: pickAvatar(11),
    bio: 'Startup Founder | EdTech | AI Interview Coach. Raised seed funding.'
  },
  {
    id: 'user_directory_8',
    name: 'Pooja Reddy',
    username: 'pooja_reddy',
    avatar: pickAvatar(13),
    bio: 'ML Workshop Instructor | Python & AI | Making tech accessible.'
  }
];

// Helper to determine active user limits
export function getPostingLimitInfo(friendsCount: number): {
  limit: number | 'unlimited';
  label: string;
  description: string;
} {
  if (friendsCount === 0) {
    return {
      limit: 0,
      label: '0 posts/day (Restricted)',
      description: 'You cannot post content. Add a friend to unlock posting!'
    };
  } else if (friendsCount === 1) {
    return {
      limit: 1,
      label: '1 post/day',
      description: 'You can post once per day. Add another friend to increase your daily limit.'
    };
  } else if (friendsCount === 2) {
    return {
      limit: 2,
      label: '2 posts/day',
      description: 'You can post twice per day. Add more friends to widen your reach!'
    };
  } else if (friendsCount > 10) {
    return {
      limit: 'unlimited',
      label: 'Unlimited posts/day (Elite)',
      description: 'Amazing! Since you have over 10 friends, you have unlocked unlimited daily posting!'
    };
  } else {
    return {
      limit: friendsCount,
      label: `${friendsCount} posts/day`,
      description: `You have ${friendsCount} friends. Add more connections to get up to 10, or exceed 10 for completely Unlimited posting!`
    };
  }
}