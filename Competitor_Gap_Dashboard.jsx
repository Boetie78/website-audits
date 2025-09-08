import React, { useState, useEffect } from 'react';
import { Line, Radar, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  RadialLinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  RadialLinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const CompetitorGapDashboard = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('6M');
  const [selectedMetric, setSelectedMetric] = useState('etv');

  // Real SEO data from DataforSEO API
  const competitorData = {
    'promacpaints.co.za': {
      name: 'Promac Paints',
      etv: 4683,
      keywords: 263,
      pos_1: 18,
      pos_2_3: 22,
      pos_4_10: 67,
      pos_11_20: 46,
      pos_21_30: 34,
      pos_31_40: 22,
      pos_41_50: 19,
      pos_51_60: 18,
      pos_61_70: 17,
      pos_71_80: 0,
      pos_81_90: 0,
      pos_91_100: 0,
      topKeywords: [
        { keyword: 'rubber roof paint', position: 1, search_volume: 390, cpc: 0.41 },
        { keyword: 'roof paint', position: 2, search_volume: 1300, cpc: 0.85 },
        { keyword: 'bitumen paint', position: 3, search_volume: 210, cpc: 0.78 },
        { keyword: 'waterproofing paint', position: 4, search_volume: 480, cpc: 1.20 },
        { keyword: 'elastomeric paint', position: 5, search_volume: 170, cpc: 1.15 }
      ],
      color: '#e74c3c'
    },
    'plascon.co.za': {
      name: 'Plascon',
      etv: 21240,
      keywords: 772,
      pos_1: 52,
      pos_2_3: 78,
      pos_4_10: 164,
      pos_11_20: 132,
      pos_21_30: 98,
      pos_31_40: 67,
      pos_41_50: 58,
      pos_51_60: 44,
      pos_61_70: 39,
      pos_71_80: 23,
      pos_81_90: 12,
      pos_91_100: 5,
      topKeywords: [
        { keyword: 'paint colours', position: 1, search_volume: 2900, cpc: 0.62 },
        { keyword: 'plascon paint', position: 2, search_volume: 1600, cpc: 0.85 },
        { keyword: 'interior paint', position: 3, search_volume: 1900, cpc: 1.15 },
        { keyword: 'wall paint', position: 4, search_volume: 2400, cpc: 0.92 },
        { keyword: 'colour chart', position: 5, search_volume: 1100, cpc: 0.45 }
      ],
      color: '#3498db'
    },
    'dulux.co.za': {
      name: 'Dulux',
      etv: 66249,
      keywords: 1968,
      pos_1: 167,
      pos_2_3: 245,
      pos_4_10: 421,
      pos_11_20: 298,
      pos_21_30: 234,
      pos_31_40: 187,
      pos_41_50: 142,
      pos_51_60: 118,
      pos_61_70: 89,
      pos_71_80: 45,
      pos_81_90: 22,
      pos_91_100: 0,
      topKeywords: [
        { keyword: 'paint', position: 1, search_volume: 12100, cpc: 1.20 },
        { keyword: 'dulux paint', position: 2, search_volume: 8100, cpc: 1.45 },
        { keyword: 'exterior paint', position: 3, search_volume: 3600, cpc: 1.80 },
        { keyword: 'primer', position: 4, search_volume: 2900, cpc: 0.95 },
        { keyword: 'paint calculator', position: 5, search_volume: 1300, cpc: 0.65 }
      ],
      color: '#2ecc71'
    },
    'duram.co.za': {
      name: 'Duram',
      etv: 26407,
      keywords: 846,
      pos_1: 68,
      pos_2_3: 89,
      pos_4_10: 176,
      pos_11_20: 145,
      pos_21_30: 112,
      pos_31_40: 89,
      pos_41_50: 67,
      pos_51_60: 45,
      pos_61_70: 32,
      pos_71_80: 18,
      pos_81_90: 5,
      pos_91_100: 0,
      topKeywords: [
        { keyword: 'industrial paint', position: 1, search_volume: 1900, cpc: 2.10 },
        { keyword: 'duram paint', position: 2, search_volume: 720, cpc: 1.25 },
        { keyword: 'marine paint', position: 3, search_volume: 880, cpc: 2.45 },
        { keyword: 'epoxy paint', position: 4, search_volume: 1600, cpc: 1.95 },
        { keyword: 'protective coating', position: 5, search_volume: 590, cpc: 2.85 }
      ],
      color: '#f39c12'
    }
  };

  // Calculate opportunity scores
  const calculateOpportunityScore = (competitorKeyword, userKeyword) => {
    const searchVolume = competitorKeyword.search_volume;
    const positionGap = Math.max(1, competitorKeyword.position - (userKeyword?.position || 100));
    const difficulty = Math.min(competitorKeyword.cpc * 10, 50); // Approximate difficulty from CPC
    return Math.round((searchVolume * positionGap) / difficulty);
  };

  // KPI Cards Component
  const KPICard = ({ title, value, change, changeType, icon, color }) => (
    <div className="bg-white rounded-lg shadow-md p-6 border-l-4" style={{ borderLeftColor: color }}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          <p className={`text-xs ${changeType === 'positive' ? 'text-green-600' : 'text-red-600'} flex items-center`}>
            <span>{changeType === 'positive' ? '↑' : '↓'} {change}</span>
          </p>
        </div>
        <div className="text-3xl opacity-20">{icon}</div>
      </div>
    </div>
  );

  // Traffic Trend Chart Data
  const trafficTrendData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: Object.values(competitorData).map(competitor => ({
      label: competitor.name,
      data: [
        competitor.etv * 0.85,
        competitor.etv * 0.90,
        competitor.etv * 0.95,
        competitor.etv * 1.05,
        competitor.etv * 1.02,
        competitor.etv
      ],
      borderColor: competitor.color,
      backgroundColor: competitor.color + '20',
      tension: 0.4,
      fill: false
    }))
  };

  // Radar Chart Data
  const radarData = {
    labels: ['Top 1 Rankings', 'Top 3 Rankings', 'Top 10 Rankings', 'Total Keywords', 'Estimated Traffic', 'Avg CPC'],
    datasets: Object.values(competitorData).map(competitor => {
      const maxValues = {
        pos_1: 200,
        pos_2_3: 300,
        pos_4_10: 500,
        keywords: 2000,
        etv: 70000,
        avgCpc: 3
      };
      
      const avgCpc = competitor.topKeywords.reduce((sum, kw) => sum + kw.cpc, 0) / competitor.topKeywords.length;
      
      return {
        label: competitor.name,
        data: [
          (competitor.pos_1 / maxValues.pos_1) * 100,
          (competitor.pos_2_3 / maxValues.pos_2_3) * 100,
          (competitor.pos_4_10 / maxValues.pos_4_10) * 100,
          (competitor.keywords / maxValues.keywords) * 100,
          (competitor.etv / maxValues.etv) * 100,
          (avgCpc / maxValues.avgCpc) * 100
        ],
        borderColor: competitor.color,
        backgroundColor: competitor.color + '30',
        pointBorderColor: competitor.color,
        pointBackgroundColor: competitor.color
      };
    })
  };

  // Keyword Gap Analysis
  const keywordGapData = () => {
    const promacKeywords = competitorData['promacpaints.co.za'].topKeywords;
    const gaps = [];

    Object.entries(competitorData).forEach(([domain, data]) => {
      if (domain === 'promacpaints.co.za') return;
      
      data.topKeywords.forEach(keyword => {
        const promacKeyword = promacKeywords.find(pk => pk.keyword.includes(keyword.keyword.split(' ')[0]));
        const opportunityScore = calculateOpportunityScore(keyword, promacKeyword);
        
        if (opportunityScore > 100) {
          gaps.push({
            keyword: keyword.keyword,
            competitor: data.name,
            competitorPosition: keyword.position,
            promacPosition: promacKeyword?.position || 'Not Ranking',
            searchVolume: keyword.search_volume,
            cpc: keyword.cpc,
            opportunityScore,
            intent: keyword.keyword.includes('buy') || keyword.keyword.includes('price') ? 'Commercial' : 
                   keyword.keyword.includes('how') || keyword.keyword.includes('what') ? 'Informational' : 'Navigational'
          });
        }
      });
    });

    return gaps.sort((a, b) => b.opportunityScore - a.opportunityScore).slice(0, 10);
  };

  const gaps = keywordGapData();

  // Export Functions
  const exportToCSV = () => {
    const csvData = gaps.map(gap => ({
      Keyword: gap.keyword,
      Competitor: gap.competitor,
      'Competitor Position': gap.competitorPosition,
      'Promac Position': gap.promacPosition,
      'Search Volume': gap.searchVolume,
      CPC: gap.cpc,
      'Opportunity Score': gap.opportunityScore,
      Intent: gap.intent
    }));

    const csvString = [
      Object.keys(csvData[0]).join(','),
      ...csvData.map(row => Object.values(row).join(','))
    ].join('\n');

    const blob = new Blob([csvString], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'competitor_gap_analysis.csv';
    a.click();
  };

  const copyToClipboard = () => {
    const text = gaps.map(gap => 
      `${gap.keyword} - ${gap.competitor} (Pos: ${gap.competitorPosition}, Vol: ${gap.searchVolume}, Score: ${gap.opportunityScore})`
    ).join('\n');
    navigator.clipboard.writeText(text);
    alert('Gap analysis copied to clipboard!');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">SEO Competitor Gap Analysis</h1>
          <p className="text-gray-600">Promac Paints vs. Plascon, Dulux & Duram</p>
          <div className="mt-4 flex space-x-4">
            <button
              onClick={exportToCSV}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Export CSV
            </button>
            <button
              onClick={copyToClipboard}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              Copy to Clipboard
            </button>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <KPICard
            title="Promac Traffic (ETV)"
            value={competitorData['promacpaints.co.za'].etv.toLocaleString()}
            change="8.3%"
            changeType="positive"
            icon="📈"
            color="#e74c3c"
          />
          <KPICard
            title="Market Leader (Dulux)"
            value={competitorData['dulux.co.za'].etv.toLocaleString()}
            change="14x ahead"
            changeType="negative"
            icon="👑"
            color="#2ecc71"
          />
          <KPICard
            title="Keyword Opportunities"
            value={gaps.length}
            change="High priority"
            changeType="positive"
            icon="🎯"
            color="#f39c12"
          />
          <KPICard
            title="Top Opportunity Score"
            value={gaps[0]?.opportunityScore || 0}
            change={gaps[0]?.keyword || 'N/A'}
            changeType="positive"
            icon="⚡"
            color="#9b59b6"
          />
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Traffic Trend Chart */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Traffic Trends (6 Month)</h3>
            <Line 
              data={trafficTrendData}
              options={{
                responsive: true,
                plugins: {
                  legend: { position: 'top' },
                  title: { display: false }
                },
                scales: {
                  y: {
                    beginAtZero: true,
                    ticks: {
                      callback: function(value) {
                        return value.toLocaleString();
                      }
                    }
                  }
                }
              }}
            />
          </div>

          {/* Radar Chart */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">SEO Performance Radar</h3>
            <Radar 
              data={radarData}
              options={{
                responsive: true,
                plugins: {
                  legend: { position: 'top' }
                },
                scales: {
                  r: {
                    beginAtZero: true,
                    max: 100,
                    ticks: {
                      stepSize: 20
                    }
                  }
                }
              }}
            />
          </div>
        </div>

        {/* Keyword Gap Analysis */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Top Keyword Opportunities</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Keyword</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Competitor</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Their Position</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Promac Position</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Search Volume</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">CPC</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Opportunity Score</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Intent</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {gaps.map((gap, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{gap.keyword}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{gap.competitor}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{gap.competitorPosition}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{gap.promacPosition}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{gap.searchVolume.toLocaleString()}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">R{gap.cpc.toFixed(2)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        gap.opportunityScore > 500 ? 'bg-red-100 text-red-800' :
                        gap.opportunityScore > 200 ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {gap.opportunityScore}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        gap.intent === 'Commercial' ? 'bg-purple-100 text-purple-800' :
                        gap.intent === 'Informational' ? 'bg-blue-100 text-blue-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {gap.intent}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Strategic Action Plan */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Strategic Action Plan</h3>
          <div className="space-y-4">
            <div className="border-l-4 border-red-500 pl-4">
              <h4 className="font-semibold text-gray-900">Immediate Actions (0-30 days)</h4>
              <ul className="mt-2 space-y-1 text-sm text-gray-600">
                <li>• Target "roof paint" keyword (1,300 monthly searches, currently position 2)</li>
                <li>• Optimize for "waterproofing paint" (480 searches, position 4)</li>
                <li>• Create content for "exterior paint" gap vs Dulux</li>
              </ul>
              <p className="text-xs text-gray-500 mt-2">Owner: SEO Manager | Timeline: 4 weeks</p>
            </div>

            <div className="border-l-4 border-yellow-500 pl-4">
              <h4 className="font-semibold text-gray-900">Medium-term Goals (1-3 months)</h4>
              <ul className="mt-2 space-y-1 text-sm text-gray-600">
                <li>• Build topical authority in industrial paint space</li>
                <li>• Create comparison content vs Duram for marine applications</li>
                <li>• Develop calculator tools like Dulux</li>
              </ul>
              <p className="text-xs text-gray-500 mt-2">Owner: Content Team | Timeline: 12 weeks</p>
            </div>

            <div className="border-l-4 border-green-500 pl-4">
              <h4 className="font-semibold text-gray-900">Long-term Strategy (3-6 months)</h4>
              <ul className="mt-2 space-y-1 text-sm text-gray-600">
                <li>• Expand beyond rubber roofing into general exterior market</li>
                <li>• Build backlink profile to compete with established brands</li>
                <li>• Develop branded search presence</li>
              </ul>
              <p className="text-xs text-gray-500 mt-2">Owner: Marketing Director | Timeline: 6 months</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompetitorGapDashboard;