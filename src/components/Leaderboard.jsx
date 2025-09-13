import React, { useState, useEffect } from 'react';
import { Trophy, Star, MapPin, Award, Activity } from 'lucide-react';
import confetti from 'canvas-confetti';
import { dummyLeaderboard } from '../utils/dummyData';
import './Leaderboard.css'; // Import CSS module for marquee animation

const Leaderboard = () => {
  const [activeTab, setActiveTab] = useState('individual');
  const { individualLeaderboard, communityLeaderboard, recentActivity } = dummyLeaderboard;

  // Trigger confetti for top ranks on tab switch or page load
  useEffect(() => {
    const triggerConfetti = () => {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#3B82F6', '#22C55E', '#FBBF24'],
      });
    };
    const timer = setTimeout(triggerConfetti, 500);
    return () => clearTimeout(timer);
  }, [activeTab]);

  const getRankBadge = (rank) => {
    switch (rank) {
      case 1:
        return (
          <div className="relative">
            <Trophy className="w-8 h-8 text-yellow-400 animate-pulse" />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
              1
            </span>
          </div>
        );
      case 2:
        return (
          <div className="relative">
            <Trophy className="w-8 h-8 text-gray-300" />
            <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
              2
            </span>
          </div>
        );
      case 3:
        return (
          <div className="relative">
            <Trophy className="w-8 h-8 text-orange-400" />
            <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
              3
            </span>
          </div>
        );
      default:
        return (
          <span className="text-sm font-bold text-gray-600 bg-gray-100 rounded-full h-8 w-8 flex items-center justify-center">
            {rank}
          </span>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-green-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-green-600">
            Civic Heroes Leaderboard
          </h1>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Shine as a top contributor or lead your municipality to victory! Track your impact and earn recognition.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex rounded-lg shadow-md bg-white p-1">
            <button
              onClick={() => setActiveTab('individual')}
              className={`px-6 py-3 text-sm font-semibold rounded-md transition-all duration-300 ${
                activeTab === 'individual'
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Individual
            </button>
            <button
              onClick={() => setActiveTab('community')}
              className={`px-6 py-3 text-sm font-semibold rounded-md transition-all duration-300 ${
                activeTab === 'community'
                  ? 'bg-green-600 text-white shadow-lg'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Municipalities
            </button>
          </div>
        </div>

        {/* Leaderboard Content */}
        <div className="grid gap-6">
          {activeTab === 'individual' ? (
            <div className="bg-white rounded-xl shadow-2xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Star className="w-6 h-6 text-yellow-400 mr-2" />
                Top Civic Champions
              </h2>
              <div className="space-y-4">
                {individualLeaderboard.map((user, index) => (
                  <div
                    key={user.id}
                    className="group relative flex items-center justify-between p-6 bg-gradient-to-r from-gray-50 to-white border border-gray-200 rounded-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
                  >
                    <div className="flex items-center space-x-4">
                      {getRankBadge(index + 1)}
                      <div className="flex items-center space-x-3">
                        <img
                          src={user.avatar}
                          alt={user.name}
                          className="w-10 h-10 rounded-full border-2 border-blue-200"
                        />
                        <div>
                          <p className="text-lg font-semibold text-gray-900">{user.name}</p>
                          <p className="text-sm text-gray-500 flex items-center">
                            <MapPin className="w-4 h-4 mr-1" />
                            {user.city}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-6">
                      <div className="text-right">
                        <p className="text-lg font-bold text-blue-600">{user.points} Points</p>
                        <p className="text-sm text-gray-500">{user.issuesReported} Issues Reported</p>
                        <div className="w-32 h-2 bg-gray-200 rounded-full mt-2">
                          <div
                            className="h-full bg-blue-500 rounded-full transition-all duration-500"
                            style={{ width: `${Math.min((user.points / 200) * 100, 100)}%` }}
                          ></div>
                        </div>
                      </div>
                      {user.badges.length > 0 && (
                        <div className="flex space-x-2">
                          {user.badges.map((badge, idx) => (
                            <div
                              key={idx}
                              className="relative group/badge"
                              data-tooltip={badge}
                            >
                              <Award className={`w-6 h-6 ${idx % 2 === 0 ? 'text-yellow-400' : 'text-purple-400'}`} />
                              <span className="absolute hidden group-hover/badge:block bg-gray-800 text-white text-xs rounded py-1 px-2 -top-8 left-1/2 transform -translate-x-1/2">
                                {badge}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="absolute inset-0 bg-blue-100 opacity-0 group-hover:opacity-10 rounded-lg transition-opacity duration-300"></div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-2xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Trophy className="w-6 h-6 text-green-600 mr-2" />
                Top Municipalities
              </h2>
              <div className="space-y-4">
                {communityLeaderboard.map((community, index) => (
                  <div
                    key={community.id}
                    className="group relative flex items-center justify-between p-6 bg-gradient-to-r from-gray-50 to-white border border-gray-200 rounded-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
                  >
                    <div className="flex items-center space-x-4">
                      {getRankBadge(index + 1)}
                      <div>
                        <p className="text-lg font-semibold text-gray-900">{community.name}</p>
                        <p className="text-sm text-gray-500 flex items-center">
                          <MapPin className="w-4 h-4 mr-1" />
                          Jharkhand
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-green-600">{community.resolutionRate}% Resolved</p>
                      <p className="text-sm text-gray-500">{community.issuesReported} Issues Reported</p>
                      <div className="w-32 h-2 bg-gray-200 rounded-full mt-2">
                        <div
                          className="h-full bg-green-500 rounded-full transition-all duration-500"
                          style={{ width: `${community.resolutionRate}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="absolute inset-0 bg-green-100 opacity-0 group-hover:opacity-10 rounded-lg transition-opacity duration-300"></div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Live Ticker */}
        <div className="mt-8 bg-white rounded-xl shadow-lg p-4">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center mb-4">
            <Activity className="w-5 h-5 text-blue-600 mr-2" />
            Recent Contributions
          </h3>
          <div className="relative overflow-hidden h-8">
            <div className="flex animate-marquee whitespace-nowrap">
              {recentActivity.map((activity, index) => (
                <span
                  key={index}
                  className="text-sm text-gray-600 mx-4 flex items-center"
                >
                  <Star className="w-4 h-4 text-yellow-400 mr-2" />
                  {activity}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;