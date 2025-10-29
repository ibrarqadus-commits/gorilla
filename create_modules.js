// This script would generate module pages
// Instead, we'll create them manually for better control

const modules = {
    2: {
        title: 'Market Understanding & Property Strategy',
        units: [
            { id: '2.1', title: 'What to Expect as a Lettings & Management Business Owner' },
            { id: '2.2', title: 'Understanding Different Property Types & Locations' },
            { id: '2.3', title: '7 Key Steps to Property Management Success' },
            { id: '2.4', title: 'Best & Worst Property Types for Letting & Management' },
            { id: '2.5', title: '8 Key Rules for Successful Lettings & Management' },
            { id: '2.6', title: 'Understanding Landlord & Tenant Demographics' },
            { id: '2.7', title: 'Identifying Your Target Market & Opportunities' },
            { id: '2.8', title: 'Using Property Portals & Data Tools' },
            { id: '2.9', title: 'Research for Property Valuation & Investment Analysis + Recap' }
        ]
    },
    3: {
        title: 'Business Setup & Compliance Foundations',
        units: [
            { id: '3.1', title: 'Creating Your Limited Company' },
            { id: '3.2', title: 'Securing Domain Name & Website Setup' },
            { id: '3.3', title: 'Registering with TDS & The Property Ombudsman' },
            { id: '3.4', title: 'Admin Sorted: Internal T&Cs, Tenancy Agreements, Templates, Signatures' },
            { id: '3.5', title: 'Service Provider Network' },
            { id: '3.6', title: 'New Legislation, Investment Numbers & Taxes – Golden Opportunity' },
            { id: '3.7', title: 'Boost: Are You Ready to Onboard Your First Landlord?' }
        ]
    },
    4: {
        title: 'Client Acquisition & Lettings Operations',
        units: [
            { id: '4.1', title: 'Identifying Locations, Properties & Landlords' },
            { id: '4.2', title: 'Winning Property Accounts' },
            { id: '4.3', title: 'Valuation, Keys & Marketing for Viewings' },
            { id: '4.4', title: 'Professional Photography & Paid Advertising' },
            { id: '4.5', title: 'Enquiries, Viewings & Securing the Best Tenants' },
            { id: '4.6', title: 'Holding Deposits & Negotiations' },
            { id: '4.7', title: 'Sign Tenancy Agreement, Inventory & Handover' },
            { id: '4.8', title: 'Invoicing & Payment Collection' }
        ]
    },
    5: {
        title: 'Property Management & Relationship Building',
        units: [
            { id: '5.1', title: 'Creating an Accounts Ledger' },
            { id: '5.2', title: 'Monthly Statements & Relationship Building' },
            { id: '5.3', title: 'Maintenance Reporting & Contractor Sourcing' },
            { id: '5.4', title: 'Utility & Council Tax Transfers + Running Costs' },
            { id: '5.5', title: 'Building Landlord Relationships & Brand Value' },
            { id: '5.6', title: 'Periodic Inspections & Reports' },
            { id: '5.7', title: 'Inspection Reports (Template) & Renovation Planning' },
            { id: '5.8', title: 'Managing Renovations & Contractors Effectively' },
            { id: '5.9', title: 'Running Costs & Budget Control' },
            { id: '5.10', title: 'Happy Landlord = Long-Term Landlord' }
        ]
    },
    6: {
        title: 'End of Tenancy, Renewals & Compliance Updates',
        units: [
            { id: '6.1', title: 'End of Tenancy Process' },
            { id: '6.2', title: 'Landlord Retention vs Agent Switching' },
            { id: '6.3', title: 'Remarketing & Avoiding Void Periods' },
            { id: '6.4', title: 'Securing New Tenants (Rinse & Repeat Model)' },
            { id: '6.5', title: 'Tenant Checkout, Inventory & Handover' },
            { id: '6.6', title: 'Repairs, Cleaning & Re-Letting Preparation' },
            { id: '6.7', title: 'Deposit Return & Closing Utilities' },
            { id: '6.8', title: 'Updating Landlords with Reports & Invoices' }
        ]
    },
    7: {
        title: 'Scaling, Marketing & Portfolio Growth',
        units: [
            { id: '7.1', title: 'Business Portfolio Review & Mid-Tenancy Inspections' },
            { id: '7.2', title: 'Getting More Landlords Effectively' },
            { id: '7.3', title: 'Expanding Portfolio & Referral Clients' },
            { id: '7.4', title: 'High-Converting Property Listings & Marketing Strategy' },
            { id: '7.5', title: 'Professional Property Photography' },
            { id: '7.6', title: 'Facebook Advertising & Targeting Overseas Landlords' },
            { id: '7.7', title: 'Scaling Towards Financial Freedom' },
            { id: '7.8', title: 'Next Course / Graduation Pathway' }
        ]
    }
};

console.log('Module data ready for page generation');
