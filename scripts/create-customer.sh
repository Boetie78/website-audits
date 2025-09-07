#!/bin/bash

# Website Audits - Customer Creation Script
# Usage: ./scripts/create-customer.sh "Customer Name" "domain.com"

set -e

# Check if correct number of arguments provided
if [ $# -ne 2 ]; then
    echo "❌ Error: Incorrect number of arguments"
    echo "Usage: $0 \"Customer Name\" \"domain.com\""
    echo "Example: $0 \"IntelliMinds\" \"intelliminds.co.za\""
    exit 1
fi

CUSTOMER_NAME="$1"
DOMAIN="$2"

# Convert customer name to lowercase and replace spaces with hyphens for folder name
FOLDER_NAME=$(echo "$CUSTOMER_NAME" | tr '[:upper:]' '[:lower:]' | sed 's/ /-/g')

# Create base directory structure
echo "🚀 Creating customer structure for: $CUSTOMER_NAME"
echo "📁 Folder: customers/$FOLDER_NAME"
echo "🌐 Domain: $DOMAIN"

# Create directories
mkdir -p "customers/$FOLDER_NAME"/{seo-audit,competitor-analysis,keyword-analysis}

echo "✅ Directories created successfully"

# Create main customer dashboard
cat > "customers/$FOLDER_NAME/index.html" << EOF
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>$CUSTOMER_NAME - Website Audit Dashboard</title>
    <meta name="description" content="Professional website audit dashboard for $CUSTOMER_NAME - SEO, Competitor Analysis, and Keyword Research reports">
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>📊</text></svg>">
</head>
<body class="bg-gray-50">
    <header class="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-12">
        <div class="max-w-6xl mx-auto px-6 text-center">
            <h1 class="text-4xl font-bold mb-4">$CUSTOMER_NAME</h1>
            <p class="text-xl opacity-90 mb-2">Website Audit Dashboard</p>
            <p class="text-sm opacity-75">Domain: <strong>$DOMAIN</strong></p>
        </div>
    </header>
    
    <main class="max-w-6xl mx-auto px-6 py-16">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div class="bg-white rounded-xl p-8 shadow-lg text-center">
                <div class="text-6xl mb-4">📈</div>
                <h3 class="text-xl font-bold mb-3">SEO Audit</h3>
                <p class="text-gray-600 mb-6">Comprehensive technical SEO analysis</p>
                <span class="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-semibold">⏳ Pending</span>
            </div>
            
            <div class="bg-white rounded-xl p-8 shadow-lg text-center">
                <div class="text-6xl mb-4">🎯</div>
                <h3 class="text-xl font-bold mb-3">Competitor Analysis</h3>
                <p class="text-gray-600 mb-6">Market positioning and opportunities</p>
                <span class="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-semibold">⏳ Pending</span>
            </div>
            
            <div class="bg-white rounded-xl p-8 shadow-lg text-center">
                <div class="text-6xl mb-4">🔍</div>
                <h3 class="text-xl font-bold mb-3">Keyword Research</h3>
                <p class="text-gray-600 mb-6">Strategic keyword opportunities</p>
                <span class="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-semibold">⏳ Pending</span>
            </div>
        </div>
    </main>
</body>
</html>
EOF

# Create placeholder audit pages
for audit_type in seo-audit competitor-analysis keyword-analysis; do
    cat > "customers/$FOLDER_NAME/$audit_type/index.html" << EOF
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>$CUSTOMER_NAME - ${audit_type^} Report</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-50">
    <div class="max-w-4xl mx-auto px-6 py-16 text-center">
        <div class="bg-white rounded-xl p-12 shadow-lg">
            <div class="text-6xl mb-6">📊</div>
            <h1 class="text-3xl font-bold mb-4">$CUSTOMER_NAME</h1>
            <h2 class="text-xl text-gray-600 mb-6">${audit_type^} Report</h2>
            <p class="text-gray-500 mb-8">Domain: $DOMAIN</p>
            <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                <h3 class="text-lg font-semibold text-yellow-800 mb-2">⏳ Analysis in Progress</h3>
                <p class="text-yellow-700">This ${audit_type} report is currently being prepared. Please check back soon.</p>
            </div>
        </div>
    </div>
</body>
</html>
EOF
done

echo "✅ Customer dashboard created: customers/$FOLDER_NAME/"
echo "✅ SEO audit placeholder: customers/$FOLDER_NAME/seo-audit/"
echo "✅ Competitor analysis placeholder: customers/$FOLDER_NAME/competitor-analysis/"
echo "✅ Keyword research placeholder: customers/$FOLDER_NAME/keyword-analysis/"

echo ""
echo "🎉 Customer setup complete!"
echo "📊 Dashboard URL: customers/$FOLDER_NAME/"
echo "🔗 After GitHub deployment: https://YOUR_USERNAME.github.io/website-audits/customers/$FOLDER_NAME/"
echo ""
echo "💡 Next steps:"
echo "1. Replace placeholder content with actual audit reports"
echo "2. Update dashboard with real statistics and completion status"
echo "3. Commit and push changes to GitHub"
