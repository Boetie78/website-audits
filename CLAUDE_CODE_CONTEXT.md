# Claude Code Context - Website Audits Portfolio

## 📍 PROJECT LOCATION
**Primary Directory**: `/Users/boetiefischer/website-audits/`
**Live Website**: `https://boetie78.github.io/website-audits/`
**GitHub Repository**: `https://github.com/Boetie78/website-audits.git`

## 🏗️ PROJECT STRUCTURE

```
/Users/boetiefischer/website-audits/
├── index.html                      # Main portfolio dashboard
├── customers/                      # All customer data
│   └── intelliminds/              # Example customer (COMPLETE)
│       ├── index.html             # Customer dashboard
│       ├── seo-audit/
│       │   └── index.html         # Complete SEO report (91.59 score)
│       ├── competitor-analysis/
│       │   └── index.html         # Placeholder - READY FOR REPORTS
│       └── keyword-analysis/
│           └── index.html         # Placeholder - READY FOR REPORTS
├── scripts/
│   └── create-customer.sh         # Automated customer creation
├── README.md                      # Project overview
├── DEPLOYMENT_INSTRUCTIONS.md     # GitHub Pages setup
└── CLAUDE_CODE_CONTEXT.md         # This file
```

## 🎯 WHERE TO SAVE NEW REPORTS

### For Existing Customer (IntelliMinds):
**Customer Dashboard**: `/Users/boetiefischer/website-audits/customers/intelliminds/index.html`
**SEO Reports**: `/Users/boetiefischer/website-audits/customers/intelliminds/seo-audit/index.html`
**Competitor Reports**: `/Users/boetiefischer/website-audits/customers/intelliminds/competitor-analysis/index.html`
**Keyword Reports**: `/Users/boetiefischer/website-audits/customers/intelliminds/keyword-analysis/index.html`

### For New Customers:
**Pattern**: `/Users/boetiefischer/website-audits/customers/{CUSTOMER_NAME_LOWERCASE}/`
**Example**: `/Users/boetiefischer/website-audits/customers/techcorp/seo-audit/index.html`

## 🛠️ AUTOMATION TOOLS

### Create New Customer:
```bash
cd /Users/boetiefischer/website-audits
./scripts/create-customer.sh "Customer Name" "domain.com"
```

### Deploy Changes:
```bash
cd /Users/boetiefischer/website-audits
git add .
git commit -m "Add new audit report for [Customer]"
git push
```

## 📊 REPORT FORMATS & TEMPLATES

### 1. Customer Dashboard Template:
- **File**: `customers/{customer}/index.html`
- **Purpose**: Overview of all audits for the customer
- **Features**: Progress tracking, quick actions, summary stats

### 2. SEO Audit Template:
- **File**: `customers/{customer}/seo-audit/index.html`
- **Features**: Score visualization, issues list, action plan, Core Web Vitals
- **Example Score Format**: "91.59/100"

### 3. Competitor Analysis Template:
- **File**: `customers/{customer}/competitor-analysis/index.html`
- **Features**: Competitor comparison, market positioning, opportunities

### 4. Keyword Analysis Template:
- **File**: `customers/{customer}/keyword-analysis/index.html`
- **Features**: Keyword research, search volume, competition analysis

## 🎨 DESIGN STANDARDS

### CSS Framework:
- **TailwindCSS**: `<script src="https://cdn.tailwindcss.com"></script>`
- **Charts**: Chart.js via CDN
- **Icons**: Emoji-based (📊 📈 🎯 etc.)

### Color Scheme:
- **Primary**: Blue (`bg-blue-600`, `text-blue-600`)
- **Success**: Green (`bg-green-500`)
- **Warning**: Yellow (`bg-yellow-500`)
- **Danger**: Red (`bg-red-500`)

### Layout Standards:
- **Mobile Responsive**: Always include `viewport` meta tag
- **Professional Typography**: `font-sans` for body, `font-bold` for headings
- **Cards**: `bg-white shadow-lg rounded-lg p-6`
- **Navigation**: Consistent breadcrumbs and customer branding

## 📋 CURRENT CUSTOMERS

### IntelliMinds (ACTIVE)
- **Domain**: intelliminds.co.za
- **Status**: Complete SEO audit (91.59 score)
- **Pending**: Competitor analysis, keyword research
- **Live URL**: `https://boetie78.github.io/website-audits/customers/intelliminds/`

## 🎯 WHEN CREATING NEW REPORTS

### Required Elements:
1. **Navigation breadcrumbs** linking back to customer dashboard
2. **Professional header** with customer branding
3. **Executive summary** with key metrics
4. **Detailed analysis** sections
5. **Action items** with timelines
6. **Export functionality** (PDF button)
7. **Mobile responsive** design

### File Naming Convention:
- **Customer folders**: Lowercase, hyphenated (`tech-corp`, `acme-inc`)
- **Report files**: Always `index.html` in respective folders
- **Assets**: Store in same directory as report

### Data Integration:
- **Scores**: Use percentage format (91.59/100)
- **Timelines**: Week-based implementation plans
- **Priority**: High/Medium/Low with color coding
- **Charts**: Interactive with Chart.js

## 🚀 DEPLOYMENT WORKFLOW

After creating/updating any report:
```bash
cd /Users/boetiefischer/website-audits
git add .
git commit -m "Add [Report Type] for [Customer Name]"
git push
```
**Website updates automatically via GitHub Pages!**

## 💡 QUICK COMMANDS FOR CLAUDE CODE

### Check Project Status:
```bash
cd /Users/boetiefischer/website-audits && git status
```

### View Current Customers:
```bash
ls -la /Users/boetiefischer/website-audits/customers/
```

### Test Local Development:
```bash
cd /Users/boetiefischer/website-audits && python3 -m http.server 8000
```

## 🎯 SUCCESS METRICS

### IntelliMinds Example Results:
- **SEO Score**: 91.59/100
- **Issues Identified**: 13 total (3 High, 3 Medium, 7 Low)
- **Implementation Timeline**: 16 weeks
- **Core Web Vitals**: Analyzed and optimized
- **Client Feedback**: Professional presentation appreciated

---

**This context enables Claude Code to understand the complete project structure and create professional, consistent audit reports that integrate seamlessly with the existing portfolio system.**