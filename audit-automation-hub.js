/**
 * Audit Automation Hub - Central Integration Point
 * Connects CRM, audit intake forms, and automated report generation
 * Provides unified API for triggering and managing customer audits
 */

class AuditAutomationHub {
    constructor() {
        this.seoProcessor = window.seoAuditProcessor;
        this.auditCreator = window.customerAuditCreator;
        this.githubConfig = {
            username: 'Boetie78',
            repository: 'website-audits',
            baseUrl: 'https://boetie78.github.io/website-audits/'
        };
        
        // Queue for managing multiple audit requests
        this.auditQueue = [];
        this.processingQueue = false;
        
        console.log('🚀 Audit Automation Hub initialized');
    }

    /**
     * Main entry point - Process new customer from intake form
     */
    async processNewCustomer(customerData) {
        try {
            console.log(`📋 Processing new customer: ${customerData.customerName}`);
            
            // Step 1: Add customer to CRM
            const customer = await this.addCustomerToCRM(customerData);
            
            // Step 2: Trigger SEO audit if requested
            if (customerData.auditTypes && customerData.auditTypes.includes('seo')) {
                await this.queueSEOAudit(customer.id);
            }
            
            // Step 3: Schedule other audit types
            await this.scheduleAdditionalAudits(customer, customerData.auditTypes);
            
            // Step 4: Create customer dashboard
            await this.createCustomerSpace(customer);
            
            return {
                success: true,
                customerId: customer.id,
                customerName: customer.customerName,
                dashboardUrl: `${this.githubConfig.baseUrl}customers/${customer.id}/`,
                estimatedCompletion: this.estimateCompletionTime(customerData.auditTypes)
            };
            
        } catch (error) {
            console.error('❌ Error processing new customer:', error);
            return { success: false, error: error.message };
        }
    }

    /**
     * Add customer to CRM system
     */
    async addCustomerToCRM(customerData) {
        const customerId = 'customer_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5);
        
        const customer = {
            id: customerId,
            customerName: customerData.customerName,
            companyName: customerData.companyName || customerData.customerName,
            email: customerData.email,
            phone: customerData.phone || '',
            primaryDomain: customerData.primaryDomain,
            industry: customerData.industry || 'Business',
            location: customerData.location || 'Global',
            geoTarget: customerData.geoTarget || customerData.location || 'Global',
            
            // Audit specific data
            competitors: customerData.competitors || [],
            targetKeywords: customerData.targetKeywords || [],
            currentChallenges: customerData.currentChallenges || '',
            goals: customerData.goals || '',
            
            // Progress tracking
            progress: {
                seoAudit: 0,
                competitorAnalysis: 0,
                keywordAnalysis: 0
            },
            
            // Metadata
            dateAdded: new Date().toISOString().split('T')[0],
            lastUpdate: new Date().toISOString().split('T')[0],
            status: 'active',
            seoScore: 0,
            notes: `Customer added via automated intake form on ${new Date().toLocaleDateString()}`,
            auditHistory: [],
            
            // Automation settings
            automationEnabled: true,
            reportDelivery: customerData.reportDelivery || 'email',
            notificationPreferences: customerData.notifications || {
                email: true,
                completion: true,
                progress: false
            }
        };

        // Save to CRM
        const crmData = localStorage.getItem('crm_customers') || '[]';
        const customers = JSON.parse(crmData);
        customers.push(customer);
        localStorage.setItem('crm_customers', JSON.stringify(customers));
        
        console.log(`✅ Customer added to CRM: ${customer.customerName} (ID: ${customerId})`);
        
        return customer;
    }

    /**
     * Queue SEO audit for processing
     */
    async queueSEOAudit(customerId) {
        const auditRequest = {
            type: 'seo',
            customerId: customerId,
            priority: 'high',
            queuedAt: new Date().toISOString(),
            estimatedDuration: '5-10 minutes',
            status: 'queued'
        };
        
        this.auditQueue.push(auditRequest);
        console.log(`📊 SEO audit queued for customer ${customerId}`);
        
        // Start processing if not already running
        if (!this.processingQueue) {
            this.processAuditQueue();
        }
        
        return auditRequest;
    }

