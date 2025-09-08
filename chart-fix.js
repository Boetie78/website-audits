// Chart Fix - Standalone JavaScript for chart initialization
// This will ensure charts load properly

(function() {
    'use strict';
    
    // Wait for the DOM to be fully loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initAllCharts);
    } else {
        // DOM is already loaded
        initAllCharts();
    }
    
    function initAllCharts() {
        console.log('Starting chart initialization...');
        
        // Give Chart.js time to load
        let attempts = 0;
        const maxAttempts = 10;
        
        function tryInitCharts() {
            attempts++;
            
            if (typeof Chart === 'undefined') {
                console.log(`Attempt ${attempts}: Chart.js not loaded yet...`);
                if (attempts < maxAttempts) {
                    setTimeout(tryInitCharts, 500);
                } else {
                    console.error('Chart.js failed to load after 10 attempts');
                }
                return;
            }
            
            console.log('Chart.js is loaded! Initializing charts...');
            
            // Initialize Issue Distribution Chart
            const issueChartElement = document.getElementById('issueChart');
            if (issueChartElement) {
                try {
                    const issueChart = new Chart(issueChartElement, {
                        type: 'doughnut',
                        data: {
                            labels: ['Critical', 'High', 'Medium', 'Low'],
                            datasets: [{
                                data: [8, 15, 12, 12],
                                backgroundColor: [
                                    '#EF4444', // red-500
                                    '#F97316', // orange-500
                                    '#EAB308', // yellow-500
                                    '#3B82F6'  // blue-500
                                ],
                                borderWidth: 0,
                                cutout: '50%'
                            }]
                        },
                        options: {
                            responsive: true,
                            maintainAspectRatio: true,
                            plugins: {
                                legend: {
                                    display: false
                                },
                                tooltip: {
                                    callbacks: {
                                        label: function(context) {
                                            const label = context.label || '';
                                            const value = context.parsed || 0;
                                            const total = context.dataset.data.reduce((a, b) => a + b, 0);
                                            const percentage = ((value / total) * 100).toFixed(1);
                                            return label + ': ' + value + ' (' + percentage + '%)';
                                        }
                                    }
                                }
                            }
                        }
                    });
                    console.log('✅ Issue chart created successfully');
                } catch (error) {
                    console.error('❌ Error creating issue chart:', error);
                }
            } else {
                console.warn('Issue chart canvas not found');
            }
            
            // Initialize Keyword Intent Chart
            const keywordChartElement = document.getElementById('keywordIntentChart');
            if (keywordChartElement) {
                try {
                    const keywordChart = new Chart(keywordChartElement, {
                        type: 'doughnut',
                        data: {
                            labels: ['Commercial', 'Transactional', 'Local', 'Informational'],
                            datasets: [{
                                data: [42, 28, 18, 12],
                                backgroundColor: [
                                    '#F97316', // orange-500
                                    '#8B5CF6', // purple-500
                                    '#EF4444', // red-500
                                    '#3B82F6'  // blue-500
                                ],
                                borderColor: [
                                    '#EA580C', // orange-600
                                    '#7C3AED', // purple-600
                                    '#DC2626', // red-600
                                    '#2563EB'  // blue-600
                                ],
                                borderWidth: 2,
                                cutout: '60%'
                            }]
                        },
                        options: {
                            responsive: true,
                            maintainAspectRatio: false,
                            plugins: {
                                legend: {
                                    position: 'bottom',
                                    labels: {
                                        padding: 15,
                                        font: {
                                            size: 11
                                        },
                                        usePointStyle: true,
                                        pointStyle: 'circle'
                                    }
                                },
                                tooltip: {
                                    callbacks: {
                                        label: function(context) {
                                            const label = context.label || '';
                                            const value = context.parsed || 0;
                                            return label + ': ' + value + '% of opportunities';
                                        }
                                    }
                                }
                            }
                        }
                    });
                    console.log('✅ Keyword intent chart created successfully');
                } catch (error) {
                    console.error('❌ Error creating keyword intent chart:', error);
                }
            } else {
                console.warn('Keyword intent chart canvas not found');
            }
            
            // Initialize Social Media Chart
            const socialChartElement = document.getElementById('socialMediaChart');
            if (socialChartElement) {
                try {
                    const socialChart = new Chart(socialChartElement, {
                        type: 'bar',
                        data: {
                            labels: ['Promac Paints', 'Dulux SA', 'Plascon', 'Duram'],
                            datasets: [
                                {
                                    label: 'Facebook Followers',
                                    data: [1234, 45000, 28000, 8900],
                                    backgroundColor: 'rgba(59, 130, 246, 0.8)',
                                    borderColor: 'rgba(59, 130, 246, 1)',
                                    borderWidth: 1
                                },
                                {
                                    label: 'Instagram Followers',
                                    data: [890, 38000, 22000, 4500],
                                    backgroundColor: 'rgba(236, 72, 153, 0.8)',
                                    borderColor: 'rgba(236, 72, 153, 1)',
                                    borderWidth: 1
                                },
                                {
                                    label: 'YouTube Subscribers',
                                    data: [47, 549, 637, 0],
                                    backgroundColor: 'rgba(239, 68, 68, 0.8)',
                                    borderColor: 'rgba(239, 68, 68, 1)',
                                    borderWidth: 1
                                },
                                {
                                    label: 'LinkedIn Followers',
                                    data: [245, 2500, 3400, 800],
                                    backgroundColor: 'rgba(99, 102, 241, 0.8)',
                                    borderColor: 'rgba(99, 102, 241, 1)',
                                    borderWidth: 1
                                }
                            ]
                        },
                        options: {
                            responsive: true,
                            maintainAspectRatio: false,
                            plugins: {
                                title: {
                                    display: true,
                                    text: 'Social Media Followers Comparison',
                                    font: {
                                        size: 16,
                                        weight: 'bold'
                                    }
                                },
                                legend: {
                                    position: 'bottom'
                                }
                            },
                            scales: {
                                y: {
                                    beginAtZero: true,
                                    ticks: {
                                        callback: function(value) {
                                            if (value >= 1000) {
                                                return (value/1000).toFixed(0) + 'K';
                                            }
                                            return value;
                                        }
                                    }
                                }
                            }
                        }
                    });
                    console.log('✅ Social media chart created successfully');
                } catch (error) {
                    console.error('❌ Error creating social media chart:', error);
                }
            } else {
                console.warn('Social media chart canvas not found');
            }
            
            console.log('Chart initialization complete!');
        }
        
        // Start trying to initialize charts
        tryInitCharts();
    }
})();