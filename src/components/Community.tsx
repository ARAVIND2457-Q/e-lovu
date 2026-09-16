import React, { useMemo, useState } from 'react';
import {
  Users,
  Heart,
  MessageCircle,
  Plus,
  X,
  Search,
  BadgeCheck,
  Send,
  TrendingUp,
} from 'lucide-react';
import type { CommunityPost } from '../types';
import { initialCommunityPosts } from '../data/mockData';

const badgeTone = (badge?: string) => {
  if (!badge) return 'bg-slate-100 text-slate-600 border-slate-200';
  if (badge.toLowerCase().includes('doula')) return 'bg-violet-50 text-violet-700 border-violet-200';
  if (badge.toLowerCase().includes('mom')) return 'bg-emerald-50 text-emerald-700 border-emerald-200';
  if (badge.toLowerCase().includes('first')) return 'bg-rose-50 text-rose-700 border-rose-200';
  return 'bg-indigo-50 text-indigo-700 border-indigo-200';
};

export const Community: React.FC = () => {
  const [posts, setPosts] = useState<CommunityPost[]>(initialCommunityPosts);
  const [topic, setTopic] = useState<string>('all');
  const [query, setQuery] = useState('');
  const [composerOpen, setComposerOpen] = useState(false);
  const [replyOpenFor, setReplyOpenFor] = useState<string | null>(null);
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const [draftTitle, setDraftTitle] = useState('');
  const [draftTopic, setDraftTopic] = useState('');
  const [draftBody, setDraftBody] = useState('');
  const [replyDraft, setReplyDraft] = useState('');

  const topics = useMemo(() => {
    const set = new Set(posts.map((p) => p.topic));
    return ['all', ...Array.from(set)];
  }, [posts]);

  const totalLikes = posts.reduce((sum, post) => sum + post.likes, 0);
  const totalReplies = posts.reduce((sum, post) => sum + post.replies.length, 0);
  const doulaReplies = posts.reduce(
    (sum, post) => sum + post.replies.filter((r) => r.badge?.includes('Doula')).length,
    0,
  );

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return posts
      .filter((post) => (topic === 'all' ? true : post.topic === topic))
      .filter((post) =>
        q
          ? post.title.toLowerCase().includes(q) ||
            post.content.toLowerCase().includes(q) ||
            post.author.toLowerCase().includes(q)
          : true,
      );
  }, [posts, topic, query]);

  const toggleLike = (id: string) => {
    setPosts((prev) =>
      prev.map((post) =>
        post.id === id
          ? {
              ...post,
              hasLiked: !post.hasLiked,
              likes: post.hasLiked ? post.likes - 1 : post.likes + 1,
            }
          : post,
      ),
    );
  };

  const submitPost = (event: React.FormEvent) => {
    event.preventDefault();
    if (!draftTitle.trim() || !draftBody.trim()) return;

    const newPost: CommunityPost = {
      id: `post-${Date.now()}`,
      author: 'Sarah M.',
      authorBadge: '28 Weeks',
      authorWeek: '28 Weeks',
      avatar:
        'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200',
      timestamp: 'Just now',
      topic: draftTopic.trim() || 'General',
      title: draftTitle.trim(),
      content: draftBody.trim(),
      likes: 0,
      hasLiked: false,
      commentsCount: 0,
      replies: [],
    };

    setPosts((prev) => [newPost, ...prev]);
    setDraftTitle('');
    setDraftTopic('');
    setDraftBody('');
    setComposerOpen(false);
    setTopic('all');
  };

  const submitReply = (postId: string) => {
    if (!replyDraft.trim()) return;
    setPosts((prev) =>
      prev.map((post) =>
        post.id === postId
          ? {
              ...post,
              commentsCount: post.commentsCount + 1,
              replies: [
                ...post.replies,
                {
                  id: `rep-${Date.now()}`,
                  author: 'Sarah M.',
                  badge: '28 Weeks',
                  avatar:
                    'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200',
                  timestamp: 'Just now',
                  text: replyDraft.trim(),
                },
              ],
            }
          : post,
      ),
    );
    setReplyDraft('');
    setReplyOpenFor(null);
    setExpanded((prev) => ({ ...prev, [postId]: true }));
  };

  const stats = [
    { label: 'Moms in this space', value: posts.length + 38, icon: Users },
    { label: 'Support reactions', value: totalLikes, icon: Heart },
    { label: 'Conversations', value: totalReplies, icon: MessageCircle },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Header */}
      <div className="rounded-3xl bg-gradient-to-br from-rose-500 via-pink-600 to-rose-700 p-6 sm:p-8 text-white relative overflow-hidden">
        <div className="absolute -right-16 -top-16 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />
        <div className="relative flex-col lg:flex-row lg:items-center justify-between gap-5">
          <div>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/15 text-[11px] font-bold uppercase tracking-wider border-white/20">
              <Users className="w-3.5 h-3.5" />
              eLovu Circles
            </span>
            <h1 className="mt-3 text-2xl sm:text-3xl font-black tracking-tight">
              You are not doing this alone
            </h1>
            <p className="mt-1.5 text-sm text-rose-100 max-w-2xl leading-relaxed">
              A moderated community of expecting mothers, with certified doulas answering questions
              alongside you.
            </p>
          </div>
          <button
            onClick={() => setComposerOpen(true)}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-white text-rose-600 font-bold text-sm hover:bg-rose-50 shadow-lg transition shrink-0 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            Start a conversation
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid-cols-1 sm:grid-cols-3 gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white rounded-3xl border-rose-100 p-5 flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center">
              <stat.icon className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xl font-black text-slate-900">{stat.value}</p>
              <p className="text-[11px] font-semibold text-slate-500">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      {doulaReplies > 0 && (
        <div className="flex items-start gap-2.5 p-4 rounded-2xl bg-violet-50 border-violet-200">
          <BadgeCheck className="w-4 h-4 text-violet-600 shrink-0 mt-0.5" />
          <p className="text-xs font-semibold text-violet-900">
            {doulaReplies} replies from certified doulas in this feed. Clinical questions should
            still go to your OB team.
          </p>
        </div>
      )}

      {/* Filters */}
      <div className="bg-white rounded-3xl border-rose-100 p-4 flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-1.5">
          {topics.map((t) => (
            <button
              key={t}
              onClick={() => setTopic(t)}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                topic === t
                  ? 'bg-rose-500 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-rose-50 hover:text-rose-700'
              }`}
            >
              {t === 'all' ? 'All topics' : t}
            </button>
          ))}
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search conversations"
            className="pl-9 pr-3 py-2 rounded-xl text-xs bg-slate-50 border-slate-200 focus:border-rose-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-100 transition placeholder:text-slate-400 w-full sm:w-56"
          />
        </div>
      </div>

      {/* Feed */}
      <div className="space-y-4">
        {visible.map((post) => {
          const isExpanded = expanded[post.id];
          const shownReplies = isExpanded ? post.replies : post.replies.slice(0, 1);

          return (
            <article key={post.id} className="bg-white rounded-3xl border-rose-100 overflow-hidden">
              <div className="p-5">
                <div className="flex items-start gap-3.5">
                  <img
                    src={post.avatar}
                    alt=""
                    className="w-11 h-11 rounded-full object-cover ring-2 ring-rose-100 shrink-0"
                    loading="lazy"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-sm font-bold text-slate-900">{post.author}</span>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${badgeTone(
                          post.authorBadge,
                        )}`}
                      >
                        {post.authorBadge}
                      </span>
                      <span className="text-[11px] text-slate-400 font-medium">
                        {post.authorWeek} · {post.timestamp}
                      </span>
                    </div>

                    <span className="mt-2 inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-rose-600">
                      <TrendingUp className="w-3 h-3" />
                      {post.topic}
                    </span>

                    <h2 className="mt-1.5 text-base font-bold text-slate-900 leading-snug">
                      {post.title}
                    </h2>
                    <p className="mt-1.5 text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {post.content}
                    </p>

                    <div className="mt-3.5 flex items-center gap-2">
                      <button
                        onClick={() => toggleLike(post.id)}
                        className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                          post.hasLiked
                            ? 'bg-rose-50 text-rose-600 border-rose-200'
                            : 'bg-slate-50 text-slate-600 border-slate-200 hover:border-rose-200 hover:text-rose-600'
                        }`}
                      >
                        <Heart
                          className={`w-3.5 h-3.5 ${post.hasLiked ? 'fill-rose-500 text-rose-500' : ''}`}
                        />
                        {post.likes}
                      </button>
                      <button
                        onClick={() => {
                          setReplyOpenFor(replyOpenFor === post.id ? null : post.id);
                          setExpanded((prev) => ({ ...prev, [post.id]: true }));
                        }}
                        className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-slate-50 text-slate-600 border-slate-200 hover:border-rose-200 hover:text-rose-600 transition cursor-pointer"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        Reply
                      </button>
                      {post.replies.length > 0 && (
                        <span className="text-[11px] text-slate-400 font-medium">
                          {post.commentsCount} comment{post.commentsCount === 1 ? '' : 's'}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Replies */}
              {post.replies.length > 0 && (
                <div className="bg-slate-50/70 border-t border-slate-100 p-5 space-y-3">
                  {shownReplies.map((reply) => (
                    <div key={reply.id} className="flex items-start gap-3">
                      <img
                        src={reply.avatar}
                        alt=""
                        className="w-8 h-8 rounded-full object-cover shrink-0"
                        loading="lazy"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-xs font-bold text-slate-900">{reply.author}</span>
                          {reply.badge && (
                            <span
                              className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md border ${badgeTone(
                                reply.badge,
                              )}`}
                            >
                              {reply.badge}
                            </span>
                          )}
                          <span className="text-[10px] text-slate-400">{reply.timestamp}</span>
                        </div>
                        <p className="text-xs text-slate-600 mt-1 leading-relaxed">{reply.text}</p>
                      </div>
                    </div>
                  ))}

                  {post.replies.length > 1 && (
                    <button
                      onClick={() =>
                        setExpanded((prev) => ({ ...prev, [post.id]: !prev[post.id] }))
                      }
                      className="text-[11px] font-bold text-rose-600 hover:underline cursor-pointer"
                    >
                      {isExpanded
                        ? 'Show fewer replies'
                        : `Show ${post.replies.length - 1} more repl${
                            post.replies.length - 1 === 1 ? 'y' : 'ies'
                          }`}
                    </button>
                  )}

                  {replyOpenFor === post.id && (
                    <div className="flex items-start gap-2 pt-1">
                      <input
                        type="text"
                        autoFocus
                        value={replyDraft}
                        onChange={(e) => setReplyDraft(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') submitReply(post.id);
                        }}
                        placeholder="Add a supportive reply…"
                        className="flex-1 px-3 py-2.5 rounded-xl text-xs bg-white border-slate-200 focus:border-rose-400 focus:outline-none focus:ring-2 focus:ring-rose-100 transition placeholder:text-slate-400"
                      />
                      <button
                        onClick={() => submitReply(post.id)}
                        className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs font-bold text-white bg-rose-500 hover:bg-rose-600 transition cursor-pointer"
                      >
                        <Send className="w-3.5 h-3.5" /> Post
                      </button>
                    </div>
                  )}
                </div>
              )}

              {post.replies.length === 0 && replyOpenFor === post.id && (
                <div className="bg-slate-50/70 border-t border-slate-100 p-5">
                  <div className="flex items-start gap-2">
                    <input
                      type="text"
                      autoFocus
                      value={replyDraft}
                      onChange={(e) => setReplyDraft(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') submitReply(post.id);
                      }}
                      placeholder="Be the first to reply…"
                      className="flex-1 px-3 py-2.5 rounded-xl text-xs bg-white border-slate-200 focus:border-rose-400 focus:outline-none focus:ring-2 focus:ring-rose-100 transition placeholder:text-slate-400"
                    />
                    <button
                      onClick={() => submitReply(post.id)}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs font-bold text-white bg-rose-500 hover:bg-rose-600 transition cursor-pointer"
                    >
                      <Send className="w-3.5 h-3.5" /> Post
                    </button>
                  </div>
                </div>
              )}
            </article>
          );
        })}
      </div>

      {visible.length === 0 && (
        <div className="bg-white rounded-3xl border-rose-100 p-12 text-center">
          <Search className="w-8 h-8 text-slate-300 mx-auto" />
          <p className="mt-3 text-sm font-bold text-slate-800">No conversations found</p>
          <p className="text-xs text-slate-500 mt-1">
            Try a different topic or start a new conversation.
          </p>
        </div>
      )}

      {/* Composer */}
      {composerOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4">
          <form
            onSubmit={submitPost}
            className="bg-white rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl"
          >
            <div className="p-5 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
                  <Users className="w-5 h-5" />
                </div>
                <h2 className="text-base font-bold text-slate-900">Start a conversation</h2>
              </div>
              <button
                type="button"
                onClick={() => setComposerOpen(false)}
                className="p-1.5 rounded-full text-slate-400 hover:bg-slate-100 transition cursor-pointer"
                aria-label="Close composer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-5 space-y-4">
              <label className="block">
                <span className="text-xs font-bold text-slate-700">Topic</span>
                <input
                  type="text"
                  value={draftTopic}
                  onChange={(e) => setDraftTopic(e.target.value)}
                  placeholder="e.g. 3rd Trimester Sleep & Comfort"
                  className="mt-1.5 w-full px-3 py-2.5 rounded-xl text-sm bg-slate-50 border-slate-200 focus:border-rose-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-100 transition placeholder:text-slate-400"
                />
              </label>

              <label className="block">
                <span className="text-xs font-bold text-slate-700">Question or title</span>
                <input
                  type="text"
                  required
                  value={draftTitle}
                  onChange={(e) => setDraftTitle(e.target.value)}
                  placeholder="What would you like to ask the circle?"
                  className="mt-1.5 w-full px-3 py-2.5 rounded-xl text-sm bg-slate-50 border-slate-200 focus:border-rose-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-100 transition placeholder:text-slate-400"
                />
              </label>

              <label className="block">
                <span className="text-xs font-bold text-slate-700">Details</span>
                <textarea
                  required
                  rows={4}
                  value={draftBody}
                  onChange={(e) => setDraftBody(e.target.value)}
                  placeholder="Share what you're experiencing so others can help…"
                  className="mt-1.5 w-full px-3 py-2.5 rounded-xl text-sm bg-slate-50 border-slate-200 focus:border-rose-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-100 transition placeholder:text-slate-400 resize-none"
                />
              </label>

              <p className="text-[11px] text-slate-400 leading-relaxed">
                This is a moderated peer space, not medical advice. For urgent symptoms use the
                emergency triage line.
              </p>
            </div>

            <div className="p-5 border-t border-slate-100 flex gap-2">
              <button
                type="button"
                onClick={() => setComposerOpen(false)}
                className="flex-1 py-3 rounded-xl text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 inline-flex items-center justify-center gap-1.5 py-3 rounded-xl text-sm font-bold text-white bg-rose-500 hover:bg-rose-600 transition cursor-pointer"
              >
                <Send className="w-4 h-4" /> Share with the circle
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