    /**
     * Process the audit queue
     */
    async processAuditQueue() {
        if (this.processingQueue || this.auditQueue.length === 0) {
            return;
        }
        
        this.processingQueue = true;
        console.log(`🔄 Processing audit queue (${this.auditQueue.length} items)`);
        
        while (this.auditQueue.length > 0) {
            const auditRequest = this.auditQueue.shift();
            
            try {
                auditRequest.status = 'processing';
                auditRequest.startedAt = new Date().toISOString();
                
                console.log(`🚀 Starting ${auditRequest.type} audit for customer ${auditRequest.customerId}`);
                
                let result;
                switch (auditRequest.type) {
                    case 'seo':
                        result = await this.processSEOAudit(auditRequest.customerId);
                        break;
                    case 'competitor':
                        result = await this.processCompetitorAudit(auditRequest.customerId);
                        break;
                    case 'keyword':
                        result = await this.processKeywordAudit(auditRequest.customerId);
                        break;
                    default:
                        throw new Error(`Unknown audit type: ${auditRequest.type}`);
                }
                
                auditRequest.status = result.success ? 'completed' : 'failed';
                auditRequest.completedAt = new Date().toISOString();
                auditRequest.result = result;
                
                console.log(`✅ ${auditRequest.type} audit ${auditRequest.status} for customer ${auditRequest.customerId}`);
                
                // Add delay between audits to avoid overloading
                await this.delay(2000);
                
            } catch (error) {
                console.error(`❌ Error processing ${auditRequest.type} audit:`, error);
                auditRequest.status = 'failed';
                auditRequest.error = error.message;
                auditRequest.completedAt = new Date().toISOString();
            }
        }
        
        this.processingQueue = false;
        console.log('✅ Audit queue processing completed');
    }

    /**
     * Process SEO Audit using the SEO Audit Processor
     */
    async processSEOAudit(customerId) {
        try {
            console.log(`📊 Running SEO audit for customer ${customerId}`);
            
            // Use the CustomerAuditCreator to run complete audit
            const result = await this.auditCreator.createCustomerAudit(customerId);
            
            if (result.success) {
                console.log(`✅ SEO audit completed successfully for ${result.customer}`);
                
                // Send notification if enabled
                await this.sendAuditCompletionNotification(customerId, 'seo', result);
                
                return {
                    success: true,
                    reportUrl: result.reportUrl,
                    dashboardUrl: result.dashboardUrl,
                    downloadUrl: result.downloadUrl
                };
            } else {
                throw new Error(result.error);
            }
            
        } catch (error) {
            console.error('❌ SEO audit failed:', error);
            return { success: false, error: error.message };
        }
    }

    /**
     * Process Competitor Audit (Stage 2)
     */
    async processCompetitorAudit(customerId) {
        // Placeholder for competitor audit processing
        // This would integrate with DataForSEO competitor analysis APIs
        
        console.log(`🎯 Competitor audit for customer ${customerId} - Coming soon!`);
        
        return {
            success: false,
            error: 'Competitor audit not yet implemented',
            scheduledForRelease: 'Q1 2025'
        };
    }

    /**
     * Process Keyword Audit (Stage 3)
     */
    async processKeywordAudit(customerId) {
        // Placeholder for keyword audit processing
        // This would integrate with DataForSEO keyword research APIs
        
        console.log(`🔍 Keyword audit for customer ${customerId} - Coming soon!`);
        
        return {
            success: false,
            error: 'Keyword audit not yet implemented',
            scheduledForRelease: 'Q1 2025'
        };
    }

    /**
     * Schedule additional audit types for future processing
     */
    async scheduleAdditionalAudits(customer, auditTypes) {
        const scheduledAudits = [];
        
        if (auditTypes && auditTypes.includes('competitor')) {
            const competitorAudit = {
                type: 'competitor',
                customerId: customer.id,
                priority: 'medium',
                scheduledFor: this.getScheduleDate(7), // 7 days from now
                status: 'scheduled',
                dependencies: ['seo'] // Wait for SEO audit to complete
            };
            
            scheduledAudits.push(competitorAudit);
        }
        
        if (auditTypes && auditTypes.includes('keyword')) {
            const keywordAudit = {
                type: 'keyword',
                customerId: customer.id,
                priority: 'medium',
                scheduledFor: this.getScheduleDate(14), // 14 days from now
                status: 'scheduled',
                dependencies: ['seo', 'competitor'] // Wait for previous audits
            };
            
            scheduledAudits.push(keywordAudit);
        }
        
        if (scheduledAudits.length > 0) {
            const existingSchedule = localStorage.getItem('scheduled_audits') || '[]';
            const schedule = JSON.parse(existingSchedule);
            schedule.push(...scheduledAudits);
            localStorage.setItem('scheduled_audits', JSON.stringify(schedule));
            
            console.log(`📅 Scheduled ${scheduledAudits.length} additional audits for ${customer.customerName}`);
        }
        
        return scheduledAudits;
    }

    /**
     * Create customer space/folder structure
     */
    async createCustomerSpace(customer) {
        try {
            console.log(`📁 Creating customer space for ${customer.customerName}`);
            
            // This would normally create actual GitHub folders via API
            // For now, we create the local structure
            const folderStructure = {
                [`customers/${customer.id}/index.html`]: 'Customer Dashboard',
                [`customers/${customer.id}/seo-audit/`]: 'SEO Audit Reports',
                [`customers/${customer.id}/competitor-analysis/`]: 'Competitor Analysis',
                [`customers/${customer.id}/keyword-analysis/`]: 'Keyword Strategy',
                [`customers/${customer.id}/reports/`]: 'Download Center'
            };
            
            localStorage.setItem(`customer_space_${customer.id}`, JSON.stringify({
                customerId: customer.id,
                customerName: customer.customerName,
                structure: folderStructure,
                createdAt: new Date().toISOString(),
                publicUrl: `${this.githubConfig.baseUrl}customers/${customer.id}/`
            }));
            
            console.log(`✅ Customer space created: ${this.githubConfig.baseUrl}customers/${customer.id}/`);
            
            return {
                success: true,
                publicUrl: `${this.githubConfig.baseUrl}customers/${customer.id}/`,
                structure: folderStructure
            };
            
        } catch (error) {
            console.error('❌ Error creating customer space:', error);
            return { success: false, error: error.message };
        }
    }

