'use client';

import { useState, useRef, useEffect } from 'react';

interface AudioTrack {
  id: number;
  title: string;
  description: string;
  duration: string;
  url: string;
}

const audioTracks: AudioTrack[] = [
  {
    id: 1,
    title: '清晨冥想 - 宁静的开始',
    description: '一段宁静的冥想音乐，帮助您开启美好的一天，让心灵在清晨的宁静中找到平衡与和谐。',
    duration: '6:17',
    url: '/MP3/07. Jia Peng Fang - River.flac',
  },
  {
    id: 2,
    title: '午后时光 - 轻松旋律',
    description: '轻松愉悦的旋律，适合午后小憩时聆听，让忙碌的午后时光变得更加惬意和放松。',
    duration: '5:03',
    url: '/MP3/08. Missa Johnouchi - Marco Polo.flac',
  },
  {
    id: 3,
    title: '夜晚思考 - 深度对话',
    description: '深沉的音乐氛围，引导您进入深度的思考状态，适合夜晚独处时的自我对话与反思。',
    duration: '4:47',
    url: '/MP3/10. Jiang Xiao Qing - Waters Edge.flac',
  },
  {
    id: 4,
    title: '周末放松 - 自由节奏',
    description: '自由随性的节奏，为您的周末时光增添轻松氛围，让身心在音乐中完全释放。',
    duration: '4:40',
    url: '/MP3/11. Shao Rong - Wild Rose.flac',
  },
];

export default function Home() {
  const [currentTrack, setCurrentTrack] = useState<AudioTrack | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  const handleTrackSelect = (track: AudioTrack) => {
    setCurrentTrack(track);
  };

  // 自动切换到下一首歌曲
  const handleNextTrack = () => {
    if (!currentTrack) return;

    const currentIndex = audioTracks.findIndex(
      (track) => track.id === currentTrack.id
    );

    if (currentIndex === -1) return;

    // 如果是最后一首，循环回到第一首
    const nextIndex =
      currentIndex === audioTracks.length - 1 ? 0 : currentIndex + 1;
    const nextTrack = audioTracks[nextIndex];

    setCurrentTrack(nextTrack);
  };

  // 当 currentTrack 改变时，更新音频源并播放
  useEffect(() => {
    if (currentTrack && audioRef.current) {
      audioRef.current.src = currentTrack.url;
      audioRef.current.load();
      audioRef.current.play().catch((error) => {
        console.error('播放失败:', error);
      });
    }
  }, [currentTrack]);

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <header className="w-full py-8 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-100 mb-2">
            我的声音日记
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 font-light">
            My Audio Diary
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 pb-12">
        {/* Main Card Container */}
        <div className="bg-gray-800 rounded-2xl shadow-2xl overflow-hidden">
          {/* Cover Image */}
          <div className="w-full h-64 md:h-80 bg-gradient-to-br from-purple-600 to-blue-600 relative overflow-hidden">
            <img
              src="/PIC/ops-coffee-1763790592228.jpg?w=918&h=244&fit=crop"
              alt="播客封面"
              className="w-full h-full object-cover opacity-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent"></div>
            <div className="absolute bottom-6 left-6 right-6">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-100 mb-1">
                我的声音日记
              </h2>
              <p className="text-gray-300 text-sm md:text-base">
                用声音记录生活的每一个瞬间
              </p>
            </div>
          </div>

          <div className="p-6 md:p-8">
            {/* Player Section */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-100 mb-4">
                正在播放
              </h3>
              {currentTrack ? (
                <div className="space-y-4">
                  <div className="bg-gray-700 rounded-lg p-4 border border-gray-600">
                    <p className="text-lg font-medium text-gray-100 mb-1">
                      {currentTrack.title}
                    </p>
                    <p className="text-sm text-gray-400 mb-2">
                      {currentTrack.description}
                    </p>
                    <p className="text-xs text-gray-500">
                      时长: {currentTrack.duration}
                    </p>
                  </div>
                  <audio
                    ref={audioRef}
                    controls
                    className="w-full h-12"
                    preload="metadata"
                    onEnded={handleNextTrack}
                  >
                    <source src={currentTrack.url} type="audio/flac" />
                    您的浏览器不支持音频播放。
                  </audio>
                </div>
              ) : (
                <div className="text-center py-12 bg-gray-700/50 rounded-lg border border-gray-600">
                  <p className="text-lg text-gray-400">
                    请从播放列表中选择一首音频开始播放
                  </p>
                </div>
              )}
            </div>

            {/* Playlist Section */}
            <div>
              <h3 className="text-xl font-semibold text-gray-100 mb-4">
                播放列表
              </h3>
              <div className="space-y-3">
                {audioTracks.map((track) => (
                  <button
                    key={track.id}
                    onClick={() => handleTrackSelect(track)}
                    className={`w-full text-left p-5 rounded-lg transition-all duration-200 ${
                      currentTrack?.id === track.id
                        ? 'bg-blue-600/30 border-2 border-blue-500 shadow-lg shadow-blue-500/20'
                        : 'bg-gray-700 hover:bg-gray-600 border-2 border-transparent hover:border-gray-500'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <p
                            className={`font-semibold text-base ${
                              currentTrack?.id === track.id
                                ? 'text-blue-400'
                                : 'text-gray-100'
                            }`}
                          >
                            {track.title}
                          </p>
                          {currentTrack?.id === track.id && (
                            <div className="flex items-center gap-1">
                              <svg
                                className="w-4 h-4 text-blue-400 animate-pulse"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                                  clipRule="evenodd"
                                />
                              </svg>
                              <span className="text-xs text-blue-400 font-medium">
                                正在播放
                              </span>
                            </div>
                          )}
                        </div>
                        <p className="text-sm text-gray-400 mb-2 leading-relaxed">
                          {track.description}
                        </p>
                        <div className="flex items-center gap-2">
                          <svg
                            className="w-4 h-4 text-gray-500"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                          <span className="text-xs text-gray-500">
                            {track.duration}
                          </span>
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

