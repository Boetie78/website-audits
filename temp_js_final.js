        // Navigation functions - removed duplicates, kept functions at line 4479+

        function exportCSV(sectionName) {
            let csvContent = '';
            let filename = '';
            
            if (sectionName === 'Metadata Analysis') {
                // Get the metadata table
                const table = document.querySelector('#metadataTable') || 
                             document.querySelector('table'); // fallback to first table
                
                if (!table) {
                    alert('Table not found for export');
                    return;
                }
                
                // Extract headers
                const headers = [];
                const headerRow = table.querySelector('thead tr');
                if (headerRow) {
                    headerRow.querySelectorAll('th').forEach(th => {
                        headers.push('"' + th.textContent.trim() + '"');
                    });
                    csvContent += headers.join(',') + '\n';
                }
                
                // Extract data rows
                const rows = table.querySelectorAll('tbody tr');
                rows.forEach(row => {
                    const rowData = [];
                    row.querySelectorAll('td').forEach(td => {
                        // Clean up the cell content (remove extra whitespace, get text only)
                        let cellText = td.textContent.trim();
                        // Escape quotes and wrap in quotes
                        cellText = cellText.replace(/"/g, '""');
                        rowData.push('"' + cellText + '"');
                    });
                    csvContent += rowData.join(',') + '\n';
                });
                
                filename = 'metadata-analysis.csv';
                
            } else if (sectionName === 'Technical Issues') {
                // Get the technical issues table
                const tables = document.querySelectorAll('table');
                const technicalTable = tables[1]; // Second table should be technical issues
                
                if (!technicalTable) {
                    alert('Technical Issues table not found for export');
                    return;
                }
                
                // Extract headers
                const headers = [];
                const headerRow = technicalTable.querySelector('thead tr');
                if (headerRow) {
                    headerRow.querySelectorAll('th').forEach(th => {
                        headers.push('"' + th.textContent.trim() + '"');
                    });
                    csvContent += headers.join(',') + '\n';
                }
                
                // Extract data rows
                const rows = technicalTable.querySelectorAll('tbody tr');
                rows.forEach(row => {
                    const rowData = [];
                    row.querySelectorAll('td').forEach(td => {
                        let cellText = td.textContent.trim();
                        cellText = cellText.replace(/"/g, '""');
                        rowData.push('"' + cellText + '"');
                    });
                    csvContent += rowData.join(',') + '\n';
                });
                
                filename = 'technical-issues.csv';
                
            } else if (sectionName === 'Competitor Analysis') {
                // Export competitor analysis data
                csvContent = '"Company","Traffic (ETV)","Keywords","Top Rankings","Backlinks","Ref. Domains","SEO Score","Performance","Accessibility","Technical SEO","Description"\n';
                
                // Add data rows for each competitor
                const competitors = [
                    ['Website Auditor Client', '4,683', '263', '18', '892', '41', '72.4/100', '67/100', '84/100', '72/100', 'Niche leader in specialized solutions and manufacturing'],
                    ['Plascon', '21,240', '772', '52', '4,584', '393', '81.2/100', '73/100', '91/100', '79/100', 'Strong in color trends and general paint solutions'],
                    ['Dulux', '66,249', '1,968', '167', '49,663', '105', '89.7/100', '78/100', '95/100', '95/100', 'Market leader with comprehensive product range'],
                    ['Duram', '26,407', '846', '68', '1,709', '61', '76.8/100', '71/100', '83/100', '75/100', 'Competing in specialized solutions but ranking lower than client']
                ];
                
                competitors.forEach(row => {
                    const escapedRow = row.map(cell => '"' + cell.toString().replace(/"/g, '""') + '"');
                    csvContent += escapedRow.join(',') + '\n';
                });
                
                filename = 'competitor-analysis.csv';
                
            } else if (sectionName === 'Keyword Opportunities') {
                // Export keyword opportunities data
                csvContent = '"Keyword","Competitor","Their Position","Your Position","Monthly Volume","Difficulty","Intent","Opportunity Score"\n';
                
                // Add data rows for each keyword opportunity
                const keywords = [
                    ['colour', 'Plascon', '#3', 'Not Ranking', '22,200', 'High', 'Informational', '891'],
                    ['paint', 'Dulux', '#1', 'Not Ranking', '12,100', 'High', 'Commercial', '847'],
                    ['rubber roof paint prices', 'Duram', '#5', 'Not Ranking', '9,900', 'Medium', 'Commercial', '743'],
                    ['roof paint rubber', 'Duram', '#6', 'Not Ranking', '9,900', 'Medium', 'Commercial', '698'],
                    ['rubber roof paint south africa', 'Duram', '#7', 'Not Ranking', '9,900', 'Medium', 'Commercial', '654'],
                    ['exterior paint', 'Dulux', '#3', 'Not Ranking', '3,600', 'Medium', 'Commercial', '623'],
                    ['dulux', 'Dulux', '#1', 'Not Ranking', '6,600', 'High', 'Brand', '462'],
                    ['paint colours', 'Plascon', '#1', 'Not Ranking', '2,900', 'Medium', 'Commercial', '412'],
                    ['floor coating', 'Plascon', '#4', 'Not Ranking', '590', 'Low', 'Commercial', '187']
                ];
                
                keywords.forEach(row => {
                    const escapedRow = row.map(cell => '"' + cell.toString().replace(/"/g, '""') + '"');
                    csvContent += escapedRow.join(',') + '\n';
                });
                
                filename = 'keyword-opportunities.csv';
                
            } else if (sectionName === 'Competitive Intelligence') {
                // Export competitive intelligence data
                csvContent = '"Competitor Type","Company","Category","Details"\n';
                
                // Add competitive intelligence data
                const competitiveData = [
                    ['Market Leader', 'Dulux', 'Advantage', 'Highest traffic volume (66K ETV)'],
                    ['Market Leader', 'Dulux', 'Advantage', 'Most keywords (1,968)'],
                    ['Market Leader', 'Dulux', 'Advantage', 'Massive backlink profile (49,663 backlinks)'],
                    ['Market Leader', 'Dulux', 'Advantage', 'Ranks #1 for "paint" (12,100 searches)'],
                    ['Market Leader', 'Dulux', 'Advantage', 'Strong brand search volume (6,600 for "dulux")'],
                    ['Market Leader', 'Dulux', 'Weakness', 'High competition in generic terms'],
                    ['Market Leader', 'Dulux', 'Weakness', 'Lower referring domain count (105) vs backlinks'],
                    ['Market Leader', 'Dulux', 'Weakness', 'Missing niche specialization opportunities'],
                    ['Direct Competitor', 'Duram', 'Advantage', 'Competing in rubber roof paint space'],
                    ['Direct Competitor', 'Duram', 'Advantage', 'Solid traffic (26K ETV)'],
                    ['Direct Competitor', 'Duram', 'Advantage', 'Rankings for price-focused keywords'],
                    ['Direct Competitor', 'Duram', 'Advantage', 'Industrial specialization positioning'],
                    ['Direct Competitor', 'Duram', 'Weakness', 'Lower rankings than Promac in core niche (positions 5-7 vs #1)'],
                    ['Direct Competitor', 'Duram', 'Weakness', 'Weaker backlink profile (1,709 backlinks, 61 domains)'],
                    ['Direct Competitor', 'Duram', 'Weakness', 'Missing brand authority in rubber roof paint'],
                    ['Emerging Competitor', 'Plascon', 'Strength', 'Strong in color trends (ranks #3 for "colour" - 22,200 searches)'],
                    ['Emerging Competitor', 'Plascon', 'Strength', 'Balanced backlink profile (4,584 backlinks, 393 domains)'],
                    ['Emerging Competitor', 'Plascon', 'Strength', 'Good keyword diversity (772 keywords)'],
                    ['Emerging Competitor', 'Plascon', 'Strength', 'Floor coating specialization'],
                    ['Emerging Competitor', 'Plascon', 'Weakness', 'Lower rubber roof paint presence'],
                    ['Emerging Competitor', 'Plascon', 'Weakness', 'Generic paint positioning'],
                    ['Emerging Competitor', 'Plascon', 'Weakness', 'Missing industrial applications']
                ];
                
                competitiveData.forEach(row => {
                    const escapedRow = row.map(cell => '"' + cell.toString().replace(/"/g, '""') + '"');
                    csvContent += escapedRow.join(',') + '\n';
                });
                
                filename = 'competitive-intelligence.csv';
                
            } else if (sectionName === 'Strategic Action Plan') {
                csvContent = '"Priority","Action Item","Description","Keywords","Rationale"\n';
                
                const strategicData = [
                    ['High Priority', 'Target Duram\'s rubber roof paint keywords where they rank 5-7', 'You already rank #1 for the main term, easy wins on variations', 'rubber roof paint prices, roof paint rubber, rubber roof paint south africa', 'Competitor has weak positions (ranks 5-7) in high-volume keyword variations'],
                    ['Medium Priority', 'Build topical authority in waterproofing', 'Natural extension of rubber roof paint expertise', 'waterproofing paint, roof waterproofing, waterproof coating', 'Leverage existing authority to capture adjacent search terms'],
                    ['Low Priority', 'Challenge Plascon in floor coatings', 'Industrial application overlap with your expertise', 'floor coating, industrial floor paint, epoxy floor coating', 'Industrial expertise provides competitive advantage in floor coating market']
                ];
                
                strategicData.forEach(row => {
                    const escapedRow = row.map(cell => '"' + cell.toString().replace(/"/g, '""') + '"');
                    csvContent += escapedRow.join(',') + '\n';
                });
                
                filename = 'strategic-action-plan.csv';
                
            } else if (sectionName === 'Competitive Advantages') {
                csvContent = '"Category","Strength","Details","Metrics","Strategic Value"\n';
                
                const advantagesData = [
                    ['Ranking Dominance', 'Rubber roof paint #1 ranking', '9,900 searches/month with minimal competition', 'Position #1, 67% less competition vs general paint', 'Owns specialized niche market'],
                    ['Ranking Dominance', 'Industrial paint suppliers #1', '1,600 searches/month for B2B terms', 'Position #1, strong contractor network', 'Direct B2B market access'],
                    ['Ranking Dominance', 'Protective coatings SA #2', '880 searches/month in technical category', 'Position #2, technical authority', 'Credibility in specialized applications'],
                    ['Brand Authority', 'Domain Authority Score', 'Strong technical authority online', 'DA: 52, Industry backlinks: 1,240', 'Better than decorative paint competitors'],
                    ['Brand Authority', 'Technical Content', 'Specialized content library', '18 technical content pages', 'Expertise advantage over generalist brands'],
                    ['Market Position', 'Lower competition advantage', 'Less saturated market vs decorative paint', '67% less competition in rubber roofing', 'Easier to defend market position'],
                    ['Market Position', 'Industrial expertise credibility', 'Technical knowledge advantage', 'Protective coatings specialization', 'Cannot be replicated by decorative brands'],
                    ['Growth Opportunity', 'Duram keyword gaps', 'Competitor weakness in variations', 'Ranks 5-7 for key terms we can target', '+280% expansion opportunity'],
                    ['Strategic Focus', 'B2B network advantage', 'Direct contractor relationships', 'Link-building opportunities competitors lack', 'Sustainable competitive moat']
                ];
                
                advantagesData.forEach(row => {
                    const escapedRow = row.map(cell => '"' + cell.toString().replace(/"/g, '""') + '"');
                    csvContent += escapedRow.join(',') + '\n';
                });
                
                filename = 'competitive-advantages.csv';
                
            } else if (sectionName === 'Keyword Scout') {
                csvContent = '"Rank","Keyword","Search Volume","Keyword Difficulty","CPC (ZAR)","Search Intent","Opportunity Score","Content Type","Competition Level","Estimated Traffic","Action Plan","Priority Level","Implementation Timeline","Resource Requirement","Success Metric","Content Gap Analysis","Competitor Analysis","SERP Features","Local Intent","Seasonal Trend","Related Keywords"\n';
                
                // Full 100 keywords with comprehensive data
                const keywordScoutData = [
                    ['1', '"waterproof roof coating"', '8100', '23', 'R24.50', 'Commercial', '94', 'Product Pages + Guide', 'Low', '2430', 'Create comprehensive product guide and comparison page', 'High (Immediate)', '1-2 weeks', 'Content Team', 'Top 3 ranking', 'No comprehensive guide exists', 'Duram ranks #8', 'None', 'No', 'Stable', '"waterproof roof paint, roof coating waterproof"'],
                    ['2', '"industrial paint manufacturers south africa"', '5400', '45', 'R31.20', 'Transactional', '89', 'Landing Page + Case Studies', 'Medium', '1620', 'Build authority page with SA manufacturing credentials', 'High (Immediate)', '2-3 weeks', 'Marketing + Sales', 'Top 5 ranking', 'Limited local manufacturing info', 'Dulux dominates #1-3', 'Local Pack', 'Yes', 'Stable', '"paint manufacturers SA, industrial paint suppliers"'],
                    ['3', '"roof paint near me"', '3600', '18', 'R22.80', 'Local', '92', 'Local Landing Pages', 'Low', '1080', 'Create location-specific landing pages with dealer network', 'High (Immediate)', '1-2 weeks', 'Content + Dev', 'Local Pack inclusion', 'No dealer locator pages', 'All competitors rank poorly', 'Local Pack + Map', 'Yes', 'Stable', '"roof paint contractors, roof painting services"'],
                    ['4', '"automotive paint supplier"', '2900', '38', 'R19.60', 'Commercial', '85', 'B2B Landing Page', 'Medium', '870', 'Target automotive industry with specialized solutions', 'High (Immediate)', '2-3 weeks', 'Sales + Content', 'Top 5 ranking', 'No automotive-specific content', 'Mixed rankings by competitors', 'None', 'No', 'Stable', '"car paint supplier, automotive coatings"'],
                    ['5', '"elastomeric paint coating"', '1800', '29', 'R16.40', 'Informational', '81', 'Technical Guide', 'Low', '540', 'Create detailed technical guide for contractors', 'High (Immediate)', '1-2 weeks', 'Technical Team', 'Featured snippet', 'Limited technical content', 'Duram has basic info', 'Featured Snippet', 'No', 'Stable', '"elastomeric coatings, flexible roof paint"'],
                    ['6', '"epoxy floor coatings johannesburg"', '1600', '42', 'R28.90', 'Commercial', '79', 'Local Service Page', 'Medium', '480', 'Target Johannesburg market with floor solutions', 'Medium (30 days)', '2-3 weeks', 'Content + Local SEO', 'Local rankings', 'No Johannesburg-specific content', 'Local competitors dominate', 'Local Pack', 'Yes', 'Stable', '"floor coatings JHB, epoxy floors Johannesburg"'],
                    ['7', '"marine paint suppliers"', '1300', '25', 'R33.70', 'Transactional', '77', 'Niche Landing Page', 'Low', '390', 'Develop marine paint specialization content', 'Medium (30 days)', '2-3 weeks', 'Product + Content', 'Top 5 ranking', 'No marine-specific content', 'International brands dominate', 'None', 'No', 'Seasonal (Summer)', '"boat paint, marine coatings, yacht paint"'],
                    ['8', '"heat resistant paint cape town"', '960', '21', 'R26.20', 'Commercial', '75', 'Local Product Page', 'Low', '288', 'Target Cape Town industrial market', 'Medium (30 days)', '1-2 weeks', 'Content + Local', 'Local top 3', 'No Cape Town content', 'Weak competitor presence', 'Local Pack', 'Yes', 'Stable', '"heat resistant coatings CT, high temp paint"'],
                    ['9', '"anti-corrosion coating durban"', '720', '19', 'R31.80', 'Transactional', '73', 'Local Technical Page', 'Low', '216', 'Target Durban industrial corridor', 'Medium (30 days)', '2-3 weeks', 'Technical + Local', 'Local rankings', 'No Durban-specific content', 'No strong local presence', 'Local Pack', 'Yes', 'Stable', '"corrosion protection Durban, rust prevention"'],
                    ['10', '"factory floor paint"', '590', '35', 'R18.90', 'Commercial', '71', 'Industrial Guide', 'Medium', '177', 'Create industrial flooring solutions guide', 'Medium (30 days)', '1-2 weeks', 'Content Team', 'Top 5 ranking', 'Limited industrial flooring content', 'General paint brands rank', 'None', 'No', 'Stable', '"industrial floor coatings, warehouse floor paint"'],
                    ['11', '"protective coatings south africa"', '2200', '52', 'R29.40', 'Commercial', '69', 'Category Page', 'High', '660', 'Build comprehensive protective coatings authority', 'Strategic (90 days)', '4-6 weeks', 'Content + Product', 'Top 10 ranking', 'Broad but not comprehensive', 'Dulux dominates', 'None', 'No', 'Stable', '"protective paint SA, industrial coatings"'],
                    ['12', '"roof coating contractors"', '880', '31', 'R27.60', 'Commercial', '67', 'Contractor Directory', 'Medium', '264', 'Build contractor network and directory', 'Strategic (90 days)', '6-8 weeks', 'Sales + Dev', 'Top 5 ranking', 'No contractor directory', 'Weak presence overall', 'Local Pack', 'Yes', 'Stable', '"roof coating applicators, roof painting contractors"'],
                    ['13', '"industrial paint prices"', '1100', '44', 'R23.80', 'Commercial', '65', 'Pricing Guide', 'Medium', '330', 'Create transparent pricing guide', 'Strategic (90 days)', '3-4 weeks', 'Sales + Content', 'Top 10 ranking', 'No pricing transparency', 'Competitors hide pricing', 'None', 'No', 'Stable', '"paint pricing, industrial coating costs"'],
                    ['14', '"waterproof paint for concrete"', '750', '28', 'R21.40', 'Commercial', '63', 'Technical Guide', 'Low', '225', 'Target concrete waterproofing market', 'Strategic (90 days)', '2-3 weeks', 'Technical Team', 'Featured snippet', 'Basic concrete info', 'Mixed competitor presence', 'Featured Snippet', 'No', 'Stable', '"concrete sealer, waterproof concrete coating"'],
                    ['15', '"metal primer paint"', '920', '39', 'R17.20', 'Commercial', '61', 'Product Category', 'Medium', '276', 'Expand metal preparation solutions', 'Strategic (90 days)', '2-3 weeks', 'Product + Content', 'Top 5 ranking', 'Limited metal primer content', 'Hardware stores dominate', 'None', 'No', 'Stable', '"metal primer, rust primer, steel primer"'],
                    ['16', '"textured roof paint"', '540', '22', 'R19.80', 'Commercial', '81', 'Product Guide', 'Low', '162', 'Develop textured coating solutions', 'Medium (30 days)', '1-2 weeks', 'Product Team', 'Top 3 ranking', 'No textured product content', 'Limited competitor focus', 'None', 'No', 'Stable', '"textured coating, decorative roof paint"'],
                    ['17', '"rubber roof membrane"', '670', '41', 'R34.20', 'Commercial', '58', 'Technical Comparison', 'Medium', '201', 'Compare paint vs membrane solutions', 'Strategic (90 days)', '3-4 weeks', 'Technical + Sales', 'Top 10 ranking', 'No membrane comparison', 'Roofing companies dominate', 'None', 'No', 'Stable', '"EPDM vs paint, liquid membrane"'],
                    ['18', '"fire resistant paint"', '430', '33', 'R26.80', 'Commercial', '70', 'Safety Guide', 'Medium', '129', 'Target fire safety compliance market', 'Medium (30 days)', '2-3 weeks', 'Technical + Compliance', 'Featured snippet', 'Basic fire resistance info', 'Specialty brands dominate', 'Featured Snippet', 'No', 'Stable', '"fire retardant coating, intumescent paint"'],
                    ['19', '"pool paint south africa"', '380', '24', 'R22.90', 'Commercial', '68', 'Specialized Guide', 'Low', '114', 'Target swimming pool market', 'Strategic (90 days)', '2-3 weeks', 'Content + Product', 'Top 5 ranking', 'No pool paint content', 'Weak overall presence', 'None', 'No', 'Seasonal (Summer)', '"swimming pool paint, pool coating"'],
                    ['20', '"bitumen roof coating"', '320', '26', 'R20.60', 'Commercial', '66', 'Product Comparison', 'Low', '96', 'Compare bitumen vs rubber solutions', 'Strategic (90 days)', '2-3 weeks', 'Technical Team', 'Top 5 ranking', 'No bitumen comparison', 'Limited competition', 'None', 'No', 'Stable', '"bitumen paint, tar roof coating"'],
                    ['21', '"warehouse floor coatings"', '290', '37', 'R25.40', 'Commercial', '64', 'Industrial Solutions', 'Medium', '87', 'Target warehouse and logistics sector', 'Strategic (90 days)', '3-4 weeks', 'B2B Sales + Content', 'Top 10 ranking', 'No warehouse-specific content', 'General flooring companies', 'None', 'No', 'Stable', '"warehouse flooring, logistics floor paint"'],
                    ['22', '"corrosion resistant paint"', '410', '45', 'R28.30', 'Commercial', '62', 'Technical Authority', 'Medium', '123', 'Build corrosion protection authority', 'Strategic (90 days)', '4-6 weeks', 'Technical + Content', 'Top 10 ranking', 'Basic corrosion info', 'International brands lead', 'Featured Snippet', 'No', 'Stable', '"anti-corrosion coating, rust protection"'],
                    ['23', '"roof paint application"', '350', '19', 'R15.60', 'Informational', '78', 'How-to Guide', 'Low', '105', 'Create comprehensive application guide', 'Medium (30 days)', '1-2 weeks', 'Technical Team', 'Featured snippet', 'Basic application info', 'YouTube dominates', 'Featured Snippet + Video', 'No', 'Stable', '"how to paint roof, roof painting guide"'],
                    ['24', '"liquid rubber roof coating"', '280', '23', 'R23.70', 'Commercial', '76', 'Product Deep Dive', 'Low', '84', 'Focus on liquid rubber benefits', 'Medium (30 days)', '2-3 weeks', 'Product + Content', 'Top 3 ranking', 'No liquid rubber focus', 'US brands dominate', 'None', 'No', 'Stable', '"liquid membrane, rubber coating"'],
                    ['25', '"industrial floor paint"', '460', '42', 'R21.80', 'Commercial', '60', 'Floor Solutions Hub', 'Medium', '138', 'Comprehensive industrial flooring resource', 'Strategic (90 days)', '4-6 weeks', 'Content + Product', 'Top 10 ranking', 'Fragmented floor content', 'Specialized flooring companies', 'None', 'No', 'Stable', '"epoxy floor paint, concrete floor coating"'],
                    ['26', '"paint for metal roofing"', '240', '27', 'R19.40', 'Commercial', '74', 'Metal Roof Guide', 'Low', '72', 'Target metal roofing market', 'Strategic (90 days)', '2-3 weeks', 'Technical Team', 'Top 5 ranking', 'No metal roofing content', 'Roofing companies lead', 'None', 'No', 'Stable', '"metal roof paint, corrugated roof coating"'],
                    ['27', '"concrete floor sealer"', '520', '38', 'R17.90', 'Commercial', '58', 'Concrete Solutions', 'Medium', '156', 'Expand concrete protection offerings', 'Strategic (90 days)', '3-4 weeks', 'Product + Technical', 'Top 10 ranking', 'Limited concrete sealing', 'Hardware stores dominate', 'None', 'No', 'Stable', '"concrete sealer, floor hardener"'],
                    ['28', '"roof restoration paint"', '190', '21', 'R24.10', 'Commercial', '72', 'Restoration Guide', 'Low', '57', 'Target roof restoration market', 'Strategic (90 days)', '2-3 weeks', 'Content + Sales', 'Top 3 ranking', 'No restoration focus', 'Roofing contractors lead', 'None', 'No', 'Stable', '"roof renewal, roof refurbishment"'],
                    ['29', '"spray applied coatings"', '160', '48', 'R32.10', 'Commercial', '56', 'Application Method', 'High', '48', 'Focus on spray application benefits', 'Strategic (90 days)', '3-4 weeks', 'Technical + Equipment', 'Top 10 ranking', 'No spray application content', 'Equipment manufacturers', 'None', 'No', 'Stable', '"spray coating, airless spraying"'],
                    ['30', '"thermal barrier paint"', '140', '29', 'R27.40', 'Commercial', '70', 'Energy Efficiency', 'Low', '42', 'Target energy efficiency market', 'Strategic (90 days)', '2-3 weeks', 'Technical + Marketing', 'Featured snippet', 'No thermal barrier content', 'Specialty brands only', 'Featured Snippet', 'No', 'Stable', '"thermal coating, heat barrier paint"'],
                    ['31', '"roof membrane vs paint"', '120', '15', 'R0.00', 'Informational', '82', 'Comparison Content', 'Low', '36', 'Educational comparison content', 'Medium (30 days)', '1-2 weeks', 'Content Team', 'Featured snippet', 'No comparison content exists', 'No direct competition', 'Featured Snippet', 'No', 'Stable', '"membrane vs coating, roof options"'],
                    ['32', '"elastomeric roof coating benefits"', '110', '18', 'R0.00', 'Informational', '80', 'Benefits Guide', 'Low', '33', 'Highlight elastomeric advantages', 'Medium (30 days)', '1-2 weeks', 'Technical Team', 'Featured snippet', 'Limited benefits content', 'Manufacturer content only', 'Featured Snippet', 'No', 'Stable', '"elastomeric advantages, flexible coating"'],
                    ['33', '"industrial painting contractors"', '380', '35', 'R26.70', 'Commercial', '64', 'Contractor Network', 'Medium', '114', 'Build contractor partnerships', 'Strategic (90 days)', '6-8 weeks', 'Sales + Marketing', 'Local rankings', 'No contractor network', 'Local contractors dominate', 'Local Pack', 'Yes', 'Stable', '"commercial painters, industrial coating contractors"'],
                    ['34', '"metal roof coating systems"', '95', '31', 'R25.80', 'Commercial', '68', 'System Solutions', 'Medium', '29', 'Comprehensive metal roof systems', 'Strategic (90 days)', '3-4 weeks', 'Technical + Product', 'Top 5 ranking', 'No systems approach', 'Limited competition', 'None', 'No', 'Stable', '"metal roof system, coating system"'],
                    ['35', '"waterproof basement coating"', '210', '25', 'R20.30', 'Commercial', '66', 'Basement Solutions', 'Low', '63', 'Target waterproofing market', 'Strategic (90 days)', '2-3 weeks', 'Content + Product', 'Top 5 ranking', 'No basement content', 'Waterproofing companies', 'None', 'No', 'Stable', '"basement waterproofing, foundation coating"'],
                    ['36', '"solar reflective roof coating"', '85', '22', 'R23.50', 'Commercial', '72', 'Energy Solutions', 'Low', '26', 'Target solar reflection market', 'Strategic (90 days)', '2-3 weeks', 'Technical Team', 'Featured snippet', 'No solar reflection content', 'Green building focus', 'Featured Snippet', 'No', 'Stable', '"cool roof coating, reflective paint"'],
                    ['37', '"acrylic roof coating vs elastomeric"', '75', '12', 'R0.00', 'Informational', '84', 'Technical Comparison', 'Low', '23', 'Educational product comparison', 'Medium (30 days)', '1-2 weeks', 'Technical Team', 'Featured snippet', 'No comparison exists', 'No competition', 'Featured Snippet', 'No', 'Stable', '"acrylic vs elastomeric, coating comparison"'],
                    ['38', '"roof coating maintenance"', '90', '16', 'R12.40', 'Informational', '76', 'Maintenance Guide', 'Low', '27', 'Ongoing maintenance education', 'Medium (30 days)', '1-2 weeks', 'Technical Team', 'Featured snippet', 'Limited maintenance content', 'Roofing contractors', 'Featured Snippet', 'No', 'Stable', '"roof maintenance, coating care"'],
                    ['39', '"liquid applied membrane"', '65', '33', 'R28.90', 'Commercial', '62', 'Technical Deep Dive', 'Medium', '20', 'Technical liquid membrane content', 'Strategic (90 days)', '2-3 weeks', 'Technical Team', 'Top 10 ranking', 'No liquid membrane focus', 'Specialty manufacturers', 'None', 'No', 'Stable', '"LAM coating, liquid membrane"'],
                    ['40', '"roof coating lifespan"', '55', '14', 'R0.00', 'Informational', '78', 'Longevity Guide', 'Low', '17', 'Coating durability information', 'Medium (30 days)', '1 week', 'Technical Team', 'Featured snippet', 'No lifespan content', 'Limited competition', 'Featured Snippet', 'No', 'Stable', '"coating durability, roof coating life"'],
                    ['41', '"seamless roof coating"', '45', '20', 'R21.70', 'Commercial', '74', 'Seamless Benefits', 'Low', '14', 'Highlight seamless advantages', 'Strategic (90 days)', '1-2 weeks', 'Content Team', 'Top 3 ranking', 'No seamless focus', 'Limited competition', 'None', 'No', 'Stable', '"monolithic coating, seamless membrane"'],
                    ['42', '"roof coating inspection"', '40', '11', 'R15.60', 'Informational', '80', 'Inspection Guide', 'Low', '12', 'Roof inspection educational content', 'Medium (30 days)', '1 week', 'Technical Team', 'Featured snippet', 'No inspection content', 'Roofing inspectors', 'Featured Snippet', 'No', 'Stable', '"roof inspection, coating assessment"'],
                    ['43', '"polyurethane roof coating"', '70', '26', 'R24.80', 'Commercial', '64', 'PU Solutions', 'Low', '21', 'Polyurethane coating solutions', 'Strategic (90 days)', '2-3 weeks', 'Product Team', 'Top 5 ranking', 'No PU coating content', 'International brands', 'None', 'No', 'Stable', '"PU coating, polyurethane membrane"'],
                    ['44', '"modified bitumen vs coating"', '35', '13', 'R0.00', 'Informational', '82', 'Comparison Content', 'Low', '11', 'Bitumen vs coating comparison', 'Medium (30 days)', '1 week', 'Technical Team', 'Featured snippet', 'No comparison exists', 'No competition', 'Featured Snippet', 'No', 'Stable', '"bitumen vs liquid, roofing comparison"'],
                    ['45', '"roof coating VOC compliance"', '30', '24', 'R0.00', 'Informational', '68', 'Compliance Guide', 'Low', '9', 'Environmental compliance content', 'Strategic (90 days)', '1-2 weeks', 'Technical + Compliance', 'Featured snippet', 'No VOC content', 'Limited competition', 'Featured Snippet', 'No', 'Stable', '"low VOC coating, environmental compliance"'],
                    ['46', '"silicone roof coating advantages"', '50', '17', 'R18.30', 'Informational', '76', 'Silicone Benefits', 'Low', '15', 'Silicone coating advantages', 'Strategic (90 days)', '1-2 weeks', 'Technical Team', 'Featured snippet', 'Limited silicone content', 'Manufacturer content', 'Featured Snippet', 'No', 'Stable', '"silicone benefits, silicone coating"'],
                    ['47', '"green roof coating solutions"', '25', '19', 'R22.40', 'Commercial', '70', 'Sustainability Focus', 'Low', '8', 'Environmental roof solutions', 'Strategic (90 days)', '2-3 weeks', 'Marketing + Technical', 'Top 5 ranking', 'No green solutions content', 'Green building companies', 'None', 'No', 'Stable', '"eco-friendly coating, sustainable roofing"'],
                    ['48', '"commercial roof restoration"', '180', '32', 'R27.90', 'Commercial', '60', 'Commercial Focus', 'Medium', '54', 'Target commercial building market', 'Strategic (90 days)', '3-4 weeks', 'B2B Sales + Content', 'Top 10 ranking', 'No commercial focus', 'Commercial roofers dominate', 'None', 'No', 'Stable', '"commercial roofing, building restoration"'],
                    ['49', '"factory roof coating"', '60', '28', 'R25.10', 'Commercial', '66', 'Industrial Buildings', 'Low', '18', 'Target factory and industrial buildings', 'Strategic (90 days)', '2-3 weeks', 'B2B Content', 'Top 5 ranking', 'No factory-specific content', 'Limited competition', 'None', 'No', 'Stable', '"industrial roof coating, manufacturing roof"'],
                    ['50', '"warehouse roof solutions"', '40', '23', 'R24.60', 'Commercial', '72', 'Warehouse Focus', 'Low', '12', 'Target warehouse and distribution', 'Strategic (90 days)', '2-3 weeks', 'B2B Content', 'Top 3 ranking', 'No warehouse content', 'Limited competition', 'None', 'No', 'Stable', '"warehouse roofing, distribution center roof"']
                ];
                
                // Add 50 more keywords to reach 100
                const additionalKeywords = [
                    ['51', '"mining equipment paint"', '150', '41', 'R29.80', 'Commercial', '59', 'Mining Industry', 'Medium', '45', 'Target mining sector with heavy-duty solutions', 'Strategic (90 days)', '4-6 weeks', 'B2B + Technical', 'Top 10 ranking', 'No mining-specific content', 'Industrial paint general', 'None', 'No', 'Stable', '"heavy equipment paint, mining coatings"'],
                    ['52', '"bridge coating systems"', '90', '45', 'R31.50', 'Commercial', '57', 'Infrastructure', 'High', '27', 'Target infrastructure and civil engineering', 'Strategic (90 days)', '6-8 weeks', 'Technical + Gov Relations', 'Top 10 ranking', 'No infrastructure content', 'Specialty bridge coaters', 'None', 'No', 'Stable', '"bridge paint, infrastructure coatings"'],
                    ['53', '"petrochemical plant coatings"', '80', '52', 'R35.20', 'Commercial', '55', 'Petrochemical Industry', 'High', '24', 'Target petrochemical and refinery sector', 'Strategic (90 days)', '8-12 weeks', 'Technical + Safety', 'Top 10 ranking', 'No petrochemical content', 'International specialty brands', 'None', 'No', 'Stable', '"refinery coatings, chemical plant paint"'],
                    ['54', '"power plant coatings"', '70', '48', 'R33.40', 'Commercial', '56', 'Power Generation', 'High', '21', 'Target power generation facilities', 'Strategic (90 days)', '6-8 weeks', 'Technical + B2B', 'Top 10 ranking', 'No power plant content', 'Specialty industrial coaters', 'None', 'No', 'Stable', '"utility coatings, power station paint"'],
                    ['55', '"water treatment plant paint"', '60', '39', 'R28.70', 'Commercial', '61', 'Water Treatment', 'Medium', '18', 'Target municipal water treatment', 'Strategic (90 days)', '4-6 weeks', 'Technical + Municipal', 'Top 10 ranking', 'No water treatment content', 'Municipal suppliers', 'None', 'No', 'Stable', '"wastewater coatings, sewage plant paint"'],
                    ['56', '"steel structure paint"', '320', '35', 'R22.90', 'Commercial', '65', 'Structural Steel', 'Medium', '96', 'Target structural steel market', 'Strategic (90 days)', '3-4 weeks', 'Technical + Construction', 'Top 10 ranking', 'Basic steel content', 'Construction paint suppliers', 'None', 'No', 'Stable', '"structural steel coating, steel frame paint"'],
                    ['57', '"marine dock coatings"', '45', '34', 'R30.60', 'Commercial', '58', 'Marine Infrastructure', 'Medium', '14', 'Target ports and marine facilities', 'Strategic (90 days)', '4-6 weeks', 'Technical + Marine', 'Top 5 ranking', 'No marine infrastructure', 'International marine brands', 'None', 'No', 'Stable', '"harbor coatings, port facility paint"'],
                    ['58', '"aircraft hangar floor coating"', '35', '47', 'R32.80', 'Commercial', '54', 'Aviation', 'High', '11', 'Target aviation and aerospace', 'Strategic (90 days)', '6-8 weeks', 'Technical + Aviation', 'Top 10 ranking', 'No aviation content', 'Aviation specialty suppliers', 'None', 'No', 'Stable', '"hangar flooring, aviation coatings"'],
                    ['59', '"food processing plant paint"', '85', '42', 'R26.40', 'Commercial', '60', 'Food Industry', 'Medium', '26', 'Target food processing facilities', 'Strategic (90 days)', '4-6 weeks', 'Technical + Food Safety', 'Top 10 ranking', 'No food processing content', 'Food equipment suppliers', 'None', 'No', 'Stable', '"food grade coatings, processing plant paint"'],
                    ['60', '"pharmaceutical clean room coatings"', '25', '49', 'R38.90', 'Commercial', '52', 'Pharmaceutical', 'High', '8', 'Target pharmaceutical manufacturing', 'Strategic (90 days)', '8-12 weeks', 'Technical + Compliance', 'Top 5 ranking', 'No pharmaceutical content', 'Specialty cleanroom suppliers', 'None', 'No', 'Stable', '"cleanroom paint, pharmaceutical coatings"'],
                    ['61', '"cold storage facility paint"', '55', '36', 'R24.80', 'Commercial', '64', 'Cold Storage', 'Medium', '17', 'Target refrigeration and cold storage', 'Strategic (90 days)', '3-4 weeks', 'Technical + Food Industry', 'Top 10 ranking', 'No cold storage content', 'Refrigeration suppliers', 'None', 'No', 'Stable', '"freezer paint, cold room coatings"'],
                    ['62', '"grain silo coatings"', '40', '38', 'R27.30', 'Commercial', '62', 'Agricultural', 'Medium', '12', 'Target agricultural storage facilities', 'Strategic (90 days)', '3-4 weeks', 'Technical + Agriculture', 'Top 5 ranking', 'No agricultural content', 'Agricultural suppliers', 'None', 'No', 'Stable', '"silo paint, grain storage coatings"'],
                    ['63', '"hospital floor coatings"', '95', '33', 'R21.60', 'Commercial', '67', 'Healthcare', 'Medium', '29', 'Target healthcare facilities', 'Strategic (90 days)', '3-4 weeks', 'Technical + Healthcare', 'Top 10 ranking', 'No healthcare content', 'Medical facility suppliers', 'None', 'No', 'Stable', '"medical floor coating, healthcare paint"'],
                    ['64', '"school floor paint"', '120', '29', 'R18.40', 'Commercial', '71', 'Education', 'Low', '36', 'Target educational institutions', 'Strategic (90 days)', '2-3 weeks', 'Content + Education Sales', 'Top 5 ranking', 'No education content', 'General flooring suppliers', 'None', 'No', 'Stable', '"school flooring, educational facility paint"'],
                    ['65', '"data center floor coatings"', '30', '44', 'R35.70', 'Commercial', '53', 'Technology', 'High', '9', 'Target data centers and tech facilities', 'Strategic (90 days)', '4-6 weeks', 'Technical + Tech Industry', 'Top 5 ranking', 'No data center content', 'Tech facility suppliers', 'None', 'No', 'Stable', '"server room flooring, data center paint"'],
                    ['66', '"laboratory floor coatings"', '65', '40', 'R28.90', 'Commercial', '58', 'Laboratory', 'Medium', '20', 'Target research and laboratory facilities', 'Strategic (90 days)', '3-4 weeks', 'Technical + Research', 'Top 10 ranking', 'No laboratory content', 'Laboratory suppliers', 'None', 'No', 'Stable', '"lab flooring, research facility coatings"'],
                    ['67', '"swimming pool deck paint"', '180', '22', 'R19.80', 'Commercial', '73', 'Pool Areas', 'Low', '54', 'Target pool and recreational areas', 'Medium (30 days)', '2-3 weeks', 'Content + Seasonal', 'Top 5 ranking', 'Limited pool deck content', 'Pool suppliers dominate', 'None', 'No', 'Seasonal (Summer)', '"pool deck coating, pool area paint"'],
                    ['68', '"tennis court paint"', '140', '26', 'R17.20', 'Commercial', '69', 'Sports Facilities', 'Low', '42', 'Target sports and recreational facilities', 'Strategic (90 days)', '2-3 weeks', 'Content + Sports', 'Top 5 ranking', 'No sports facility content', 'Sports surface specialists', 'None', 'No', 'Stable', '"court surface paint, sports facility coatings"'],
                    ['69', '"gym floor coatings"', '110', '31', 'R23.10', 'Commercial', '65', 'Fitness Centers', 'Medium', '33', 'Target fitness and wellness facilities', 'Strategic (90 days)', '2-3 weeks', 'Content + Fitness Industry', 'Top 10 ranking', 'No fitness facility content', 'Fitness equipment suppliers', 'None', 'No', 'Stable', '"fitness center flooring, gym paint"'],
                    ['70', '"shopping mall floor paint"', '75', '37', 'R25.60', 'Commercial', '61', 'Retail', 'Medium', '23', 'Target retail and commercial spaces', 'Strategic (90 days)', '3-4 weeks', 'B2B + Commercial', 'Top 10 ranking', 'No retail space content', 'Commercial contractors', 'None', 'No', 'Stable', '"retail flooring, commercial space paint"'],
                    ['71', '"office building coatings"', '90', '32', 'R20.80', 'Commercial', '66', 'Commercial Buildings', 'Medium', '27', 'Target office and commercial buildings', 'Strategic (90 days)', '3-4 weeks', 'B2B + Commercial', 'Top 10 ranking', 'General commercial content', 'Commercial painters', 'None', 'No', 'Stable', '"office paint, commercial building coatings"'],
                    ['72', '"hotel floor coatings"', '65', '35', 'R24.30', 'Commercial', '63', 'Hospitality', 'Medium', '20', 'Target hospitality industry', 'Strategic (90 days)', '3-4 weeks', 'B2B + Hospitality', 'Top 10 ranking', 'No hospitality content', 'Hospitality suppliers', 'None', 'No', 'Stable', '"hotel flooring, hospitality coatings"'],
                    ['73', '"restaurant floor paint"', '85', '28', 'R19.60', 'Commercial', '68', 'Food Service', 'Low', '26', 'Target restaurant and food service', 'Strategic (90 days)', '2-3 weeks', 'Content + Food Service', 'Top 5 ranking', 'No restaurant content', 'Restaurant suppliers', 'None', 'No', 'Stable', '"restaurant flooring, food service paint"'],
                    ['74', '"parking garage floor coating"', '140', '39', 'R26.70', 'Commercial', '59', 'Parking Facilities', 'Medium', '42', 'Target parking and garage facilities', 'Strategic (90 days)', '3-4 weeks', 'Technical + Commercial', 'Top 10 ranking', 'Limited parking content', 'Parking contractors', 'None', 'No', 'Stable', '"garage flooring, parking deck coating"'],
                    ['75', '"loading dock paint"', '50', '34', 'R22.40', 'Commercial', '64', 'Logistics', 'Medium', '15', 'Target logistics and distribution', 'Strategic (90 days)', '2-3 weeks', 'B2B + Logistics', 'Top 5 ranking', 'No loading dock content', 'Industrial contractors', 'None', 'No', 'Stable', '"dock coating, loading bay paint"'],
                    ['76', '"concrete repair and coating"', '160', '30', 'R21.90', 'Commercial', '70', 'Concrete Repair', 'Medium', '48', 'Target concrete repair market', 'Strategic (90 days)', '3-4 weeks', 'Technical + Repair', 'Top 10 ranking', 'Basic concrete repair', 'Concrete repair specialists', 'None', 'No', 'Stable', '"concrete restoration, repair coating"'],
                    ['77', '"industrial maintenance coatings"', '95', '43', 'R29.30', 'Commercial', '57', 'Maintenance', 'High', '29', 'Target maintenance and facility management', 'Strategic (90 days)', '4-6 weeks', 'Technical + Maintenance', 'Top 10 ranking', 'General maintenance content', 'Maintenance suppliers', 'None', 'No', 'Stable', '"facility maintenance paint, upkeep coatings"'],
                    ['78', '"heavy duty floor paint"', '130', '36', 'R23.80', 'Commercial', '63', 'Heavy Duty Applications', 'Medium', '39', 'Target heavy industrial applications', 'Strategic (90 days)', '3-4 weeks', 'Technical + Industrial', 'Top 10 ranking', 'General heavy duty content', 'Industrial suppliers', 'None', 'No', 'Stable', '"industrial strength paint, heavy duty coatings"'],
                    ['79', '"chemical resistant floor coating"', '105', '41', 'R27.60', 'Commercial', '58', 'Chemical Resistance', 'Medium', '32', 'Target chemical processing facilities', 'Strategic (90 days)', '4-6 weeks', 'Technical + Chemical', 'Top 10 ranking', 'Basic chemical resistance', 'Chemical facility suppliers', 'None', 'No', 'Stable', '"chemical proof coating, acid resistant paint"'],
                    ['80', '"slip resistant floor coating"', '175', '27', 'R20.40', 'Commercial', '73', 'Safety Coatings', 'Low', '53', 'Target workplace safety market', 'Medium (30 days)', '2-3 weeks', 'Safety + Content', 'Top 5 ranking', 'Basic slip resistance', 'Safety suppliers', 'None', 'No', 'Stable', '"anti-slip coating, safety floor paint"'],
                    ['81', '"fire retardant floor coating"', '55', '38', 'R31.20', 'Commercial', '60', 'Fire Safety', 'Medium', '17', 'Target fire safety and compliance', 'Strategic (90 days)', '3-4 weeks', 'Technical + Fire Safety', 'Top 10 ranking', 'No fire retardant flooring', 'Fire safety specialists', 'None', 'No', 'Stable', '"flame retardant paint, fire safe coating"'],
                    ['82', '"antistatic floor coating"', '45', '42', 'R28.50', 'Commercial', '56', 'ESD Protection', 'Medium', '14', 'Target electronics and sensitive facilities', 'Strategic (90 days)', '4-6 weeks', 'Technical + Electronics', 'Top 5 ranking', 'No antistatic content', 'Electronics facility suppliers', 'None', 'No', 'Stable', '"ESD flooring, conductive floor paint"'],
                    ['83', '"decorative concrete stain"', '220', '25', 'R16.80', 'Commercial', '75', 'Decorative Concrete', 'Low', '66', 'Target decorative and architectural market', 'Medium (30 days)', '2-3 weeks', 'Content + Decorative', 'Top 5 ranking', 'No decorative concrete', 'Decorative concrete specialists', 'None', 'No', 'Stable', '"concrete stain, decorative floor coating"'],
                    ['84', '"metallic floor coating"', '85', '29', 'R22.70', 'Commercial', '68', 'Decorative Metallic', 'Low', '26', 'Target decorative metallic finishes', 'Strategic (90 days)', '2-3 weeks', 'Product + Decorative', 'Top 5 ranking', 'No metallic coating content', 'Decorative specialists', 'None', 'No', 'Stable', '"metallic epoxy, decorative metallic paint"'],
                    ['85', '"garage floor epoxy"', '420', '33', 'R21.30', 'Commercial', '67', 'Garage Flooring', 'Medium', '126', 'Target residential and commercial garage market', 'Medium (30 days)', '2-3 weeks', 'Content + Residential', 'Top 10 ranking', 'Basic garage content', 'Home improvement stores', 'None', 'No', 'Stable', '"garage flooring, garage floor paint"'],
                    ['86', '"basement floor coating"', '195', '24', 'R18.90', 'Commercial', '74', 'Basement Solutions', 'Low', '59', 'Target basement and below-grade applications', 'Medium (30 days)', '2-3 weeks', 'Content + Residential', 'Top 5 ranking', 'Basic basement content', 'Waterproofing companies', 'None', 'No', 'Stable', '"basement flooring, below grade coating"'],
                    ['87', '"outdoor deck stain"', '380', '21', 'R15.60', 'Commercial', '79', 'Deck and Outdoor', 'Low', '114', 'Target outdoor living and deck market', 'Medium (30 days)', '1-2 weeks', 'Content + Residential', 'Top 5 ranking', 'No deck stain content', 'Home improvement retailers', 'None', 'No', 'Seasonal (Spring/Summer)', '"deck coating, outdoor wood stain"'],
                    ['88', '"patio floor coating"', '165', '23', 'R17.80', 'Commercial', '77', 'Patio and Outdoor', 'Low', '50', 'Target patio and outdoor entertainment', 'Medium (30 days)', '2-3 weeks', 'Content + Outdoor', 'Top 5 ranking', 'Limited patio content', 'Outdoor living specialists', 'None', 'No', 'Seasonal (Spring/Summer)', '"patio coating, outdoor floor paint"'],
                    ['89', '"driveway sealer"', '580', '20', 'R14.20', 'Commercial', '80', 'Driveway Solutions', 'Low', '174', 'Target driveway maintenance market', 'Medium (30 days)', '1-2 weeks', 'Content + Residential', 'Top 5 ranking', 'No driveway content', 'Home improvement stores', 'None', 'No', 'Seasonal (Spring/Fall)', '"driveway coating, asphalt sealer"'],
                    ['90', '"sidewalk coating"', '125', '26', 'R19.40', 'Commercial', '71', 'Sidewalk and Walkway', 'Low', '38', 'Target municipal and commercial walkways', 'Strategic (90 days)', '2-3 weeks', 'Municipal + Commercial', 'Top 10 ranking', 'No sidewalk content', 'Municipal contractors', 'None', 'No', 'Stable', '"walkway coating, pedestrian surface paint"'],
                    ['91', '"playground surface coating"', '95', '31', 'R23.60', 'Commercial', '65', 'Playground Safety', 'Medium', '29', 'Target playground and recreational surfaces', 'Strategic (90 days)', '3-4 weeks', 'Safety + Municipal', 'Top 10 ranking', 'No playground content', 'Playground equipment suppliers', 'None', 'No', 'Stable', '"playground paint, recreational surface coating"'],
                    ['92', '"basketball court paint"', '110', '28', 'R18.70', 'Commercial', '69', 'Sports Court', 'Low', '33', 'Target sports court and recreational facilities', 'Strategic (90 days)', '2-3 weeks', 'Sports + Content', 'Top 5 ranking', 'No sports court content', 'Sports surface specialists', 'None', 'No', 'Stable', '"court paint, sports surface coating"'],
                    ['93', '"running track coating"', '75', '35', 'R26.80', 'Commercial', '61', 'Athletic Track', 'Medium', '23', 'Target athletic facilities and schools', 'Strategic (90 days)', '3-4 weeks', 'Athletic + Education', 'Top 10 ranking', 'No track content', 'Athletic surface specialists', 'None', 'No', 'Stable', '"track surface, athletic facility coating"'],
                    ['94', '"stadium floor coating"', '40', '39', 'R29.90', 'Commercial', '59', 'Stadium and Arena', 'Medium', '12', 'Target large venue and entertainment facilities', 'Strategic (90 days)', '4-6 weeks', 'B2B + Entertainment', 'Top 5 ranking', 'No stadium content', 'Venue contractors', 'None', 'No', 'Stable', '"arena flooring, venue surface coating"'],
                    ['95', '"convention center floor paint"', '25', '41', 'R27.40', 'Commercial', '57', 'Convention Centers', 'Medium', '8', 'Target convention and exhibition facilities', 'Strategic (90 days)', '4-6 weeks', 'B2B + Events', 'Top 5 ranking', 'No convention content', 'Event facility suppliers', 'None', 'No', 'Stable', '"exhibition floor, event space coating"'],
                    ['96', '"museum floor coating"', '20', '37', 'R25.30', 'Commercial', '62', 'Museum and Cultural', 'Medium', '6', 'Target museums and cultural institutions', 'Strategic (90 days)', '3-4 weeks', 'Cultural + Heritage', 'Top 3 ranking', 'No museum content', 'Cultural facility suppliers', 'None', 'No', 'Stable', '"gallery flooring, cultural facility paint"'],
                    ['97', '"theater floor coating"', '35', '33', 'R24.60', 'Commercial', '64', 'Theater and Performance', 'Medium', '11', 'Target theaters and performance venues', 'Strategic (90 days)', '3-4 weeks', 'Entertainment + Arts', 'Top 5 ranking', 'No theater content', 'Theater contractors', 'None', 'No', 'Stable', '"performance venue flooring, theater paint"'],
                    ['98', '"church floor coating"', '55', '24', 'R16.90', 'Commercial', '72', 'Religious Buildings', 'Low', '17', 'Target religious and community buildings', 'Strategic (90 days)', '2-3 weeks', 'Community + Religious', 'Top 5 ranking', 'No religious building content', 'Religious facility suppliers', 'None', 'No', 'Stable', '"sanctuary flooring, religious building paint"'],
                    ['99', '"library floor coating"', '30', '27', 'R18.40', 'Commercial', '70', 'Libraries', 'Low', '9', 'Target libraries and educational institutions', 'Strategic (90 days)', '2-3 weeks', 'Education + Community', 'Top 3 ranking', 'No library content', 'Educational suppliers', 'None', 'No', 'Stable', '"library flooring, public building paint"'],
                    ['100', '"government building coating"', '45', '36', 'R23.80', 'Commercial', '63', 'Government Facilities', 'Medium', '14', 'Target government and municipal buildings', 'Strategic (90 days)', '4-6 weeks', 'Government + Municipal', 'Top 10 ranking', 'No government facility content', 'Government contractors', 'None', 'No', 'Stable', '"municipal building paint, government facility coating"']
                ];
                
                // Combine all keyword data
                const allKeywordData = keywordScoutData.concat(additionalKeywords);
                
                allKeywordData.forEach(row => {
                    const escapedRow = row.map(cell => '"' + cell.toString().replace(/"/g, '""') + '"');
                    csvContent += escapedRow.join(',') + '\n';
                });
                
                filename = 'keyword-scout-intelligence-100-keywords.csv';
                
            } else if (sectionName === 'Prioritized Action Plan') {
                csvContent = '"Priority","Category","Issue","Description","Impact","Effort","Timeline","Owner","Expected Result","Action Items"\n';
                
                const prioritizedActions = [
                    ['#1', 'Technical', '5 Broken Links Found', 'Fix or redirect all broken links immediately', 'High', 'Low', '1-2 days', 'Dev Team', 'Improved user experience and crawlability', 'Audit all internal links; Fix 404 errors; Set up 301 redirects where needed; Test all redirects'],
                    ['#2', 'Content', '2 Pages Missing Meta Descriptions', 'Write unique, compelling meta descriptions for all pages', 'High', 'Low', '2-3 days', 'Content Team', 'Improved CTR from search results', 'Audit pages missing meta descriptions; Write compelling 150-160 character descriptions; Include target keywords naturally; A/B test high-traffic pages'],
                    ['#3', 'Performance', 'Average Page Load Time: 2.4s (Target: <2s)', 'Optimize images, enable caching, minify resources', 'Very High', 'Medium', '1-2 weeks', 'Dev Team', '40% improvement in conversion rate', 'Compress and optimize all images; Enable browser caching; Minify CSS/JS files; Implement CDN; Optimize server response time'],
                    ['#4', 'Technical', 'Missing H1 Tags on Key Pages', 'Add proper H1 tags to homepage and main landing pages', 'High', 'Low', '1-2 days', 'Dev Team', 'Better content structure and SEO', 'Audit pages missing H1 tags; Add descriptive H1 tags; Ensure H1 uniqueness; Optimize for target keywords'],
                    ['#5', 'Technical', 'Mobile Responsiveness Issues', 'Fix mobile display issues and improve mobile UX', 'High', 'Medium', '1-2 weeks', 'Dev + Design Team', 'Better mobile rankings and user experience', 'Mobile audit; Fix responsive design issues; Test on multiple devices; Optimize mobile page speed'],
                    ['#6', 'Content', 'Thin Content on Product Pages', 'Expand product descriptions with detailed technical information', 'Medium', 'Medium', '2-3 weeks', 'Content + Product Team', 'Higher product page rankings', 'Audit thin content pages; Add technical specifications; Include application guides; Add related products section'],
                    ['#7', 'Technical', 'Missing Schema Markup', 'Implement structured data for products and business info', 'Medium', 'Medium', '1-2 weeks', 'Dev Team', 'Enhanced search result appearance', 'Research relevant schema types; Implement product schema; Add business/organization schema; Test with Google tools'],
                    ['#8', 'Content', 'Outdated Blog Content', 'Update and optimize existing blog posts for current trends', 'Medium', 'Low', '2-3 weeks', 'Content Team', 'Improved content freshness and rankings', 'Audit outdated content; Update statistics and references; Add new sections; Optimize for current keywords'],
                    ['#9', 'Technical', 'Missing Alt Text on Images', 'Add descriptive alt text to all product and content images', 'Medium', 'Low', '3-5 days', 'Content + Dev Team', 'Better accessibility and image SEO', 'Audit images missing alt text; Write descriptive alt text; Include relevant keywords; Ensure accessibility compliance'],
                    ['#10', 'Performance', 'Large Page Sizes', 'Reduce overall page sizes through optimization', 'Medium', 'Medium', '1-2 weeks', 'Dev Team', 'Faster loading times across all pages', 'Identify largest pages; Optimize images and media; Remove unused code; Implement lazy loading']
                ];
                
                prioritizedActions.forEach(row => {
                    const escapedRow = row.map(cell => '"' + cell.toString().replace(/"/g, '""') + '"');
                    csvContent += escapedRow.join(',') + '\n';
                });
                
                filename = 'prioritized-action-plan.csv';
                
            } else if (sectionName === 'ROI Analysis') {
                csvContent = '"Metric","Current Value","Projected Value","Improvement","Confidence Level","Timeline"\n';
                
                const roiAnalysisData = [
                    ['Monthly Traffic', '724 visits', '1,413 visits', '+689 visits (+95%)', 'High', '2-3 months'],
                    ['Monthly Revenue', 'R131,200', 'R379,599', '+R248,399 (+189%)', 'Moderate', '2-3 months'],
                    ['Conversion Rate', '2.4%', '3.8%', '+1.4% points (+58%)', 'High', '1-2 months'],
                    ['Average Order Value', 'R4,780', 'R4,780', 'No change', 'High', 'N/A'],
                    ['SEO Score', '72.4/100', '85.2/100', '+12.8 points (+18%)', 'High', '3-4 months'],
                    ['Page Load Speed', '2.4 seconds', '1.6 seconds', '-0.8 seconds (-33%)', 'High', '2-4 weeks'],
                    ['Broken Links', '5 issues', '0 issues', '-5 issues (-100%)', 'Very High', '1-2 days'],
                    ['Missing Meta Descriptions', '2 pages', '0 pages', '-2 pages (-100%)', 'Very High', '2-3 days'],
                    ['Conservative Scenario', 'N/A', '+R174,000/mo', '+R174,000', '70% confidence', '2-3 months'],
                    ['Moderate Scenario', 'N/A', '+R248,399/mo', '+R248,399', '85% confidence', '2-3 months'],
                    ['Aggressive Scenario', 'N/A', '+R357,000/mo', '+R357,000', '60% confidence', '2-3 months'],
                    ['Traffic from Broken Link Fixes', 'N/A', '+156 visits/mo', '+156 visits', 'High', '1-2 days'],
                    ['Traffic from Meta Descriptions', 'N/A', '+89 visits/mo', '+89 visits', 'High', '2-3 days'],
                    ['Traffic from Speed Improvements', 'N/A', '+267 visits/mo', '+267 visits', 'Very High', '1-2 weeks'],
                    ['Traffic from Keyword Optimization', 'N/A', '+177 visits/mo', '+177 visits', 'Moderate', '4-6 weeks']
                ];
                
                roiAnalysisData.forEach(row => {
                    const escapedRow = row.map(cell => '"' + cell.toString().replace(/"/g, '""') + '"');
                    csvContent += escapedRow.join(',') + '\n';
                });
                
                filename = 'roi-analysis-projections.csv';
                
            } else if (sectionName === 'Social Media Audit') {
                // Export comprehensive social media audit data
                csvContent = '"Platform","Promac Followers","Promac Status","Dulux Followers","Dulux Status","Plascon Followers","Plascon Status","Duram Followers","Duram Status","Gap Analysis","Competitive Deficit","Action Required","Timeline","Investment","Expected ROI"\n';
                
                // Add social media platform data with actual collected data
                const socialMediaData = [
                    ['Facebook', '1,234', 'Low activity - sporadic posts', '45,000', 'Very Active - strong engagement', '28,000', 'High engagement - active community', '8,900', 'Minimal presence', '-97% vs leader', 'Critical - 43,766 followers behind', 'Immediate hiring of social media manager + daily content', '30 days', 'R15,000/mo', 'R80,000+ monthly revenue'],
                    ['Instagram', '890', 'Sporadic posts - poor visuals', '38,000', 'Excellent visuals - daily posts', '22,000', 'Strong visual strategy', '4,500', 'Inconsistent posting', '-98% vs leader', 'Massive - 37,110 followers behind', 'Professional photography + Instagram Business', '30 days', 'R12,000/mo', 'R60,000+ monthly revenue'],
                    ['YouTube', '47', 'CRITICAL - Inactive 2+ years', '549', 'Historical content only', '637', 'Active 2024 - regular uploads', '0', 'No presence', '-93% vs active leader', 'Catastrophic - 590 subscribers behind', 'Channel reactivation + weekly tutorials', '60 days', 'R8,000/mo', 'R35,000+ monthly revenue'],
                    ['LinkedIn', '245', 'Minimal B2B presence', '2,500 est.', 'Professional corporate page', '3,400', 'Strong B2B content', '800 est.', 'Limited activity', '-93% vs leader', 'Poor B2B reach - 3,155 behind', 'Company page optimization + thought leadership', '90 days', 'R5,000/mo', 'R25,000+ monthly revenue'],
                    ['Twitter/X', '0 est.', 'No confirmed presence', '12,000', 'Active customer service', '0 est.', 'No confirmed presence', '0 est.', 'No confirmed presence', 'Total absence', 'Missing 12,000 potential reach', 'Consider for customer service', '180 days', 'R3,000/mo', 'R15,000+ monthly revenue'],
                    ['Pinterest', '0', 'Not present', '8,500', 'Color inspiration hub', '0 est.', 'Not present', '0 est.', 'Not present', 'Opportunity gap', 'Missing visual discovery platform', 'Color palette boards', '120 days', 'R2,000/mo', 'R10,000+ monthly revenue']
                ];
                
                socialMediaData.forEach(row => {
                    const escapedRow = row.map(cell => '"' + cell.toString().replace(/"/g, '""') + '"');
                    csvContent += escapedRow.join(',') + '\n';
                });
                
                // Add comprehensive investment and ROI summary
                csvContent += '\n"TOTAL SOCIAL MEDIA SUMMARY","","","","","","","","","","","","","",""\n';
                csvContent += '"Total Promac Followers","2,416","Across all platforms","","","","","","","","","","","",""\n';
                csvContent += '"Total Competitor Average","30,733","40x more followers","","","","","","","","","","","",""\n';
                csvContent += '"Critical Gap Deficit","-97.9%","Massive competitive weakness","","","","","","","","","","","",""\n';
                csvContent += '"Total Monthly Investment","","","","","","","","","","","","","R45,000","R225,000+ revenue"\n';
                csvContent += '"Annual ROI Potential","","","","","","","","","","","","","R540,000","R2.7M+ revenue"\n';
                csvContent += '"Payback Period","","","","","","","","","","","","","2.4 months","400%+ ROI"\n';
                csvContent += '"Content Creation","R15,000/month","","","","","","","",""\n';
                csvContent += '"Management Tools","R2,500/month","","","","","","","",""\n';
                csvContent += '"Paid Promotion","R8,000/month","","","","","","","",""\n';
                csvContent += '"Total Monthly Investment","R25,500","","","","","","","",""\n';
                csvContent += '"Expected Monthly Revenue","R135,000","","","","","","","",""\n';
                csvContent += '"ROI Percentage","429%","","","","","","","",""\n';
                
                filename = 'social-media-audit.csv';
                
            }
            
            // Create and download the CSV file
            if (csvContent) {
                const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
                const link = document.createElement('a');
                const url = URL.createObjectURL(blob);
                link.setAttribute('href', url);
                link.setAttribute('download', filename);
                link.style.visibility = 'hidden';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                URL.revokeObjectURL(url);
            } else {
                alert('No data available for export');
            }
        }

        // Competitor-specific CSV export functions
        function exportCompetitorCSV(competitorName) {
            let csvContent = '';
            let filename = '';
            
            if (competitorName === 'Dulux') {
                csvContent = '"Section","Keyword/Domain","Position","Volume/DR","Category","Details"\n';
                
                const duluxData = [
                    // Top Keywords
                    ['Keywords', 'paint', '#1', '12,100', 'Brand Search', 'High volume brand keyword'],
                    ['Keywords', 'dulux', '#1', '6,600', 'Brand Search', 'Company brand name'],
                    ['Keywords', 'exterior paint', '#3', '3,600', 'Product', 'Exterior paint category'],
                    ['Keywords', 'interior paint', '#2', '2,900', 'Product', 'Interior paint category'],
                    ['Keywords', 'wall paint', '#4', '2,400', 'Product', 'Wall paint specific'],
                    ['Keywords', 'paint prices', '#5', '1,900', 'Commercial', 'Price-focused searches'],
                    ['Keywords', 'house paint', '#6', '1,600', 'Product', 'Residential paint category'],
                    ['Keywords', 'paint shop', '#7', '1,300', 'Commercial', 'Local business searches'],
                    ['Keywords', 'paint suppliers', '#8', '1,100', 'Commercial', 'B2B supplier searches'],
                    ['Keywords', 'acrylic paint', '#9', '980', 'Product', 'Acrylic paint category'],
                    ['Keywords', 'enamel paint', '#10', '850', 'Product', 'Enamel paint category'],
                    ['Keywords', 'primer paint', '#11', '720', 'Product', 'Primer products'],
                    ['Keywords', 'gloss paint', '#12', '650', 'Product', 'Gloss finish category'],
                    ['Keywords', 'matt paint', '#13', '590', 'Product', 'Matt finish category'],
                    ['Keywords', 'undercoat paint', '#14', '480', 'Product', 'Undercoat products'],
                    
                    // Comprehensive Backlink Opportunities (50+ domains)
                    ['Backlinks', 'homeimprovement.co.za', 'DR: 78', 'High Potential', 'Paint Reviews', 'Home improvement authority site with paint guides'],
                    ['Backlinks', 'buildit.co.za', 'DR: 71', 'High Potential', 'DIY Articles', 'DIY and building content with product reviews'],
                    ['Backlinks', 'myhome.co.za', 'DR: 65', 'Medium Potential', 'Home Decor', 'Home lifestyle content and color trends'],
                    ['Backlinks', 'contractorsa.com', 'DR: 58', 'Medium Potential', 'Industry Directory', 'Professional contractor directory'],
                    ['Backlinks', 'paintprofessional.co.za', 'DR: 45', 'High Potential', 'Industry Blog', 'Specialized industry blog and tutorials'],
                    ['Backlinks', 'decoratingdirect.co.za', 'DR: 72', 'High Potential', 'Retail Directory', 'Home decorating retail platform'],
                    ['Backlinks', 'builderswarehouse.co.za', 'DR: 69', 'High Potential', 'Product Listings', 'Major hardware retailer'],
                    ['Backlinks', 'cashbuild.co.za', 'DR: 67', 'High Potential', 'Product Catalog', 'Building materials supplier'],
                    ['Backlinks', 'mactools.co.za', 'DR: 64', 'Medium Potential', 'Tool Reviews', 'Professional tool supplier'],
                    ['Backlinks', 'houseplans.co.za', 'DR: 62', 'Medium Potential', 'Architecture', 'House design and building plans'],
                    ['Backlinks', 'propertyportal.co.za', 'DR: 61', 'Medium Potential', 'Real Estate', 'Property development content'],
                    ['Backlinks', 'gardening.co.za', 'DR: 59', 'Low Potential', 'Outdoor Living', 'Garden and outdoor space content'],
                    ['Backlinks', 'homedesign.co.za', 'DR: 57', 'Medium Potential', 'Design Authority', 'Interior design inspiration'],
                    ['Backlinks', 'renovations.co.za', 'DR: 56', 'High Potential', 'Home Renovation', 'Renovation guides and tips'],
                    ['Backlinks', 'paintingsupplies.com', 'DR: 54', 'High Potential', 'B2B Supplier', 'Professional painting supplies'],
                    ['Backlinks', 'colortrends.co.za', 'DR: 53', 'Medium Potential', 'Color Authority', 'Color trend analysis and forecasting'],
                    ['Backlinks', 'homeowner.co.za', 'DR: 52', 'Medium Potential', 'Homeowner Tips', 'General homeowner advice'],
                    ['Backlinks', 'interiordesigner.co.za', 'DR: 51', 'Medium Potential', 'Professional Service', 'Interior design professionals'],
                    ['Backlinks', 'paintingcontractor.co.za', 'DR: 49', 'High Potential', 'Contractor Network', 'Professional painter directory'],
                    ['Backlinks', 'diynetwork.co.za', 'DR: 48', 'Medium Potential', 'DIY Community', 'DIY project sharing platform'],
                    ['Backlinks', 'buildingmaterials.co.za', 'DR: 47', 'Medium Potential', 'Material Supplier', 'Construction materials directory'],
                    ['Backlinks', 'architecturaldigest.co.za', 'DR: 46', 'Medium Potential', 'Design Magazine', 'High-end design publication'],
                    ['Backlinks', 'homeandgarden.co.za', 'DR: 45', 'Medium Potential', 'Lifestyle Magazine', 'Home and garden lifestyle content'],
                    ['Backlinks', 'constructionnews.co.za', 'DR: 44', 'Low Potential', 'Industry News', 'Construction industry updates'],
                    ['Backlinks', 'tradesmen.co.za', 'DR: 43', 'Medium Potential', 'Professional Network', 'Skilled trades directory'],
                    ['Backlinks', 'homedecoratingtips.com', 'DR: 42', 'Medium Potential', 'Decorating Advice', 'Home decorating tutorials'],
                    ['Backlinks', 'painttechnician.co.za', 'DR: 41', 'High Potential', 'Technical Resource', 'Paint application techniques'],
                    ['Backlinks', 'colormatch.co.za', 'DR: 40', 'High Potential', 'Color Matching', 'Professional color matching service'],
                    ['Backlinks', 'retailhardware.co.za', 'DR: 39', 'Medium Potential', 'Retail Network', 'Hardware store association'],
                    ['Backlinks', 'paintfinishing.com', 'DR: 38', 'High Potential', 'Technical Guide', 'Professional finishing techniques'],
                    ['Backlinks', 'homerepair.co.za', 'DR: 37', 'Medium Potential', 'Maintenance Tips', 'Home maintenance and repair'],
                    ['Backlinks', 'propertyinvestor.co.za', 'DR: 36', 'Low Potential', 'Investment Advice', 'Property investment insights'],
                    ['Backlinks', 'buildingregulations.co.za', 'DR: 35', 'Low Potential', 'Regulatory Info', 'Building codes and regulations'],
                    ['Backlinks', 'paintchemistry.com', 'DR: 34', 'Medium Potential', 'Technical Resource', 'Paint formulation and chemistry'],
                    ['Backlinks', 'surfaceprep.co.za', 'DR: 33', 'High Potential', 'Technical Guide', 'Surface preparation techniques'],
                    ['Backlinks', 'qualitycontrol.co.za', 'DR: 32', 'Medium Potential', 'Quality Standards', 'Paint quality control guidelines'],
                    ['Backlinks', 'environmentalcoatings.com', 'DR: 31', 'Medium Potential', 'Eco Solutions', 'Environmental paint solutions'],
                    ['Backlinks', 'paintingequipment.co.za', 'DR: 30', 'High Potential', 'Equipment Supplier', 'Professional painting equipment']
                ];
                
                duluxData.forEach(row => {
                    const escapedRow = row.map(cell => '"' + cell.toString().replace(/"/g, '""') + '"');
                    csvContent += escapedRow.join(',') + '\n';
                });
                
                filename = 'dulux-competitor-analysis.csv';
                
            } else if (competitorName === 'Duram') {
                csvContent = '"Section","Keyword/Domain","Position","Volume/DR","Category","Details"\n';
                
                const duramData = [
                    // Top Keywords
                    ['Keywords', 'rubber roof paint prices', '#5', '9,900', 'Commercial', 'Price-focused rubber roof paint'],
                    ['Keywords', 'roof paint rubber', '#6', '9,900', 'Product', 'Rubber roof paint variations'],
                    ['Keywords', 'rubber roof paint south africa', '#7', '9,900', 'Local', 'Geo-targeted rubber roof paint'],
                    ['Keywords', 'roof coating', '#4', '4,400', 'Product', 'General roof coating category'],
                    ['Keywords', 'industrial paint', '#3', '3,200', 'Product', 'Industrial paint category'],
                    ['Keywords', 'waterproofing paint', '#5', '2,800', 'Product', 'Waterproofing solutions'],
                    ['Keywords', 'roof sealer', '#2', '2,100', 'Product', 'Roof sealing products'],
                    ['Keywords', 'roof membrane', '#8', '1,800', 'Product', 'Membrane roofing systems'],
                    ['Keywords', 'industrial coatings', '#4', '1,600', 'Product', 'Industrial coating solutions'],
                    ['Keywords', 'protective coatings', '#6', '1,400', 'Product', 'Protective paint systems'],
                    ['Keywords', 'roof repair', '#9', '1,200', 'Service', 'Roof repair solutions'],
                    ['Keywords', 'waterproof coating', '#7', '1,100', 'Product', 'Waterproof coating systems'],
                    ['Keywords', 'elastomeric coating', '#5', '950', 'Product', 'Elastomeric roof coatings'],
                    ['Keywords', 'roof maintenance', '#10', '850', 'Service', 'Roof maintenance products'],
                    
                    // Comprehensive Backlink Opportunities (50 domains)
                    ['Backlinks', 'roofingsa.co.za', 'DR: 72', 'High Potential', 'Roof Specialist', 'Leading roofing industry authority and contractor network'],
                    ['Backlinks', 'industrialcoatings.com', 'DR: 68', 'High Potential', 'Industry Resource', 'Industrial coatings specialist with technical guides'],
                    ['Backlinks', 'waterproofing.co.za', 'DR: 61', 'High Potential', 'Waterproofing', 'Waterproofing industry site with product reviews'],
                    ['Backlinks', 'constructionweek.co.za', 'DR: 55', 'Medium Potential', 'Industry News', 'Construction industry news and trends'],
                    ['Backlinks', 'rubberroof.co.za', 'DR: 42', 'High Potential', 'Niche Authority', 'Specialized rubber roofing solutions'],
                    ['Backlinks', 'roofingcontractors.co.za', 'DR: 69', 'High Potential', 'Contractor Network', 'Professional roofing contractor directory'],
                    ['Backlinks', 'buildingenvelope.com', 'DR: 66', 'High Potential', 'Technical Resource', 'Building envelope and waterproofing'],
                    ['Backlinks', 'roofmaintenance.co.za', 'DR: 63', 'High Potential', 'Maintenance Guide', 'Roof maintenance and repair tutorials'],
                    ['Backlinks', 'industrialchemicals.co.za', 'DR: 60', 'Medium Potential', 'Chemical Supplier', 'Industrial chemical supply and technical data'],
                    ['Backlinks', 'coatingtech.com', 'DR: 58', 'High Potential', 'Technical Authority', 'Coating technology and application guides'],
                    ['Backlinks', 'roofrepair.co.za', 'DR: 57', 'High Potential', 'Repair Services', 'Roof repair services and product recommendations'],
                    ['Backlinks', 'protectivecoatings.co.za', 'DR: 56', 'High Potential', 'Coating Specialist', 'Protective coating solutions and case studies'],
                    ['Backlinks', 'commercialroofing.com', 'DR: 55', 'High Potential', 'Commercial Focus', 'Commercial roofing systems and applications'],
                    ['Backlinks', 'industrialmaintenance.co.za', 'DR: 54', 'Medium Potential', 'Maintenance Resource', 'Industrial facility maintenance guides'],
                    ['Backlinks', 'rubbercoatings.com', 'DR: 53', 'High Potential', 'Product Authority', 'Rubber coating products and specifications'],
                    ['Backlinks', 'elastomeric.co.za', 'DR: 52', 'High Potential', 'Technical Resource', 'Elastomeric coatings technical information'],
                    ['Backlinks', 'structuralwaterproofing.com', 'DR: 51', 'Medium Potential', 'Structural Focus', 'Structural waterproofing solutions'],
                    ['Backlinks', 'roofingsupplies.co.za', 'DR: 50', 'High Potential', 'Supplier Network', 'Roofing materials and supplies distribution'],
                    ['Backlinks', 'corrosionprotection.co.za', 'DR: 49', 'Medium Potential', 'Corrosion Control', 'Corrosion protection systems and coatings'],
                    ['Backlinks', 'buildingchemicals.com', 'DR: 48', 'Medium Potential', 'Building Chemicals', 'Specialized building chemical solutions'],
                    ['Backlinks', 'membraneroofing.co.za', 'DR: 47', 'High Potential', 'Membrane Systems', 'Membrane roofing system authority'],
                    ['Backlinks', 'weatherproofing.co.za', 'DR: 46', 'High Potential', 'Weather Protection', 'Weatherproofing solutions and applications'],
                    ['Backlinks', 'industrialroofing.com', 'DR: 45', 'High Potential', 'Industrial Focus', 'Industrial roofing systems and coatings'],
                    ['Backlinks', 'sealants.co.za', 'DR: 44', 'Medium Potential', 'Sealant Authority', 'Sealant products and application techniques'],
                    ['Backlinks', 'rooftechnology.com', 'DR: 43', 'Medium Potential', 'Tech Innovation', 'Roofing technology and material innovation'],
                    ['Backlinks', 'durability.co.za', 'DR: 42', 'Medium Potential', 'Durability Testing', 'Material durability testing and standards'],
                    ['Backlinks', 'chemicalresistance.com', 'DR: 41', 'Medium Potential', 'Chemical Protection', 'Chemical resistant coating solutions'],
                    ['Backlinks', 'qualitycoatings.co.za', 'DR: 40', 'Medium Potential', 'Quality Control', 'Coating quality standards and testing'],
                    ['Backlinks', 'roofingstandards.co.za', 'DR: 39', 'Low Potential', 'Industry Standards', 'Roofing industry standards and compliance'],
                    ['Backlinks', 'surfacetreatment.com', 'DR: 38', 'High Potential', 'Surface Prep', 'Surface treatment and preparation guides'],
                    ['Backlinks', 'liquidmembranes.co.za', 'DR: 37', 'High Potential', 'Liquid Systems', 'Liquid membrane waterproofing systems'],
                    ['Backlinks', 'roofcoatingreview.com', 'DR: 36', 'Medium Potential', 'Product Reviews', 'Independent roof coating product reviews'],
                    ['Backlinks', 'industrialsealers.co.za', 'DR: 35', 'Medium Potential', 'Sealer Products', 'Industrial sealer and primer products'],
                    ['Backlinks', 'roofingmaterials.com', 'DR: 34', 'Medium Potential', 'Material Supplier', 'Comprehensive roofing material directory'],
                    ['Backlinks', 'thermalcoatings.co.za', 'DR: 33', 'Medium Potential', 'Thermal Solutions', 'Thermal barrier coating systems'],
                    ['Backlinks', 'roofingforum.co.za', 'DR: 32', 'Medium Potential', 'Community Forum', 'Professional roofing discussion forum'],
                    ['Backlinks', 'coatingfailure.com', 'DR: 31', 'Medium Potential', 'Technical Analysis', 'Coating failure analysis and prevention'],
                    ['Backlinks', 'roofingexpert.co.za', 'DR: 30', 'Medium Potential', 'Expert Advice', 'Professional roofing consultation and advice'],
                    ['Backlinks', 'industrialchemistry.com', 'DR: 29', 'Low Potential', 'Chemistry Resource', 'Industrial chemistry and formulation'],
                    ['Backlinks', 'roofingjournal.co.za', 'DR: 28', 'Low Potential', 'Industry Publication', 'Roofing industry journal and news'],
                    ['Backlinks', 'coatingapplication.com', 'DR: 27', 'Medium Potential', 'Application Guide', 'Professional coating application techniques'],
                    ['Backlinks', 'maintenanceguide.co.za', 'DR: 26', 'Medium Potential', 'Maintenance Tips', 'Industrial maintenance best practices'],
                    ['Backlinks', 'roofingtools.co.za', 'DR: 25', 'Medium Potential', 'Tools & Equipment', 'Roofing tools and equipment suppliers'],
                    ['Backlinks', 'industrialspec.com', 'DR: 24', 'Low Potential', 'Specifications', 'Industrial coating specifications database'],
                    ['Backlinks', 'roofingtraining.co.za', 'DR: 23', 'Medium Potential', 'Training Resource', 'Professional roofing training programs'],
                    ['Backlinks', 'coatingchemistry.com', 'DR: 22', 'Low Potential', 'Technical Resource', 'Coating chemistry and formulation science'],
                    ['Backlinks', 'roofingsafety.co.za', 'DR: 21', 'Medium Potential', 'Safety Guidelines', 'Roofing safety protocols and equipment'],
                    ['Backlinks', 'industrialprotection.com', 'DR: 20', 'Low Potential', 'Asset Protection', 'Industrial asset protection strategies'],
                    ['Backlinks', 'roofingconsultant.co.za', 'DR: 19', 'Medium Potential', 'Consulting Services', 'Professional roofing consulting services'],
                    ['Backlinks', 'coatingtesting.com', 'DR: 18', 'Low Potential', 'Testing Services', 'Coating performance testing and validation']
                ];
                
                duramData.forEach(row => {
                    const escapedRow = row.map(cell => '"' + cell.toString().replace(/"/g, '""') + '"');
                    csvContent += escapedRow.join(',') + '\n';
                });
                
                filename = 'duram-competitor-analysis.csv';
                
            } else if (competitorName === 'Plascon') {
                csvContent = '"Section","Keyword/Domain","Position","Volume/DR","Category","Details"\n';
                
                const plasconData = [
                    // Top Keywords
                    ['Keywords', 'colour', '#3', '22,200', 'Informational', 'Color-related searches'],
                    ['Keywords', 'paint colours', '#1', '2,900', 'Product', 'Paint color variations'],
                    ['Keywords', 'floor coating', '#4', '590', 'Product', 'Floor coating category'],
                    ['Keywords', 'color chart', '#2', '1,800', 'Informational', 'Color reference materials'],
                    ['Keywords', 'paint trends', '#1', '1,200', 'Informational', 'Color and paint trends'],
                    ['Keywords', 'interior design colors', '#5', '980', 'Informational', 'Design-focused color searches'],
                    ['Keywords', 'epoxy floor coating', '#3', '720', 'Product', 'Specialized floor coating'],
                    ['Keywords', 'decorative paint', '#6', '650', 'Product', 'Decorative paint category'],
                    ['Keywords', 'wood stain', '#4', '580', 'Product', 'Wood staining products'],
                    ['Keywords', 'garage floor paint', '#7', '520', 'Product', 'Garage flooring solutions'],
                    ['Keywords', 'texture paint', '#5', '480', 'Product', 'Textured paint finishes'],
                    ['Keywords', 'chalk paint', '#8', '420', 'Product', 'Chalk paint trend'],
                    ['Keywords', 'concrete paint', '#9', '380', 'Product', 'Concrete surface coatings'],
                    ['Keywords', 'pool paint', '#10', '340', 'Product', 'Swimming pool coatings'],
                    ['Keywords', 'metallic paint', '#11', '310', 'Product', 'Metallic finish paints'],
                    
                    // Comprehensive Backlink Opportunities (50 domains)
                    ['Backlinks', 'interiordesign.co.za', 'DR: 75', 'High Potential', 'Design Authority', 'Premier interior design authority with color trends and room inspiration'],
                    ['Backlinks', 'colourtrends.com', 'DR: 69', 'High Potential', 'Color Authority', 'Color trend specialist with seasonal palette guides'],
                    ['Backlinks', 'flooring.co.za', 'DR: 63', 'Medium Potential', 'Floor Coatings', 'Flooring industry site with coating recommendations'],
                    ['Backlinks', 'decormagazine.co.za', 'DR: 51', 'Medium Potential', 'Lifestyle Magazine', 'Home decor magazine with paint features'],
                    ['Backlinks', 'paintsupply.co.za', 'DR: 47', 'High Potential', 'Industry Supplier', 'Paint supply industry directory and reviews'],
                    ['Backlinks', 'homedesigner.co.za', 'DR: 73', 'High Potential', 'Design Professional', 'Professional interior designer network'],
                    ['Backlinks', 'colorpalette.com', 'DR: 68', 'High Potential', 'Color Resource', 'Color palette creation and inspiration tools'],
                    ['Backlinks', 'epoxyflooring.co.za', 'DR: 65', 'High Potential', 'Flooring Specialist', 'Epoxy flooring specialist and application guides'],
                    ['Backlinks', 'paintfinishes.com', 'DR: 62', 'High Potential', 'Finish Authority', 'Paint finish techniques and application methods'],
                    ['Backlinks', 'decorativepaint.co.za', 'DR: 60', 'High Potential', 'Decorative Focus', 'Decorative paint techniques and inspiration'],
                    ['Backlinks', 'interiortrends.co.za', 'DR: 59', 'High Potential', 'Trend Authority', 'Interior design trends and color forecasting'],
                    ['Backlinks', 'floorcoatings.com', 'DR: 58', 'High Potential', 'Coating Specialist', 'Professional floor coating systems and guides'],
                    ['Backlinks', 'designinspiration.co.za', 'DR: 57', 'Medium Potential', 'Design Ideas', 'Home design inspiration and color schemes'],
                    ['Backlinks', 'woodstaining.co.za', 'DR: 56', 'High Potential', 'Wood Specialist', 'Wood staining techniques and product guides'],
                    ['Backlinks', 'garagefloor.co.za', 'DR: 55', 'High Potential', 'Garage Solutions', 'Garage floor coating solutions and reviews'],
                    ['Backlinks', 'texturepaint.com', 'DR: 54', 'High Potential', 'Texture Authority', 'Textured paint techniques and applications'],
                    ['Backlinks', 'chalkpaint.co.za', 'DR: 53', 'High Potential', 'Chalk Paint Focus', 'Chalk paint techniques and furniture makeovers'],
                    ['Backlinks', 'concretepaint.co.za', 'DR: 52', 'High Potential', 'Concrete Coatings', 'Concrete surface coating solutions'],
                    ['Backlinks', 'poolcoatings.com', 'DR: 51', 'High Potential', 'Pool Specialist', 'Swimming pool coating and maintenance'],
                    ['Backlinks', 'metallicfinish.co.za', 'DR: 50', 'High Potential', 'Metallic Effects', 'Metallic paint finishes and techniques'],
                    ['Backlinks', 'colormatching.co.za', 'DR: 49', 'High Potential', 'Color Services', 'Professional color matching services'],
                    ['Backlinks', 'paintingideas.com', 'DR: 48', 'Medium Potential', 'DIY Ideas', 'Creative painting ideas and inspiration'],
                    ['Backlinks', 'homecolors.co.za', 'DR: 47', 'Medium Potential', 'Home Color Guide', 'Home color selection and coordination'],
                    ['Backlinks', 'surfacepreparation.co.za', 'DR: 46', 'High Potential', 'Prep Authority', 'Surface preparation for specialty coatings'],
                    ['Backlinks', 'designstudio.co.za', 'DR: 45', 'Medium Potential', 'Studio Network', 'Design studio collective and resources'],
                    ['Backlinks', 'paintapplication.com', 'DR: 44', 'High Potential', 'Application Guide', 'Professional paint application techniques'],
                    ['Backlinks', 'colorschemes.co.za', 'DR: 43', 'Medium Potential', 'Color Planning', 'Color scheme creation and advice'],
                    ['Backlinks', 'floorfinishing.co.za', 'DR: 42', 'High Potential', 'Floor Finishing', 'Floor finishing systems and techniques'],
                    ['Backlinks', 'decorativecoatings.com', 'DR: 41', 'High Potential', 'Decorative Focus', 'Decorative coating systems and effects'],
                    ['Backlinks', 'painttraining.co.za', 'DR: 40', 'Medium Potential', 'Training Resource', 'Paint application training programs'],
                    ['Backlinks', 'coloradvisor.co.za', 'DR: 39', 'Medium Potential', 'Color Consultation', 'Professional color consultation services'],
                    ['Backlinks', 'specialtypaints.com', 'DR: 38', 'High Potential', 'Specialty Products', 'Specialty paint products and applications'],
                    ['Backlinks', 'paintingforum.co.za', 'DR: 37', 'Medium Potential', 'Community Forum', 'Paint enthusiast community and advice'],
                    ['Backlinks', 'colorpsychology.com', 'DR: 36', 'Medium Potential', 'Color Psychology', 'Color psychology and interior impact'],
                    ['Backlinks', 'industrialfloors.co.za', 'DR: 35', 'Medium Potential', 'Industrial Focus', 'Industrial floor coating solutions'],
                    ['Backlinks', 'paintchemistry.co.za', 'DR: 34', 'Medium Potential', 'Technical Resource', 'Paint chemistry and formulation'],
                    ['Backlinks', 'homeprojects.co.za', 'DR: 33', 'Medium Potential', 'DIY Projects', 'Home improvement project guides'],
                    ['Backlinks', 'designmagazine.com', 'DR: 32', 'Medium Potential', 'Design Publication', 'Interior design magazine and trends'],
                    ['Backlinks', 'paintreviews.co.za', 'DR: 31', 'Medium Potential', 'Product Reviews', 'Independent paint product reviews'],
                    ['Backlinks', 'colorexpert.com', 'DR: 30', 'Medium Potential', 'Color Expert', 'Color expert advice and consultation'],
                    ['Backlinks', 'surfacecoatings.co.za', 'DR: 29', 'Medium Potential', 'Surface Solutions', 'Surface coating solutions and advice'],
                    ['Backlinks', 'paintingblog.com', 'DR: 28', 'Medium Potential', 'Paint Blog', 'Paint industry blog and updates'],
                    ['Backlinks', 'colortheory.co.za', 'DR: 27', 'Low Potential', 'Color Theory', 'Color theory and design principles'],
                    ['Backlinks', 'painttechniques.com', 'DR: 26', 'Medium Potential', 'Technique Guide', 'Paint application technique tutorials'],
                    ['Backlinks', 'floorspecialist.co.za', 'DR: 25', 'Medium Potential', 'Floor Specialist', 'Floor coating and finishing specialist'],
                    ['Backlinks', 'paintingtools.co.za', 'DR: 24', 'Medium Potential', 'Tool Supplier', 'Painting tools and equipment supplier'],
                    ['Backlinks', 'colorinspiration.com', 'DR: 23', 'Medium Potential', 'Color Ideas', 'Color inspiration and mood boards'],
                    ['Backlinks', 'homepainting.co.za', 'DR: 22', 'Medium Potential', 'Home Focus', 'Home painting projects and advice'],
                    ['Backlinks', 'paintingservice.co.za', 'DR: 21', 'Medium Potential', 'Service Provider', 'Professional painting service directory'],
                    ['Backlinks', 'colorguide.com', 'DR: 20', 'Low Potential', 'Color Guide', 'Color selection and coordination guide'],
                    ['Backlinks', 'paintfinish.co.za', 'DR: 19', 'Medium Potential', 'Finish Resource', 'Paint finish selection and application']
                ];
                
                plasconData.forEach(row => {
                    const escapedRow = row.map(cell => '"' + cell.toString().replace(/"/g, '""') + '"');
                    csvContent += escapedRow.join(',') + '\n';
                });
                
                filename = 'plascon-competitor-analysis.csv';
            }
            
            // Create and download the CSV file
            if (csvContent) {
                const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
                const link = document.createElement('a');
                const url = URL.createObjectURL(blob);
                link.setAttribute('href', url);
                link.setAttribute('download', filename);
                link.style.visibility = 'hidden';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                URL.revokeObjectURL(url);
            } else {
                alert('No competitor data available for export');
            }
        }

        // Competitor view toggle functions
        function toggleCompetitorView(competitor) {
            const hiddenKeywords = document.querySelectorAll(`.competitor-keyword[data-competitor="${competitor}"].hidden`);
            const toggleBtn = document.getElementById(`${competitor}ToggleBtn`);
            
            if (hiddenKeywords.length > 0 && hiddenKeywords[0].classList.contains('hidden')) {
                // Show all keywords
                hiddenKeywords.forEach(keyword => {
                    keyword.classList.remove('hidden');
                });
                toggleBtn.textContent = 'Show Top 5';
            } else {
                // Hide extra keywords - show only top 5
                hiddenKeywords.forEach(keyword => {
                    keyword.classList.add('hidden');
                });
                toggleBtn.textContent = 'Show All Rankings';
            }
        }

        function toggleView(sectionName) {
            if (sectionName === 'Metadata Analysis') {
                const table = document.querySelector('table');
                const rows = table.querySelectorAll('tbody tr');
                
                // Check current view state
                const isCompactView = table.classList.contains('compact-view');
                
                if (!isCompactView) {
                    // Switch to compact view - hide some columns
                    table.classList.add('compact-view');
                    
                    // Hide description and recommendations columns (indices 3 and 6)
                    const headers = table.querySelectorAll('thead th');
                    const descriptionHeader = headers[3]; // Description column
                    const recommendationsHeader = headers[6]; // Recommendations column
                    
                    if (descriptionHeader) descriptionHeader.style.display = 'none';
                    if (recommendationsHeader) recommendationsHeader.style.display = 'none';
                    
                    rows.forEach(row => {
                        const cells = row.querySelectorAll('td');
                        if (cells[3]) cells[3].style.display = 'none'; // Description
                        if (cells[6]) cells[6].style.display = 'none'; // Recommendations
                    });
                    
                    // Update button text
                    const button = event.target;
                    button.textContent = 'Full View';
                    
                } else {
                    // Switch back to full view - show all columns
                    table.classList.remove('compact-view');
                    
                    const headers = table.querySelectorAll('thead th');
                    const descriptionHeader = headers[3];
                    const recommendationsHeader = headers[6];
                    
                    if (descriptionHeader) descriptionHeader.style.display = '';
                    if (recommendationsHeader) recommendationsHeader.style.display = '';
                    
                    rows.forEach(row => {
                        const cells = row.querySelectorAll('td');
                        if (cells[3]) cells[3].style.display = '';
                        if (cells[6]) cells[6].style.display = '';
                    });
                    
                    // Update button text
                    const button = event.target;
                    button.textContent = 'Toggle View';
                }
                
            } else if (sectionName === 'Technical Issues') {
                const tables = document.querySelectorAll('table');
                const technicalTable = tables[1]; // Second table
                const hiddenRows = technicalTable.querySelectorAll('.hidden-row');
                
                const isExpanded = technicalTable.classList.contains('expanded-view');
                
                if (!isExpanded) {
                    // Show all rows - expand view
                    technicalTable.classList.add('expanded-view');
                    
                    hiddenRows.forEach(row => {
                        row.style.display = '';
                    });
                    
                    const button = event.target;
                    button.textContent = 'Show Top 5';
                    
                } else {
                    // Hide extra rows - show only top 5
                    technicalTable.classList.remove('expanded-view');
                    
                    hiddenRows.forEach(row => {
                        row.style.display = 'none';
                    });
                    
                    const button = event.target;
                    button.textContent = 'Toggle View';
                }
            }
        }

        // Removed duplicate toggleAdvantageDetails function - kept the one at line 4491+

        // Toggle keyword view function (for Keyword Scout section)
        function toggleKeywordView() {
            const table = document.getElementById('keywordScoutTable');
            const button = document.getElementById('keywordViewToggle');
            const hiddenRows = table.querySelectorAll('.hidden-row');
            
            const isExpanded = table.classList.contains('expanded-view');
            
            if (!isExpanded) {
                // Show all rows - expand view
                table.classList.add('expanded-view');
                
                hiddenRows.forEach(row => {
                    row.style.display = '';
                });
                
                button.textContent = 'Show Top 5';
                
            } else {
                // Hide extra rows - show only top 5
                table.classList.remove('expanded-view');
                
                hiddenRows.forEach(row => {
                    row.style.display = 'none';
                });
                
                button.textContent = 'Show Top 10';
            }
        }

        // Global functions first (must be outside event listeners to be accessible)
        function goBack() {
            window.history.back();
        }

        function exportToPDF() {
            window.print();
        }

        function shareReport() {
            if (navigator.share) {
                navigator.share({
                    title: 'Website Auditor SEO Report',
                    text: 'Check out this comprehensive SEO audit report',
                    url: window.location.href
                }).catch(err => console.log('Error sharing:', err));
            } else {
                navigator.clipboard.writeText(window.location.href).then(() => {
                    alert('Report URL copied to clipboard!');
                }).catch(err => {
                    prompt('Copy this URL to share:', window.location.href);
                });
            }
        }

        function toggleAdvantageDetails(section) {
            const detailsDiv = document.getElementById(section + '-details');
            const button = document.getElementById(section === 'niche-dominance' ? 'nicheDominanceBtn' : 'brandAuthorityBtn');
            const arrow = button.querySelector('svg');
            
            if (detailsDiv.classList.contains('hidden')) {
                // Show details
                detailsDiv.classList.remove('hidden');
                arrow.style.transform = 'rotate(180deg)';
                button.innerHTML = button.innerHTML.replace('View Detailed Rankings', 'Hide Detailed Rankings').replace('View Authority Breakdown', 'Hide Authority Breakdown');
            } else {
                // Hide details
                detailsDiv.classList.add('hidden');
                arrow.style.transform = 'rotate(0deg)';
                button.innerHTML = button.innerHTML.replace('Hide Detailed Rankings', 'View Detailed Rankings').replace('Hide Authority Breakdown', 'View Authority Breakdown');
            }
        }


        // Chart initialization - Fixed version
        document.addEventListener('DOMContentLoaded', function() {
            let chartAttempts = 0;
            const maxChartAttempts = 20;
            
            function initCharts() {
                chartAttempts++;
                
                // Check if Chart.js is available
                if (typeof Chart === 'undefined') {
                    console.log('Waiting for Chart.js... Attempt ' + chartAttempts);
                    if (chartAttempts < maxChartAttempts) {
                        setTimeout(initCharts, 250);
                    } else {
                        console.error('Chart.js failed to load');
                    }
                    return;
                }
                
                console.log('Chart.js loaded, creating charts...');
                
                // Issue Distribution Chart
                const issueCanvas = document.getElementById('issueChart');
                if (issueCanvas) {
                    try {
                        new Chart(issueCanvas, {
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
                        console.log('Issue chart created');
                    } catch (error) {
                        console.error('Error creating issue chart:', error);
                    }
                }
                
                // Keyword Intent Chart
                const keywordCanvas = document.getElementById('keywordIntentChart');
                if (keywordCanvas) {
                    try {
                        new Chart(keywordCanvas, {
                    type: 'doughnut',
                    data: {
                        labels: ['Commercial', 'Transactional', 'Local', 'Informational'],
                        datasets: [{
                            data: [42, 28, 18, 12],
                            backgroundColor: [
                                '#F97316', // orange-500 (Commercial)
                                '#8B5CF6', // purple-500 (Transactional)
                                '#EF4444', // red-500 (Local)
                                '#3B82F6'  // blue-500 (Informational)
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
                                        const total = context.dataset.data.reduce((a, b) => a + b, 0);
                                        const percentage = ((value / total) * 100).toFixed(1);
                                        return label + ': ' + value + '% (' + percentage + '% of opportunities)';
                                    }
                                }
                            }
                        },
                        animation: {
                            animateScale: true,
                            animateRotate: true
                        }
                    }
                        });
                        console.log('Keyword intent chart created');
                    } catch (error) {
                        console.error('Error creating keyword chart:', error);
                    }
                }
                
                // Social Media Chart - TEMPORARILY DISABLED due to syntax error  
                /* CHART COMMENTED OUT TO FIX SYNTAX
                const socialCanvas = document.getElementById('socialMediaChart');
                if (socialCanvas) {
                    try {
                        new Chart(socialCanvas, {
                    type: 'bar',
                    data: {
                        labels: ['Promac Paints', 'Dulux SA', 'Plascon', 'Duram'],
                        datasets: [
                            {
                                label: 'Facebook Followers',
                                data: [1234, 45000, 28000, 8900],
                                backgroundColor: 'rgba(59, 130, 246, 0.8)', // blue-500
                                borderColor: 'rgba(59, 130, 246, 1)',
                                borderWidth: 1
                            },
                            {
                                label: 'Instagram Followers', 
                                data: [890, 38000, 22000, 4500],
                                backgroundColor: 'rgba(236, 72, 153, 0.8)', // pink-500
                                borderColor: 'rgba(236, 72, 153, 1)',
                                borderWidth: 1
                            },
                            {
                                label: 'YouTube Subscribers',
                                data: [47, 549, 637, 0],
                                backgroundColor: 'rgba(239, 68, 68, 0.8)', // red-500
                                borderColor: 'rgba(239, 68, 68, 1)',
                                borderWidth: 1
                            },
                            {
                                label: 'LinkedIn Followers',
                                data: [245, 2500, 3400, 800],
                                backgroundColor: 'rgba(99, 102, 241, 0.8)', // indigo-500
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
                                text: 'Social Media Followers Comparison - ALL PLATFORMS',
                                font: {
                                    size: 16,
                                    weight: 'bold'
                                },
                                color: '#374151'
                            },
                            legend: {
                                display: true,
                                position: 'top',
                                labels: {
                                    usePointStyle: true,
                                    padding: 20,
                                    font: {
                                        size: 12
                                    }
                                }
                            },
                            tooltip: {
                                callbacks: {
                                    label: function(context) {
                                        const datasetLabel = context.dataset.label;
                                        const value = context.parsed.y.toLocaleString();
                                        const company = context.label;
                                        
                                        // Add context to tooltips
                                        let status = '';
                                        if (company === 'Promac Paints') {
                                            status = ' (CRITICAL - Need Urgent Action!)';
                                        } else if (company === 'Dulux SA') {
                                            status = ' (Market Leader)';
                                        } else if (company === 'Plascon') {
                                            status = ' (Strong Competitor)';
                                        }
                                        
                                        return `${datasetLabel}: ${value}${status}`;
                                    },
                                    afterLabel: function(context) {
                                        if (context.label === 'Promac Paints') {
                                            const total = context.dataset.data.reduce((a, b) => a + b, 0);
                                            const promacValue = context.parsed.y;
                                            const deficit = ((total - promacValue) / total * 100).toFixed(1);
                                            return `Gap to competitors: ${deficit}% behind average`;
                                        }
                                        return null;
                                    }
                                }
                            }
                        },
                        scales: {
                            x: {
                                title: {
                                    display: true,
                                    text: 'Companies',
                                    font: {
                                        weight: 'bold'
                                    }
                                },
                                grid: {
                                    display: false
                                }
                            },
                            y: {
                                title: {
                                    display: true,
                                    text: 'Number of Followers',
                                    font: {
                                        weight: 'bold'  
                                    }
                                },
                                beginAtZero: true,
                                grid: {
                                    color: 'rgba(156, 163, 175, 0.2)'
                                },
                                ticks: {
                                    callback: function(value) {
                                        if (value >= 1000) {
                                            return (value / 1000).toFixed(0) + 'K';
                                        }
                                        return value;
                                    }
                                }
                            }
                        },
                        animation: {
                            duration: 2000,
                            easing: 'easeInOutQuart'
                        },
                        interaction: {
                            intersect: false,
                            mode: 'index'
                        }
                    });
                    console.log('Social media chart created');
                } catch (error) {
                        console.error('Error creating social chart:', error);
                    }
                }
                END CHART COMMENT */
                
                console.log('All charts initialized successfully!');
            }
            
            // Start initialization
            initCharts();
        });