    /**
     * Send audit completion notification
     */
    async sendAuditCompletionNotification(customerId, auditType, results) {
        const customer = this.getCustomerFromCRM(customerId);
        if (!customer || !customer.notificationPreferences.completion) {
            return;
        }
        
        console.log(`📧 Sending completion notification for ${auditType} audit to ${customer.email}`);
        
        // In production, this would integrate with email service (SendGrid, etc.)
        const notification = {
            type: 'audit_completed',
            customerId: customerId,
            auditType: auditType,
            timestamp: new Date().toISOString(),
            recipientEmail: customer.email,
            subject: `${customer.customerName} - Your ${auditType.toUpperCase()} Audit is Complete!`,
            reportUrl: results.reportUrl,
            dashboardUrl: results.dashboardUrl
        };
        
        // Store notification for demonstration
        const notifications = JSON.parse(localStorage.getItem('audit_notifications') || '[]');
        notifications.push(notification);
        localStorage.setItem('audit_notifications', JSON.stringify(notifications));
        
        return notification;
    }

    /**
     * Get customer data from CRM
     */
    getCustomerFromCRM(customerId) {
        const crmData = localStorage.getItem('crm_customers');
        if (!crmData) return null;

        const customers = JSON.parse(crmData);
        return customers.find(c => c.id === customerId);
    }

    /**
     * Get schedule date (days from now)
     */
    getScheduleDate(daysFromNow) {
        const date = new Date();
        date.setDate(date.getDate() + daysFromNow);
        return date.toISOString().split('T')[0];
    }

    /**
     * Estimate completion time for audit types
     */
    estimateCompletionTime(auditTypes) {
        let totalMinutes = 0;
        
        if (auditTypes && auditTypes.includes('seo')) totalMinutes += 8; // ~8 minutes
        if (auditTypes && auditTypes.includes('competitor')) totalMinutes += 15; // ~15 minutes
        if (auditTypes && auditTypes.includes('keyword')) totalMinutes += 12; // ~12 minutes
        
        return totalMinutes > 60 ? 
            `${Math.ceil(totalMinutes / 60)} hour${totalMinutes > 120 ? 's' : ''}` :
            `${totalMinutes} minutes`;
    }

    /**
     * Utility: Add delay for queue processing
     */
    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    /**
     * Get audit queue status
     */
    getQueueStatus() {
        return {
            queueLength: this.auditQueue.length,
            processing: this.processingQueue,
            nextInQueue: this.auditQueue.length > 0 ? this.auditQueue[0] : null,
            lastProcessed: localStorage.getItem('last_audit_processed')
        };
    }

    /**
     * Manual trigger for specific audit types
     */
    async triggerAudit(customerId, auditType) {
        console.log(`🎯 Manual trigger: ${auditType} audit for customer ${customerId}`);
        
        switch (auditType) {
            case 'seo':
                return await this.queueSEOAudit(customerId);
            case 'competitor':
                // Future implementation
                console.log('🎯 Competitor audit coming soon!');
                return { success: false, error: 'Not yet implemented' };
            case 'keyword':
                // Future implementation
                console.log('🔍 Keyword audit coming soon!');
                return { success: false, error: 'Not yet implemented' };
            default:
                return { success: false, error: `Unknown audit type: ${auditType}` };
        }
    }

    /**
     * Get customer dashboard data
     */
    getCustomerDashboard(customerId) {
        const customer = this.getCustomerFromCRM(customerId);
        if (!customer) return null;

        const auditHistory = customer.auditHistory || [];
        const reports = JSON.parse(localStorage.getItem(`audit_reports_${customerId}`) || '{}');
        const queueStatus = this.getQueueStatus();

        return {
            customer: customer,
            reports: reports,
            auditHistory: auditHistory,
            queueStatus: queueStatus,
            publicUrl: `${this.githubConfig.baseUrl}customers/${customerId}/`
        };
    }
}

// Initialize the Audit Automation Hub
window.auditAutomationHub = new AuditAutomationHub();

// Integration functions for forms and CRM
window.processIntakeForm = async function(formData) {
    return await window.auditAutomationHub.processNewCustomer(formData);
};

window.triggerCustomerAudit = async function(customerId, auditType) {
    return await window.auditAutomationHub.triggerAudit(customerId, auditType);
};

window.getCustomerDashboard = function(customerId) {
    return window.auditAutomationHub.getCustomerDashboard(customerId);
};

console.log('🚀 Audit Automation Hub loaded and ready!');