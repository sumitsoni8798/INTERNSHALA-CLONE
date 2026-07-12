/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, MessageCircle, RotateCcw, Award, Globe, Heart, Share2, Plus, Info, CheckCircle, Flame } from 'lucide-react';
import { User, Post, Comment } from '../types/types_p';
import { PRELOADED_POSTS, PRESET_USERS, DIRECTORY_USERS, getPostingLimitInfo } from '../data/data_p';
import UserSelector from '../Components/UserSelector';
import NewPostForm from '../Components/NewPostForm';
import Feed from '../Components/Feed';
import FriendDirectory from '../Components/FriendDirectory';
import { useLanguage } from '../context/LanguageContext';

// Collection of scenic avatars for custom sandbox users
const CUSTOM_AVATARS = [
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150',
  'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&q=80&w=150',
  'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=150'
];

export default function App() {
  const { t } = useLanguage();
  // Master list of posts in the Public Space (persisted)
  const [posts, setPosts] = useState<Post[]>(() => {
    const saved = typeof window !== 'undefined' ? localStorage.getItem('ps_posts') : null;
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* fallback */ }
    }
    return PRELOADED_POSTS;
  });

  // Master list of all community accounts/presets (persisted)
  const [allUsers, setAllUsers] = useState<User[]>(() => {
    const saved = typeof window !== 'undefined' ? localStorage.getItem('ps_users') : null;
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* fallback */ }
    }
    return PRESET_USERS;
  });

  // Currently logged-in active profile ID
  const [currentUserId, setCurrentUserId] = useState<string>(() => {
    const saved = typeof window !== 'undefined' ? localStorage.getItem('ps_current_uid') : null;
    return saved || 'user_alex'; // Default to Devon (Alex Mercer) with 0 friends to test restrictions first
  });

  // State to track formatted time for the live clock (fixes hydration mismatch)
  const [time, setTime] = useState<string>('');

  useEffect(() => {
    const tick = () => {
      setTime(new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }));
    };
    tick();
    const timer = setInterval(tick, 1000);
    return () => clearInterval(timer);
  }, []);

  // Notification Toast state
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'info' | 'error' } | null>(null);

  // Active user object derived from the active ID
  const currentUser = allUsers.find(u => u.id === currentUserId) || allUsers[0];

  // Sync state with LocalStorage for flawless durable simulation
  useEffect(() => {
    localStorage.setItem('ps_posts', JSON.stringify(posts));
  }, [posts]);

  useEffect(() => {
    localStorage.setItem('ps_users', JSON.stringify(allUsers));
  }, [allUsers]);

  useEffect(() => {
    localStorage.setItem('ps_current_uid', currentUserId);
  }, [currentUserId]);

  const triggerToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  // 1. SWITCH SANDBOX USER PROFILE
  const handleSelectUser = (user: User) => {
    setCurrentUserId(user.id);
    triggerToast(`Switched account to ${user.name}`, 'info');
  };

  // 2. CREATE A BRAND NEW COMMUNITY USER
  const handleAddCustomUser = (name: string, username: string) => {
    const randomAvatar = CUSTOM_AVATARS[Math.floor(Math.random() * CUSTOM_AVATARS.length)];
    const newUser: User = {
      id: `custom_${Date.now()}`,
      name,
      username,
      avatar: randomAvatar,
      friends: [], // Stars with 0 connections
      postsToday: [],
      bio: 'Enthusiastic new sandbox user eager to test community limits! 👋🌱',
      joinedDate: 'Today'
    };

    setAllUsers(prev => [...prev, newUser]);
    setCurrentUserId(newUser.id);
    triggerToast(`Welcome to the Public Space, ${name}! Your profile starts at 0 friends with restricted posting.`, 'success');
  };

  // 3. ESTABLISH AN ASSOCIATION IN REAL-TIME
  const handleAddFriend = (friendId: string) => {
    setAllUsers(prev => prev.map(user => {
      if (user.id === currentUser.id) {
        if (user.friends.includes(friendId)) return user;
        const newFriends = [...user.friends, friendId];
        return { ...user, friends: newFriends };
      }
      return user;
    }));
    triggerToast('Connection created successfully! Your posting allowance tier was upgraded.', 'success');
  };

  // 4. REMOVE AN ASSOCIATION IN REAL-TIME
  const handleRemoveFriend = (friendId: string) => {
    setAllUsers(prev => prev.map(user => {
      if (user.id === currentUser.id) {
        const newFriends = user.friends.filter(id => id !== friendId);
        // Also ensure they haven't bypassed limits retrospectively (just keep their posted count)
        return { ...user, friends: newFriends };
      }
      return user;
    }));
    triggerToast('Connection disconnected. Daily posting quota readjusted.', 'info');
  };

  // 4b. UPDATE USER PROFILE DETAILS (NAME, HANDLE, BIO)
  const handleUpdateUserProfile = (userId: string, updatedFields: Partial<User>) => {
    const sanitizedFields = { ...updatedFields };
    if (sanitizedFields.username) {
      sanitizedFields.username = sanitizedFields.username
        .toLowerCase()
        .replace(/\s+/g, '_')
        .replace(/[^a-z0-9_]/g, ''); // alphanumeric format
    }

    setAllUsers(prev => prev.map(u => {
      if (u.id === userId) {
        return { ...u, ...sanitizedFields };
      }
      return u;
    }));

    // Update matching author profile fields on existing posts and comments for complete live simulation
    setPosts(prev => prev.map(post => {
      let isChanged = false;
      let newPostName = post.userName;
      
      if (post.userId === userId && sanitizedFields.name) {
        newPostName = sanitizedFields.name;
        isChanged = true;
      }

      const updatedComments = post.comments.map(c => {
        if (c.userId === userId && sanitizedFields.name) {
          isChanged = true;
          return { ...c, userName: sanitizedFields.name };
        }
        return c;
      });

      if (isChanged) {
        return {
          ...post,
          userName: newPostName,
          comments: updatedComments
        };
      }
      return post;
    }));

    triggerToast('User Profile updated successfully in real-time!', 'success');
  };

  // 5. POST SUBMISSION MECHANISM (Enforcing Limits here!)
  const handleAddPost = (content: string, mediaUrl?: string, mediaType?: 'image' | 'video' | 'none') => {
    const limitInfo = getPostingLimitInfo(currentUser.friends.length);
    const postsTodayCount = currentUser.postsToday.length;

    // Strict boundary enforcement
    if (limitInfo.limit !== 'unlimited') {
      if ((limitInfo.limit as number) === 0) {
        triggerToast(t('publicSpace.cannotPostZeroFriends'), 'error');
        return;


      }
      if (postsTodayCount >= (limitInfo.limit as number)) {
        triggerToast(t('publicSpace.dailyLimitReachedAddFriends'), 'error');
        return;

      }
    }

    const newPostId = `post_${Date.now()}`;
    const newPost: Post = {
      id: newPostId,
      userId: currentUser.id,
      userName: currentUser.name,
      userAvatar: currentUser.avatar,
      content,
      mediaUrl,
      mediaType: mediaType || 'none',
      createdAt: new Date().toISOString(),
      likes: [],
      comments: [],
      sharesCount: 0
    };

    // Update posts and active user daily usage tracker
    setPosts(prev => [newPost, ...prev]);
    setAllUsers(prev => prev.map(user => {
      if (user.id === currentUser.id) {
        return {
          ...user,
          postsToday: [...user.postsToday, newPostId]
        };
      }
      return user;
    }));

    triggerToast('Post published successfully!', 'success');
  };

  // 6. LIKE ACTION TOGGLE
  const handleLikePost = (postId: string) => {
    setPosts(prev => prev.map(post => {
      if (post.id === postId) {
        const isCurrentlyLiked = post.likes.includes(currentUser.id);
        const newLikes = isCurrentlyLiked
          ? post.likes.filter(id => id !== currentUser.id)
          : [...post.likes, currentUser.id];
        return { ...post, likes: newLikes };
      }
      return post;
    }));
  };

  // 7. SUBMIT LIVE COMMENTS ON THE BOARD
  const handleCommentPost = (postId: string, commentContent: string) => {
    const newComment: Comment = {
      id: `comment_${Date.now()}`,
      userId: currentUser.id,
      userName: currentUser.name,
      userAvatar: currentUser.avatar,
      content: commentContent,
      createdAt: new Date().toISOString()
    };

    setPosts(prev => prev.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          comments: [...post.comments, newComment]
        };
      }
      return post;
    }));
    triggerToast('Comment added!', 'success');
  };

  // 8. SHARE INLINE ENGAGEMENT
  const handleSharePost = (postId: string) => {
    setPosts(prev => prev.map(post => {
      if (post.id === postId) {
        return { ...post, sharesCount: post.sharesCount + 1 };
      }
      return post;
    }));
  };

  // 9. SIMULATE BACKGROUND GENERATOR SEED POST
  const handleAddRandomPost = () => {
    const randomUser = DIRECTORY_USERS[Math.floor(Math.random() * DIRECTORY_USERS.length)];
    const SEED_MEDIA_IMAGES = [
      'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80',
      'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&q=80',
      'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
      'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&q=80',
      undefined
    ];

    const contentKey = `publicSpace.seedTexts.${Math.floor(Math.random() * 10)}`;
    const chosenMedia = SEED_MEDIA_IMAGES[Math.floor(Math.random() * SEED_MEDIA_IMAGES.length)];

    const seedPost: Post = {
      id: `post_seed_${Date.now()}`,
      userId: randomUser.id,
      userName: randomUser.name,
      userAvatar: randomUser.avatar,
      content: t(contentKey),
      mediaUrl: chosenMedia,
      mediaType: chosenMedia ? 'image' : 'none',
      createdAt: new Date().toISOString(),
      likes: [],
      comments: [],
      sharesCount: 0
    };

    setPosts(prev => [seedPost, ...prev]);
    triggerToast(t('publicSpace.randomPost').replace('{name}', randomUser.name), 'info');
  };

  // 10. RE-INITIALIZE THE SANDBOX ENV
  const handleReset = () => {
    localStorage.removeItem('ps_posts');
    localStorage.removeItem('ps_users');
    localStorage.removeItem('ps_current_uid');
    
    setPosts(PRELOADED_POSTS);
    setAllUsers(PRESET_USERS);
    setCurrentUserId('user_alex');
    triggerToast('Sandbox environment reset completed.', 'info');
  };

  return (
    <div className="min-h-screen bg-[#f1f5f9] font-sans text-slate-800" id="app-workspace-root">
      {/* Premium Bento Header Panel */}
      <header className="sticky top-0 bg-[#f1f5f9]/90 backdrop-blur-md z-45 px-4 sm:px-6 py-3 sm:py-4" id="main-application-header">
        <div className="max-w-7xl mx-auto bg-white border border-slate-200 rounded-2xl sm:rounded-[2rem] p-3 sm:p-4 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 shadow-sm">
          <div className="flex items-center gap-3 px-1 sm:px-2">
            <div className="bg-indigo-600 text-white rounded-xl sm:rounded-2xl p-2 sm:p-2.5 shadow-lg shadow-indigo-150">
              <Globe className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div>
              <h1 className="text-sm sm:text-base font-extrabold tracking-tight text-slate-900 flex items-center gap-1.5 leading-none">
                {t('publicSpace.title')}
              </h1>
              <p className="text-[8px] sm:text-[10px] uppercase font-bold text-slate-400 font-mono tracking-widest mt-0.5 sm:mt-1">
                {t('publicSpace.subtitle')}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-4 px-1 sm:px-2 w-full sm:w-auto justify-between sm:justify-end">
            {/* Live Clock info */}
            <div className="hidden md:flex flex-col items-end pr-4 border-r border-slate-200 font-mono text-[10px] text-slate-400 leading-normal">
              <span>{t('publicSpace.sandboxTime')}</span>
              <span className="font-bold text-slate-600">{time || '--:--:--'}</span>
            </div>

            {/* Reset Board controls */}
            <button
              onClick={handleReset}
              className="py-2 sm:py-2.5 px-3 sm:px-4 bg-slate-50 hover:bg-red-50 text-slate-500 hover:text-red-650 font-bold text-xs rounded-xl sm:rounded-2xl transition flex items-center gap-1.5 border border-slate-200 hover:border-red-200"
              title={t('publicSpace.reset')}
            >
              <RotateCcw className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              <span className="hidden xs:inline">{t('publicSpace.reset')}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Primary Dashboard layout */}
      <main className="max-w-7xl mx-auto px-3 sm:px-4 pb-8 sm:pb-12 md:px-6">
        {/* Connection limits rule breakdown board - Premium Indigo Bento Hero Block */}
        <div className="mb-4 sm:mb-6 p-4 sm:p-6 bg-gradient-to-br from-indigo-650 to-slate-900 rounded-xl sm:rounded-[2rem] text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-4 sm:gap-6 shadow-md border border-indigo-700/30" id="rules-banner-hero">
          <div className="flex items-start gap-3 sm:gap-4 w-full md:w-auto">
            <div className="p-2.5 sm:p-3.5 bg-white/10 rounded-xl sm:rounded-2xl text-teal-300 border border-white/10 shrink-0 hidden xs:block">
              <Info className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div className="min-w-0">
              <h2 className="text-xs sm:text-sm font-bold text-white flex items-center gap-1.5 font-mono uppercase tracking-wider">
                <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-amber-300 shrink-0" /> {t('publicSpace.activeConnectionRules')}
              </h2>
              <p className="text-[11px] sm:text-xs text-indigo-100 mt-1.5 sm:mt-2 leading-relaxed">
                {t('publicSpace.rulesDescription')}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-1.5 bg-white/10 border border-white/10 px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-lg sm:rounded-xl font-mono text-[9px] sm:text-[10px] uppercase tracking-wider text-indigo-150 font-bold shrink-0 self-start md:self-auto">
            <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-emerald-400" /> {t('publicSpace.livePolicyActive')}
          </div>
        </div>

        {/* Adaptive 3-Column Ratios: 3 / 5 / 4 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 items-start">
          
          {/* COLUMN 1: Profile and Switches (Col-3) */}
          <section className="lg:col-span-3" id="nav-column-left">
            <UserSelector
              currentUser={currentUser}
              allUsers={allUsers}
              onSelectUser={handleSelectUser}
              onAddCustomUser={handleAddCustomUser}
              onUpdateUserProfile={handleUpdateUserProfile}
            />
          </section>

          {/* COLUMN 2: Community Feed Canvas (Col-5) */}
          <section className="lg:col-span-5" id="main-feed-canvas">
            <NewPostForm
              currentUser={currentUser}
              onAddPost={handleAddPost}
              onAddRandomPost={handleAddRandomPost}
            />
            
            <Feed
              posts={posts}
              currentUser={currentUser}
              onLikePost={handleLikePost}
              onCommentPost={handleCommentPost}
              onSharePost={handleSharePost}
            />
          </section>

          {/* COLUMN 2: Friend Connection Builder (Col-4) */}
          <section className="lg:col-span-4" id="members-column-right">
            <FriendDirectory
              currentUser={currentUser}
              onAddFriend={handleAddFriend}
              onRemoveFriend={handleRemoveFriend}
            />
          </section>

        </div>
      </main>

      {/* Floating Global Toasts alerts - responsive positioning */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed bottom-4 sm:bottom-6 left-3 sm:left-6 right-3 sm:right-auto z-50 overflow-hidden"
            id="system-notification-toast"
          >
            <div className={`px-4 sm:px-5 py-3 sm:py-3.5 rounded-xl border flex items-center gap-2 sm:gap-2.5 shadow-lg text-xs font-semibold ${
              toast.type === 'success' 
                ? 'bg-emerald-950 border-emerald-800 text-emerald-100' 
                : toast.type === 'error'
                  ? 'bg-red-950 border-red-800 text-red-100'
                  : 'bg-slate-900 border-slate-700 text-slate-100'
            }`}>
              <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400 shrink-0" />
              <span>{toast.message}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}