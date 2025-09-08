#!/usr/bin/env python3
"""
Automated Social Media Data Scraper for Paint Companies
Collects followers, posts, engagement data from multiple platforms
"""

import requests
from bs4 import BeautifulSoup
import json
import time
import re
from urllib.parse import urljoin
import csv
from datetime import datetime

class SocialMediaScraper:
    def __init__(self):
        self.session = requests.Session()
        self.session.headers.update({
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        })
        self.results = []
    
    def scrape_instagram_basic(self, username):
        """Scrape basic Instagram data without API"""
        try:
            url = f"https://www.instagram.com/{username}/"
            response = self.session.get(url, timeout=10)
            
            if response.status_code != 200:
                return {"error": f"Failed to access {username}"}
            
            # Look for JSON data in script tags
            soup = BeautifulSoup(response.text, 'html.parser')
            
            # Try to find follower count in meta tags or JSON
            followers = "Unable to extract"
            posts = "Unable to extract"
            following = "Unable to extract"
            
            # Look for specific patterns in the HTML
            text = response.text
            
            # Pattern matching for Instagram data
            follower_match = re.search(r'"edge_followed_by":\{"count":(\d+)\}', text)
            if follower_match:
                followers = f"{int(follower_match.group(1)):,}"
            
            posts_match = re.search(r'"edge_owner_to_timeline_media":\{"count":(\d+)\}', text)
            if posts_match:
                posts = posts_match.group(1)
                
            following_match = re.search(r'"edge_follow":\{"count":(\d+)\}', text)
            if following_match:
                following = f"{int(following_match.group(1)):,}"
            
            return {
                "platform": "Instagram",
                "username": username,
                "followers": followers,
                "following": following,
                "posts": posts,
                "url": url,
                "status": "Active" if followers != "Unable to extract" else "Unknown"
            }
            
        except Exception as e:
            return {"error": f"Instagram scraping failed for {username}: {str(e)}"}
    
    def scrape_facebook_page(self, page_name):
        """Scrape Facebook page data"""
        try:
            url = f"https://www.facebook.com/{page_name}"
            response = self.session.get(url, timeout=10)
            
            if response.status_code != 200:
                return {"error": f"Failed to access Facebook page {page_name}"}
            
            soup = BeautifulSoup(response.text, 'html.parser')
            
            # Facebook makes it difficult to scrape, but we can try basic info
            likes = "Requires manual check"
            followers = "Requires manual check"
            
            return {
                "platform": "Facebook", 
                "page": page_name,
                "likes": likes,
                "followers": followers,
                "url": url,
                "note": "Facebook data requires manual inspection due to anti-scraping measures"
            }
            
        except Exception as e:
            return {"error": f"Facebook scraping failed for {page_name}: {str(e)}"}
    
    def get_comprehensive_data(self):
        """Get all social media data for paint companies"""
        
        companies = {
            "Promac Paints": {
                "instagram": "promac_paints",
                "facebook": "PromacPaints"
            },
            "Dulux SA": {
                "instagram": "duluxsa", 
                "facebook": "dulux"
            },
            "Plascon": {
                "instagram": "plascon_sa",  # Estimated handle
                "facebook": "plascon"      # Estimated handle
            }
        }
        
        print("🔄 Starting automated social media data collection...")
        print("=" * 60)
        
        all_results = []
        
        for company, handles in companies.items():
            print(f"\n📊 Collecting data for {company}...")
            
            # Instagram data
            if "instagram" in handles:
                print(f"  📸 Scraping Instagram @{handles['instagram']}...")
                ig_data = self.scrape_instagram_basic(handles['instagram'])
                ig_data['company'] = company
                all_results.append(ig_data)
                time.sleep(2)  # Rate limiting
            
            # Facebook data  
            if "facebook" in handles:
                print(f"  📘 Checking Facebook @{handles['facebook']}...")
                fb_data = self.scrape_facebook_page(handles['facebook'])
                fb_data['company'] = company
                all_results.append(fb_data)
                time.sleep(2)  # Rate limiting
        
        return all_results
    
    def save_results(self, results, filename="social_media_data.csv"):
        """Save results to CSV"""
        if not results:
            print("❌ No results to save")
            return
        
        # Create CSV with all collected data
        with open(filename, 'w', newline='', encoding='utf-8') as csvfile:
            fieldnames = ['company', 'platform', 'handle', 'followers', 'following', 
                         'posts', 'likes', 'url', 'status', 'note', 'collected_at']
            writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
            
            writer.writeheader()
            for result in results:
                row = {
                    'company': result.get('company', ''),
                    'platform': result.get('platform', ''),
                    'handle': result.get('username', result.get('page', '')),
                    'followers': result.get('followers', ''),
                    'following': result.get('following', ''),
                    'posts': result.get('posts', ''),
                    'likes': result.get('likes', ''),
                    'url': result.get('url', ''),
                    'status': result.get('status', ''),
                    'note': result.get('note', result.get('error', '')),
                    'collected_at': datetime.now().strftime('%Y-%m-%d %H:%M:%S')
                }
                writer.writerow(row)
        
        print(f"✅ Results saved to {filename}")

def main():
    scraper = SocialMediaScraper()
    
    print("🚀 URGENT SOCIAL MEDIA DATA COLLECTION")
    print("🎯 Paint Industry Competitive Analysis")
    print("=" * 50)
    
    # Get all data
    results = scraper.get_comprehensive_data()
    
    # Add known YouTube data from previous MCP research
    youtube_data = [
        {
            'company': 'Promac Paints',
            'platform': 'YouTube',
            'handle': '@promacpaints4081',
            'followers': '47',
            'posts': '14',
            'status': 'Inactive (2+ years)',
            'url': 'https://www.youtube.com/@promacpaints4081',
            'note': 'Confirmed via MCP - Very low engagement'
        },
        {
            'company': 'Dulux SA', 
            'platform': 'YouTube',
            'handle': '@DuluxSA',
            'followers': '549',
            'posts': 'Multiple',
            'status': 'Inactive (10 years)',
            'url': 'https://www.youtube.com/@DuluxSA',
            'note': 'Confirmed via MCP - Historical content only'
        },
        {
            'company': 'Plascon',
            'platform': 'YouTube', 
            'handle': '@plasconpaintsouthafrica',
            'followers': '637',
            'posts': 'Multiple',
            'status': 'Active (2023-2024)',
            'url': 'https://www.youtube.com/@plasconpaintsouthafrica',
            'note': 'Confirmed via MCP - 500-6K views per video'
        }
    ]
    
    # Combine all results
    all_results = results + youtube_data
    
    # Save to CSV
    scraper.save_results(all_results, '/Users/boetiefischer/website-audits/urgent_social_media_data.csv')
    
    # Print summary
    print("\n" + "=" * 60)
    print("📈 URGENT DATA COLLECTION COMPLETE")
    print("=" * 60)
    
    for result in all_results:
        if 'error' not in result:
            company = result.get('company', 'Unknown')
            platform = result.get('platform', 'Unknown')
            followers = result.get('followers', 'N/A')
            status = result.get('status', 'Unknown')
            
            print(f"🏢 {company} - {platform}")
            print(f"   👥 Followers: {followers}")
            print(f"   📊 Status: {status}")
            print()
    
    print("💾 Data saved to: urgent_social_media_data.csv")
    print("🔥 URGENT COLLECTION COMPLETE - Ready for report!")

if __name__ == "__main__":
    main()