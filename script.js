// script.js
document.addEventListener('DOMContentLoaded', function () {

    // --- START: FIREBASE SETUP ---
    const firebaseConfig = {
        apiKey: "AIzaSyCIwjMsTA3RlMTMDy5AN3jXzw_UVA7Fqkw", // WARNING: Keep API keys secure in real apps!
        authDomain: "la-charite.firebaseapp.com",
        databaseURL: "https://la-charite-default-rtdb.firebaseio.com",
        projectId: "la-charite",
        storageBucket: "la-charite.appspot.com",
        messagingSenderId: "423104270928",
        appId: "1:423104270928:web:7f0068fe5d93403589b755",
        measurementId: "G-TT4RP1NRRJ"
    };

    try {
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        } else {
            firebase.app();
        }
    } catch (e) {
        console.error("Firebase initialization error:", e);
        alert("Erreur critique: Impossible d'initialiser la connexion à la base de données. Veuillez vérifier votre connexion ou contacter le support.");
        document.querySelectorAll('form button[type="submit"], .main-buttons button').forEach(btn => btn.disabled = true);
        const loginButton = document.getElementById('login-button');
        if (loginButton) loginButton.disabled = true;
        const loginError = document.getElementById('login-error-message');
        if (loginError) {
            loginError.textContent = "Erreur d'initialisation Firebase. Connexion impossible.";
            loginError.classList.remove('hidden');
        }
        return;
    }

    const database = firebase.database();
    const dataRef = database.ref('gestionnaireData');
    let firebaseListenerHandle = null; // Pour stocker la référence du listener

    // --- Login Elements ---
    const loginContainer = document.getElementById('login-container');
    const loginForm = document.getElementById('login-form');
    const loginUsernameInput = document.getElementById('login-username');
    const loginPasswordInput = document.getElementById('login-password');
    const loginErrorMessage = document.getElementById('login-error-message');
    const mainAppContainer = document.getElementById('printable-area');
    const logoutButton = document.getElementById('logout-button');
    const userInfoUsernameSpan = document.getElementById('user-info-username');
    const userInfoStatusSpan = document.getElementById('user-info-status');

    // --- Formulaires et Boutons Principaux ---
    const supplyForm = document.getElementById('supply-form');
    const salesForm = document.getElementById('sales-form');
    const employeeForm = document.getElementById('employee-form');
    const learnerForm = document.getElementById('learner-form');
    const mobileMoneyForm = document.getElementById('mobile-money-form');
    const mmFournisseurForm = document.getElementById('mm-fournisseur-form');
    const clientProfileForm = document.getElementById('client-profile-form');
    const creditorForm = document.getElementById('creditor-form');
    const debtForm = document.getElementById('debt-form');
    const permissionEmployeeForm = document.getElementById('permission-employee-form');
    const permissionLearnerForm = document.getElementById('permission-learner-form');
    const invoiceGeneratorForm = document.getElementById('invoice-generator-form');
    const adminForm = document.getElementById('admin-form');
    const showSupplySectionButton = document.getElementById('show-supply-section');
    const showSalesSectionButton = document.getElementById('show-sales-section');
    const showEmployeesSectionButton = document.getElementById('show-employees-section');
    const showLearnersSectionButton = document.getElementById('show-learners-section');
    const showMobileMoneySectionButton = document.getElementById('show-mobile-money-section');
    const showCreditorsSectionButton = document.getElementById('show-creditors-section');
    const showDebtSectionButton = document.getElementById('show-debt-section');
    const generateInvoiceButton = document.getElementById('generate-invoice-button');
    const showReportSectionButton = document.getElementById('show-report-section');
    const showAdminSectionButton = document.getElementById('show-admin-section');
    const supplySection = document.getElementById('supply-section');
    const salesSection = document.getElementById('sales-section');
    const employeesSection = document.getElementById('employees-section');
    const learnersSection = document.getElementById('learners-section');
    const mobileMoneySection = document.getElementById('mobile-money-section');
    const creditorsSection = document.getElementById('creditors-section');
    const debtSection = document.getElementById('debt-section');
    const reportSection = document.getElementById('report-section');
    const invoiceGeneratorSection = document.getElementById('invoice-generator-section');
    const adminSection = document.getElementById('admin-section');
    const globalSearchInput = document.getElementById('global-search-input'); // Global Search

    // --- Tables (tbody) ---
    const salesTable = document.getElementById('sales-table')?.querySelector('tbody');
    const materielElectriqueTable = document.getElementById('materiel-electrique-table')?.querySelector('tbody');
    const expensesTable = document.getElementById('expenses-table')?.querySelector('tbody');
    const othersTable = document.getElementById('others-table')?.querySelector('tbody');
    const stockTable = document.getElementById('stock-table')?.querySelector('tbody');
    const supplyTable = document.getElementById('supply-table')?.querySelector('tbody');
    const employeesTable = document.getElementById('employees-table')?.querySelector('tbody');
    const learnersTable = document.getElementById('learners-table')?.querySelector('tbody');
    const mobileMoneyTable = document.getElementById('mobile-money-table')?.querySelector('tbody');
    const mmFournisseursTable = document.getElementById('mm-fournisseurs-table')?.querySelector('tbody');
    const clientProfilesTable = document.getElementById('client-profiles-table')?.querySelector('tbody');
    const creditorsTable = document.getElementById('creditors-table')?.querySelector('tbody');
    const debtTable = document.getElementById('debt-table')?.querySelector('tbody');
    const reportTable = document.getElementById('report-table')?.querySelector('tbody');
    const employeePermissionsTable = document.getElementById('employee-permissions-table')?.querySelector('tbody');
    const learnerPermissionsTable = document.getElementById('learner-permissions-table')?.querySelector('tbody');
    const adminTable = document.getElementById('admin-table')?.querySelector('tbody');

    // --- Boutons Afficher/Masquer Détails ---
    const showSupplyListButton = document.getElementById('show-supply-list-button');
    const showStockDetailsButton = document.getElementById('show-stock-details-button');
    const showSalesDetailsButton = document.getElementById('show-sales-details-button');
    const showMaterielElectriqueDetailsButton = document.getElementById('show-materiel-electrique-details-button');
    const showExpensesDetailsButton = document.getElementById('show-expenses-details-button');
    const showOthersDetailsButton = document.getElementById('show-others-details-button');
    const showEmployeesDetailsButton = document.getElementById('show-employees-details-button');
    const showLearnersDetailsButton = document.getElementById('show-learners-details-button');
    const showMobileMoneyDetailsButton = document.getElementById('show-mobile-money-details-button');
    const showMmFournisseursDetailsButton = document.getElementById('show-mm-fournisseurs-details-button');
    const showClientProfilesButton = document.getElementById('show-client-profiles-button');
    const showCreditorsDetailsButton = document.getElementById('show-creditors-details-button');
    const showDebtDetailsButton = document.getElementById('show-debt-details-button');
    const showReportDetailsButton = document.getElementById('show-report-details-button');
    const showEmployeePermissionsButton = document.getElementById('show-employee-permissions-button');
    const showLearnerPermissionsButton = document.getElementById('show-learner-permissions-button');
    const showAdminUsersButton = document.getElementById('show-admin-users-button');

    // --- Conteneurs Détails ---
    const supplyListContainer = document.getElementById('supply-list-container');
    const stockDetailsContainer = document.getElementById('stock-details-container');
    const salesDetailsContainer = document.getElementById('sales-details-container');
    const materielElectriqueDetailsContainer = document.getElementById('materiel-electrique-details-container');
    const expensesDetailsContainer = document.getElementById('expenses-details-container');
    const othersDetailsContainer = document.getElementById('others-details-container');
    const employeesDetailsContainer = document.getElementById('employees-details-container');
    const learnersDetailsContainer = document.getElementById('learners-details-container');
    const mobileMoneyDetailsContainer = document.getElementById('mobile-money-details-container');
    const mmFournisseursDetailsContainer = document.getElementById('mm-fournisseurs-details-container');
    const clientProfilesContainer = document.getElementById('client-profiles-container');
    const creditorsDetailsContainer = document.getElementById('creditors-details-container');
    const debtDetailsContainer = document.getElementById('debt-details-container');
    const reportDetailsContainer = document.getElementById('report-details-container');
    const employeePermissionsContainer = document.getElementById('employee-permissions-container');
    const learnerPermissionsContainer = document.getElementById('learner-permissions-container');
    const adminUsersContainer = document.getElementById('admin-users-container');

    // --- Boutons Print/Export ---
    // (Selectors remain the same)
    const printSupplyButton = document.getElementById('print-supply');
    const printStockButton = document.getElementById('print-stock');
    const printSalesButton = document.getElementById('print-sales');
    const printMaterielElectriqueButton = document.getElementById('print-materiel-electrique');
    const printExpensesButton = document.getElementById('print-expenses');
    const printOthersButton = document.getElementById('print-others');
    const printEmployeesButton = document.getElementById('print-employees');
    const printLearnersButton = document.getElementById('print-learners');
    const printMobileMoneyButton = document.getElementById('print-mobile-money');
    const printMmFournisseursButton = document.getElementById('print-mm-fournisseurs');
    const printClientProfilesButton = document.getElementById('print-client-profiles');
    const printCreditorsButton = document.getElementById('print-creditors');
    const printDebtButton = document.getElementById('print-debt');
    const printReportButton = document.getElementById('print-report');
    const printEmployeePermissionsButton = document.getElementById('print-employee-permissions');
    const printLearnerPermissionsButton = document.getElementById('print-learner-permissions');
    const printAdminUsersButton = document.getElementById('print-admin-users');
    const exportSupplyExcelButton = document.getElementById('export-supply-excel');
    const exportStockExcelButton = document.getElementById('export-stock-excel');
    const exportSalesExcelButton = document.getElementById('export-sales-excel');
    const exportMaterielElectriqueExcelButton = document.getElementById('export-materiel-electrique-excel');
    const exportExpensesExcelButton = document.getElementById('export-expenses-excel');
    const exportOthersExcelButton = document.getElementById('export-others-excel');
    const exportEmployeesExcelButton = document.getElementById('export-employees-excel');
    const exportLearnersExcelButton = document.getElementById('export-learners-excel');
    const exportMobileMoneyExcelButton = document.getElementById('export-mobile-money-excel');
    const exportMmFournisseursExcelButton = document.getElementById('export-mm-fournisseurs-excel');
    const exportClientProfilesExcelButton = document.getElementById('export-client-profiles-excel');
    const exportCreditorsExcelButton = document.getElementById('export-creditors-excel');
    const exportDebtExcelButton = document.getElementById('export-debt-excel');
    const exportReportExcelButton = document.getElementById('export-report-excel');
    const exportEmployeePermissionsExcelButton = document.getElementById('export-employee-permissions-excel');
    const exportLearnerPermissionsExcelButton = document.getElementById('export-learner-permissions-excel');
    const exportAdminUsersExcelButton = document.getElementById('export-admin-users-excel');
    const exportSupplyPdfButton = document.getElementById('export-supply-pdf');
    const exportStockPdfButton = document.getElementById('export-stock-pdf');
    const exportSalesPdfButton = document.getElementById('export-sales-pdf');
    const exportMaterielElectriquePdfButton = document.getElementById('export-materiel-electrique-pdf');
    const exportExpensesPdfButton = document.getElementById('export-expenses-pdf');
    const exportOthersPdfButton = document.getElementById('export-others-pdf');
    const exportEmployeesPdfButton = document.getElementById('export-employees-pdf');
    const exportLearnersPdfButton = document.getElementById('export-learners-pdf');
    const exportMobileMoneyPdfButton = document.getElementById('export-mobile-money-pdf');
    const exportMmFournisseursPdfButton = document.getElementById('export-mm-fournisseurs-pdf');
    const exportClientProfilesPdfButton = document.getElementById('export-client-profiles-pdf');
    const exportCreditorsPdfButton = document.getElementById('export-creditors-pdf');
    const exportDebtPdfButton = document.getElementById('export-debt-pdf');
    const exportReportPdfButton = document.getElementById('export-report-pdf');
    const exportEmployeePermissionsPdfButton = document.getElementById('export-employee-permissions-pdf');
    const exportLearnerPermissionsPdfButton = document.getElementById('export-learner-permissions-pdf');
    const exportAdminUsersPdfButton = document.getElementById('export-admin-users-pdf');


    // --- Champs Formulaire ---
    // (Selectors remain the same)
    // Supply
    const supplyDateInput = document.getElementById('supply-date');
    const supplyTypeSelect = document.getElementById('supply-type');
    const supplyDesignationInput = document.getElementById('supply-designation');
    const supplyQuantityInput = document.getElementById('supply-quantity');
    const supplyUnitPriceInput = document.getElementById('supply-unit-price');
    const supplyTotalAmountInput = document.getElementById('supply-total-amount');
    const supplyUserConnectedInput = document.getElementById('supply-user-connected');
    // Sales/Divers
    const operationTypeSelect = document.getElementById('operation-type');
    const saleDateInput = document.getElementById('sale-date');
    const salesUserConnectedInput = document.getElementById('sales-user-connected');
    const papeterieDetailsForm = document.getElementById('papeterie-details-form');
    const saleDesignationSelect = document.getElementById('sale-designation');
    const saleQuantityInput = document.getElementById('sale-quantity');
    const saleUnitPriceInput = document.getElementById('sale-unit-price');
    const saleTotalAmountInput = document.getElementById('sale-total-amount');
    const materielElectriqueDetailsForm = document.getElementById('materiel-electrique-details-form');
    const meDesignationSelect = document.getElementById('me-designation');
    const meQuantityInput = document.getElementById('me-quantity');
    const meUnitPriceInput = document.getElementById('me-unit-price');
    const meTotalAmountInput = document.getElementById('me-total-amount');
    const depensesDetailsForm = document.getElementById('depenses-details-form');
    const expenseReasonInput = document.getElementById('expense-reason');
    const expenseQuantityInput = document.getElementById('expense-quantity');
    const expenseAmountInput = document.getElementById('expense-amount');
    const diversDetailsForm = document.getElementById('divers-details-form');
    const otherDesignationInput = document.getElementById('other-designation');
    const otherQuantityInput = document.getElementById('other-quantity');
    const otherTotalAmountInput = document.getElementById('other-total-amount');
    // Employees
    const employeeNomInput = document.getElementById('employee-nom');
    const employeePrenomInput = document.getElementById('employee-prenom');
    const employeeRoleInput = document.getElementById('employee-role');
    const employeeAdresseInput = document.getElementById('employee-adresse');
    const employeeTelephoneInput = document.getElementById('employee-telephone');
    const employeeLieuResidenceInput = document.getElementById('employee-lieu-residence');
    const employeeJoursTravailInput = document.getElementById('employee-jours-travail');
    const employeeHeureArriveeInput = document.getElementById('employee-heure-arrivee');
    const employeeHeureDepartInput = document.getElementById('employee-heure-depart');
    const employeeSalaryInput = document.getElementById('employee-salary');
    const employeePaidAmountInput = document.getElementById('employee-paid-amount');
    const employeeHireDateInput = document.getElementById('employee-hire-date');
    const employeeUserConnectedInput = document.getElementById('employee-user-connected');
    const employeeContactPersonNomInput = document.getElementById('employee-contact-person-nom');
    const employeeContactPersonPrenomInput = document.getElementById('employee-contact-person-prenom');
    const employeeContactPersonAdresseInput = document.getElementById('employee-contact-person-adresse');
    const employeeContactPersonTelephoneInput = document.getElementById('employee-contact-person-telephone');
    const employeeContactPersonLieuResidenceInput = document.getElementById('employee-contact-person-lieu-residence');
    // Learners
    const learnerNomInput = document.getElementById('learner-nom');
    const learnerPrenomInput = document.getElementById('learner-prenom');
    const learnerAgeInput = document.getElementById('learner-age');
    const learnerUserConnectedInput = document.getElementById('learner-user-connected');
    const learnerAdresseInput = document.getElementById('learner-adresse');
    const learnerLieuResidenceInput = document.getElementById('learner-lieu-residence');
    const learnerNiveauEtudesInput = document.getElementById('learner-niveau-etudes');
    const learnerSituationMatrimonialeSelect = document.getElementById('learner-situation-matrimoniale');
    const learnerPereNomInput = document.getElementById('learner-pere-nom');
    const learnerPerePrenomInput = document.getElementById('learner-pere-prenom');
    const learnerMereNomInput = document.getElementById('learner-mere-nom');
    const learnerMerePrenomInput = document.getElementById('learner-mere-prenom');
    const learnerFiliereInput = document.getElementById('learner-filiere');
    const learnerDureeFormationInput = document.getElementById('learner-duree-formation');
    const learnerFraisDocumentsInput = document.getElementById('learner-frais-documents');
    const learnerTranche1Input = document.getElementById('learner-tranche1');
    const learnerTranche2Input = document.getElementById('learner-tranche2');
    const learnerTranche3Input = document.getElementById('learner-tranche3');
    const learnerTranche4Input = document.getElementById('learner-tranche4');
    const learnerGarantNomInput = document.getElementById('learner-garant-nom');
    const learnerGarantPrenomInput = document.getElementById('learner-garant-prenom');
    const learnerGarantTelephoneInput = document.getElementById('learner-garant-telephone');
    const learnerGarantAdresseInput = document.getElementById('learner-garant-adresse');
    // Employee Permissions
    const permEmpReqDateInput = document.getElementById('perm-emp-req-date');
    const permEmpNameSelect = document.getElementById('perm-emp-name');
    const permEmpDateInput = document.getElementById('perm-emp-date');
    const permEmpReasonTextarea = document.getElementById('perm-emp-reason');
    const permEmpUserConnectedInput = document.getElementById('perm-emp-user-connected');
    // Learner Permissions
    const permLrnReqDateInput = document.getElementById('perm-lrn-req-date');
    const permLrnNameSelect = document.getElementById('perm-lrn-name');
    const permLrnDateInput = document.getElementById('perm-lrn-date');
    const permLrnReasonTextarea = document.getElementById('perm-lrn-reason');
    const permLrnUserConnectedInput = document.getElementById('perm-lrn-user-connected');
    // Mobile Money Point
    const mmDateInput = document.getElementById('mm-date');
    const mmAgentInput = document.getElementById('mm-agent');
    const mmPointUserConnectedInput = document.getElementById('mm-point-user-connected');
    const mmBalanceMoovInput = document.getElementById('mm-balance-moov');
    const mmBalanceMtnInput = document.getElementById('mm-balance-mtn');
    const mmBalanceCelttisInput = document.getElementById('mm-balance-celttis');
    const mmBalanceCashInput = document.getElementById('mm-balance-cash');
    const mmCreditMoovInput = document.getElementById('mm-credit-moov');
    const mmCreditMtnInput = document.getElementById('mm-credit-mtn');
    const mmCreditCelttisInput = document.getElementById('mm-credit-celttis');
    const mmPerteTransfertInput = document.getElementById('mm-perte-transfert');
    const mmPerteCreditInput = document.getElementById('mm-perte-credit');
    // MM Fournisseur
    const mmFournisseurNomInput = document.getElementById('mm-fournisseur-nom');
    const mmFournisseurPrenomInput = document.getElementById('mm-fournisseur-prenom');
    const mmFournisseurContactInput = document.getElementById('mm-fournisseur-contact');
    const mmFournisseurMontantInput = document.getElementById('mm-fournisseur-montant');
    const mmFournisseurInteretInput = document.getElementById('mm-fournisseur-interet');
    const mmFournisseurVenduInput = document.getElementById('mm-fournisseur-vendu');
    const mmFournisseurUserConnectedInput = document.getElementById('mm-fournisseur-user-connected');
    // Client Profile
    const clientProfileNomInput = document.getElementById('client-profile-nom');
    const clientProfilePrenomInput = document.getElementById('client-profile-prenom');
    const clientProfileAdresseInput = document.getElementById('client-profile-adresse');
    const clientProfileContactInput = document.getElementById('client-profile-contact');
    const clientProfileStatutInput = document.getElementById('client-profile-statut');
    const clientUserConnectedInput = document.getElementById('client-user-connected');
    // Creditor Transaction
    const creditorDateInput = document.getElementById('creditor-date');
    const creditorNameSelect = document.getElementById('creditor-name');
    const creditorUserConnectedInput = document.getElementById('creditor-user-connected');
    const creditorDesignationInput = document.getElementById('creditor-designation');
    const creditorQuantityInput = document.getElementById('creditor-quantity');
    const creditorUnitPriceInput = document.getElementById('creditor-unit-price');
    const creditorTotalAmountDueInput = document.getElementById('creditor-total-amount-due');
    const creditorAmountPaidInput = document.getElementById('creditor-amount-paid');
    const creditorDueDateInput = document.getElementById('creditor-due-date');
    const creditorContactInput = document.getElementById('creditor-contact');
    // Debt/Loan
    const debtDateInput = document.getElementById('debt-date');
    const debtTypeSelect = document.getElementById('debt-type');
    const debtNameInput = document.getElementById('debt-name');
    const debtUserConnectedInput = document.getElementById('debt-user-connected');
    const debtDescriptionInput = document.getElementById('debt-description');
    const debtAmountInput = document.getElementById('debt-amount');
    const debtDueDateInput = document.getElementById('debt-due-date');
    const debtStatusSelect = document.getElementById('debt-status');
    // Reports
    const dailyReportButton = document.getElementById('daily-report');
    const weeklyReportButton = document.getElementById('weekly-report');
    const monthlyReportButton = document.getElementById('monthly-report');
    const yearlyReportButton = document.getElementById('yearly-report');
    const reportFilters = document.getElementById('report-filters');
    const dailyFilter = document.getElementById('daily-filter');
    const weeklyFilter = document.getElementById('weekly-filter');
    const monthlyFilter = document.getElementById('monthly-filter');
    const yearlyFilter = document.getElementById('yearly-filter');
    const reportDateInput = document.getElementById('report-date');
    const reportWeekInput = document.getElementById('report-week');
    const reportMonthInput = document.getElementById('report-month');
    const reportYearInput = document.getElementById('report-year');
    const generateReportButton = document.getElementById('generate-report');
    // Invoice Generator
    const invoiceGenDateInput = document.getElementById('invoice-gen-date');
    const invoiceGenClientNameInput = document.getElementById('invoice-gen-client-name');
    const invoiceGenClientContactInput = document.getElementById('invoice-gen-client-contact');
    const invoiceGenNumberInput = document.getElementById('invoice-gen-number');
    const invoiceItemsContainer = document.getElementById('invoice-items-container');
    const addInvoiceItemButton = document.getElementById('add-invoice-item-button');
    const invoiceGenTotalAmountInput = document.getElementById('invoice-gen-total-amount');
    const invoiceGenTotalWordsInput = document.getElementById('invoice-gen-total-words');
    const previewPrintInvoiceButton = document.getElementById('preview-print-invoice-button');
    // Admin Form Fields
    const adminUsernameInput = document.getElementById('admin-username');
    const adminPostInput = document.getElementById('admin-post');
    const adminPasswordInput = document.getElementById('admin-password');
    const adminStatusSelect = document.getElementById('admin-status');
    const adminOpUserConnectedInput = document.getElementById('admin-op-user-connected');

    // Hidden edit fields
    const supplyEditIndexInput = document.getElementById('supply-edit-index');
    const salesEditIndexInput = document.getElementById('sales-edit-index');
    const salesEditTypeInput = document.getElementById('sales-edit-type');
    const employeeEditIndexInput = document.getElementById('employee-edit-index');
    const learnerEditIndexInput = document.getElementById('learner-edit-index');
    const mobileMoneyEditIndexInput = document.getElementById('mobile-money-edit-index');
    const mmFournisseurEditKeyInput = document.getElementById('mm-fournisseur-edit-key');
    const clientProfileEditKeyInput = document.getElementById('client-profile-edit-key');
    const debtEditIndexInput = document.getElementById('debt-edit-index');
    const adminEditKeyInput = document.getElementById('admin-edit-key');

    // Invoice Counter
    let invoiceItemIndex = 1;
    let localInvoiceCounter = 1; // Reset on load/refresh, simple counter

    // --- Global Data Variables ---
    let salesData = [];
    let materielElectriqueData = [];
    let expensesData = [];
    let othersData = [];
    let supplyData = [];
    let employeesData = [];
    let learnersData = [];
    let mobileMoneyData = [];
    let mmFournisseursData = [];
    let clientProfilesData = [];
    let creditorsData = [];
    let debtData = [];
    let employeePermissionsData = [];
    let learnerPermissionsData = [];
    let adminData = [];
    let stockData = [];

    // --- Login State ---
    let currentUser = null;

    // --- Utility Functions ---
    function formatAmount(amount) {
        const num = parseFloat(amount);
        return !isNaN(num) ? num.toFixed(2) : '0.00';
    }

    function updateProductDesignationsForCategory(category) {
        let targetSelect;
        let sourceData = [];
        if (category === 'Papeterie') {
            targetSelect = saleDesignationSelect;
             sourceData = stockData.filter(item => item.type === 'Papeterie' && item.remainingQuantity > 0);
        } else if (category === 'Matériels électrique') {
            targetSelect = meDesignationSelect;
             sourceData = stockData.filter(item => item.type === 'Matériels électrique' && item.remainingQuantity > 0);
        } else {
            if (saleDesignationSelect) saleDesignationSelect.innerHTML = '<option value="">-- Choisir --</option>';
            if (meDesignationSelect) meDesignationSelect.innerHTML = '<option value="">-- Choisir --</option>';
            return;
        }
        if (!targetSelect) return;
        const currentValue = targetSelect.value;
        const designations = [...new Set(sourceData.map(item => item.designation))]
                                .sort((a, b) => (a || '').localeCompare(b || ''));
        targetSelect.innerHTML = '<option value="">-- Choisir --</option>' +
            designations.map(designation =>
                `<option value="${designation}" ${designation === currentValue ? 'selected' : ''}>${designation}</option>`
            ).join('');
         if (!designations.includes(currentValue)) {
             targetSelect.selectedIndex = 0;
         } else {
            targetSelect.value = currentValue;
         }
    }

    function calculateTotalAmount(quantityInput, unitPriceInput, totalAmountInput) {
        if (!quantityInput || !unitPriceInput || !totalAmountInput) return;
        const quantity = parseFloat(quantityInput.value) || 0;
        const unitPrice = parseFloat(unitPriceInput.value) || 0;
        totalAmountInput.value = formatAmount(quantity * unitPrice);
    }

    function calculateCreditorTotalAmount() {
        if (creditorQuantityInput?.value && creditorUnitPriceInput?.value && creditorTotalAmountDueInput) {
            calculateTotalAmount(creditorQuantityInput, creditorUnitPriceInput, creditorTotalAmountDueInput);
        } else if (creditorTotalAmountDueInput && !creditorQuantityInput?.value && !creditorUnitPriceInput?.value) {
            // Keep existing value
        }
    }

    function setTodaysDate() {
        const today = new Date().toISOString().split('T')[0];
        const now = new Date();
        const year = now.getFullYear();
        const month = (now.getMonth() + 1).toString().padStart(2, '0');

        [   'sale-date', 'supply-date', 'mm-date',
            'creditor-date', 'creditor-due-date',
            'employee-hire-date',
            'debt-date', 'debt-due-date',
            'report-date',
            'perm-emp-req-date', 'perm-lrn-req-date',
            'invoice-gen-date'
        ].forEach(id => {
                const element = document.getElementById(id);
                if (element && element.type === 'date' && !element.value) {
                    element.value = today;
                }
            });

        if (reportYearInput && !reportYearInput.value) reportYearInput.value = year;
        if(reportMonthInput && !reportMonthInput.value) reportMonthInput.value = `${year}-${month}`;
        if(reportWeekInput && !reportWeekInput.value){
            try {
                const currentThursday = new Date(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()));
                currentThursday.setUTCDate(currentThursday.getUTCDate() + 4 - (currentThursday.getUTCDay() || 7));
                const yearStart = new Date(Date.UTC(currentThursday.getUTCFullYear(), 0, 1));
                const weekNo = Math.ceil((((currentThursday - yearStart) / 86400000) + 1) / 7);
                const weekYear = currentThursday.getUTCFullYear();
                reportWeekInput.value = `${weekYear}-W${weekNo.toString().padStart(2,'0')}`;
            } catch (dateError) { console.error("Erreur calcul semaine par défaut:", dateError); }
        }
    }

    function toggleVisibility(element) {
        if (element) element.classList.toggle('hidden');
    }

    function toggleSalesSubSectionVisibility(containerToShow) {
        const allSalesSubSections = [ salesDetailsContainer, materielElectriqueDetailsContainer, expensesDetailsContainer, othersDetailsContainer ];
        allSalesSubSections.forEach(container => {
            if (container) {
                if (container === containerToShow && container.classList.contains('hidden')) {
                    container.classList.remove('hidden');
                } else if (container !== containerToShow) {
                    container.classList.add('hidden');
                } else if (container === containerToShow && !container.classList.contains('hidden')) {
                    container.classList.add('hidden');
                }
            }
        });
    }

    function setSectionVisibility(sectionToShow, sectionsToHide) {
        if (!sectionToShow) return;
        sectionsToHide.forEach(section => { if(section) section.classList.add('hidden'); });
        sectionToShow.classList.remove('hidden');

        // Hide detail containers *except* those potentially opened via toggle buttons
        // Retain visibility state of detail containers within the shown section
        const allDetailContainers = [
            //supplyListContainer, stockDetailsContainer, // Managed by toggles within supply
            //salesDetailsContainer, materielElectriqueDetailsContainer, expensesDetailsContainer, othersDetailsContainer, // Managed by toggles within sales
            //employeesDetailsContainer, learnersDetailsContainer, employeePermissionsContainer, learnerPermissionsContainer, // Managed by toggles within emp/lrn
            //mobileMoneyDetailsContainer, mmFournisseursDetailsContainer, // Managed by toggles within mm
            //clientProfilesContainer, creditorsDetailsContainer, // Managed by toggles within creditors
            //debtDetailsContainer, // Managed by toggle within debt
            reportDetailsContainer, reportFilters, // Managed by report logic
            adminUsersContainer, // Managed by toggle within admin
            document.getElementById('invoice-print-area')
        ].filter(Boolean);
        allDetailContainers.forEach(container => { if (container) container.classList.add('hidden'); });

        if (showReportDetailsButton) showReportDetailsButton.classList.add('hidden');
        if (invoiceGeneratorSection && sectionToShow !== invoiceGeneratorSection) {
            invoiceGeneratorSection.classList.add('hidden');
        }
        if (adminSection && sectionToShow !== adminSection) {
            adminSection.classList.add('hidden');
        }
        // Reset edit state when switching sections
         if (sectionToShow !== supplySection && supplyEditIndexInput) supplyEditIndexInput.value = '';
         if (sectionToShow !== salesSection) {
             if (salesEditIndexInput) salesEditIndexInput.value = '';
             if (salesEditTypeInput) salesEditTypeInput.value = '';
             if (salesForm) salesForm.querySelector('button[type="submit"]').textContent = 'Ajouter';
         }
         if (sectionToShow !== employeesSection && employeeEditIndexInput) employeeEditIndexInput.value = '';
         if (sectionToShow !== learnersSection && learnerEditIndexInput) learnerEditIndexInput.value = '';
         if (sectionToShow !== mobileMoneySection) {
             if (mobileMoneyEditIndexInput) mobileMoneyEditIndexInput.value = '';
             if (mmFournisseurEditKeyInput) mmFournisseurEditKeyInput.value = '';
         }
         if (sectionToShow !== creditorsSection && clientProfileEditKeyInput) clientProfileEditKeyInput.value = '';
         if (sectionToShow !== debtSection && debtEditIndexInput) debtEditIndexInput.value = '';
         if (sectionToShow !== adminSection && adminEditKeyInput) adminEditKeyInput.value = '';
    }

     function handleOperationTypeChange() {
        if (!operationTypeSelect) return;
        const type = operationTypeSelect.value;

        const subForms = {
            'Papeterie': papeterieDetailsForm,
            'Matériels électrique': materielElectriqueDetailsForm,
            'Dépenses': depensesDetailsForm,
            'Divers': diversDetailsForm
        };

        Object.values(subForms).forEach(form => {
            if (form) form.style.display = 'none';
        });

        const formToShow = subForms[type];
        if (formToShow) {
            formToShow.style.display = 'flex';
        }

        if (type === 'Papeterie' || type === 'Matériels électrique') {
            updateProductDesignationsForCategory(type);
        } else {
             updateProductDesignationsForCategory('');
        }

        const isEditing = !!salesEditIndexInput?.value;
        if (!isEditing) {
            Object.entries(subForms).forEach(([formType, formElement]) => {
                if (formType !== type && formElement) {
                    formElement.querySelectorAll('input, select').forEach(input => {
                        if (input.type === 'select-one') {
                            input.selectedIndex = 0;
                        } else if (input.type !== 'hidden' && !input.readOnly) {
                            input.value = '';
                        }
                    });
                }
            });
        }
    }

    // --- Print/Export Functions ---
    function printSpecificTable(containerId) {
        const containerToPrint = document.getElementById(containerId);
        if (!containerToPrint) { console.error("Conteneur à imprimer non trouvé:", containerId); alert("Erreur: Impossible de trouver le contenu à imprimer."); return; }
        document.body.classList.add('printing-active');
        containerToPrint.classList.add('show-in-print');
        const afterPrintHandler = () => {
            document.body.classList.remove('printing-active');
            containerToPrint.classList.remove('show-in-print');
            window.removeEventListener('afterprint', afterPrintHandler);
            window.removeEventListener('unload', afterPrintHandler);
        };
        window.addEventListener('afterprint', afterPrintHandler);
        window.addEventListener('unload', afterPrintHandler);
        try {
            window.print();
            // Timeout fallback for browsers that don't fire afterprint consistently
            setTimeout(() => { if (document.body.classList.contains('printing-active')) { afterPrintHandler(); } }, 1500);
        } catch (e) { console.error("Erreur window.print():", e); alert("Erreur lors du lancement de l'impression."); afterPrintHandler(); }
    }

    function printElement(elementId) {
        const elementToPrint = document.getElementById(elementId);
        if (!elementToPrint || !elementToPrint.innerHTML.trim()) { console.error("Print area empty or not found:", elementId); alert("Erreur: Contenu à imprimer vide ou introuvable."); return; }
        document.body.classList.add('printing-invoice');
        elementToPrint.classList.add('show-in-print');
        elementToPrint.classList.remove('hidden');
        const afterPrintHandler = () => {
            document.body.classList.remove('printing-invoice');
            elementToPrint.classList.remove('show-in-print');
            elementToPrint.classList.add('hidden');
            window.removeEventListener('afterprint', afterPrintHandler);
            window.removeEventListener('unload', afterPrintHandler);
        };
        window.addEventListener('afterprint', afterPrintHandler);
        window.addEventListener('unload', afterPrintHandler);
        setTimeout(() => { // Delay allows styles to apply before print dialog
             try {
                 window.print();
                 setTimeout(() => { if (document.body.classList.contains('printing-invoice')) { afterPrintHandler(); } }, 1500);
             } catch (e) { console.error("Erreur window.print():", e); alert("Erreur lors du lancement de l'impression."); afterPrintHandler(); }
        }, 100);
    }

    function exportToExcel(tableId, fileName) {
        try {
            const table = document.getElementById(tableId);
            if (!table) throw new Error(`Tableau ID '${tableId}' non trouvé.`);
            if (typeof XLSX === 'undefined') throw new Error("Librairie XLSX (SheetJS) non chargée.");

            // Clone the table to avoid modifying the original DOM
            const tableClone = table.cloneNode(true);

            // Find and remove the "Actions" column if it exists
            const actionHeaderIndex = Array.from(tableClone.querySelectorAll('thead th')).findIndex(th => th.classList.contains('actions-header'));
            if (actionHeaderIndex !== -1) {
                Array.from(tableClone.rows).forEach(row => {
                    if (row.cells.length > actionHeaderIndex) {
                        row.deleteCell(actionHeaderIndex);
                    }
                });
            }

            const worksheet = XLSX.utils.table_to_sheet(tableClone, { raw: true }); // Use raw values

            // Auto-adjust column widths (basic implementation)
            const columnWidths = [];
            if (worksheet['!ref']) {
                 const range = XLSX.utils.decode_range(worksheet['!ref']);
                 for (let C = range.s.c; C <= range.e.c; ++C) {
                     let maxLen = 0;
                     // Check header length
                     const headerAddr = {c: C, r: range.s.r};
                     const headerRef = XLSX.utils.encode_cell(headerAddr);
                     if(worksheet[headerRef]) maxLen = String(worksheet[headerRef].v || '').length;

                     // Check cell lengths in the column
                     for (let R = range.s.r + 1; R <= range.e.r; ++R) {
                         const cellAddress = { c: C, r: R };
                         const cellRef = XLSX.utils.encode_cell(cellAddress);
                         if (!worksheet[cellRef]) continue;
                         const cellText = String(worksheet[cellRef].v ?? ''); // Use nullish coalescing
                         if (cellText.length > maxLen) maxLen = cellText.length;
                     }
                     // Set width (minimum 12, max based on content + padding)
                     columnWidths[C] = { wch: Math.max(12, maxLen + 4) };
                 }
                 if (columnWidths.length > 0) worksheet['!cols'] = columnWidths;
            }

            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, "Données");
            XLSX.writeFile(workbook, fileName || "Export.xlsx");
        } catch (error) {
            console.error("Erreur export Excel:", error);
            alert(`Erreur lors de l'export Excel: ${error.message}`);
        }
    }

    function exportToPdf(tableId, fileName) {
        try {
            const table = document.getElementById(tableId);
            if (!table) throw new Error(`Tableau ID '${tableId}' non trouvé.`);
            const container = table.closest('.printable-content'); // Find parent container
            const titleElement = container?.querySelector('h3');
            const title = titleElement ? titleElement.innerText : `Export PDF`; // Get title from container

            if (typeof jspdf === 'undefined' || !jspdf.jsPDF || typeof jspdf.plugin?.autotable === 'undefined') {
                throw new Error("Librairies PDF (jsPDF, jsPDF-AutoTable) non chargées.");
            }

            const { jsPDF } = window.jspdf; // Use destructured assignment
            const allHeaders = Array.from(table.querySelectorAll('thead th'));
            const actionHeaderIndex = allHeaders.findIndex(th => th.classList.contains('actions-header'));

            // Filter out the "Actions" header for the PDF export headers array
            const headers = allHeaders
                .filter((_, index) => index !== actionHeaderIndex)
                .map(th => th.innerText.trim());

            // Determine orientation based on column count
            const colCount = headers.length;
            const orientation = colCount > 7 ? "landscape" : "portrait"; // Adjust threshold as needed

            const doc = new jsPDF({
                orientation: orientation,
                unit: "pt", // points
                format: "a4"
            });

            // Add Title
             doc.setFontSize(16);
             doc.setTextColor(40, 40, 40);
             doc.text(title, 40, 50); // Position title

            // Use autoTable
            doc.autoTable({
                html: `#${tableId}`,
                startY: 70, // Start below the title
                theme: 'grid', // Use grid theme for borders
                headStyles: {
                    fillColor: [26, 58, 109], // Dark blue header
                    textColor: 255, // White text
                    fontStyle: 'bold',
                    halign: 'center'
                },
                styles: {
                    fontSize: orientation === "landscape" ? 8 : 9, // Smaller font for landscape
                    cellPadding: 4,
                    overflow: 'linebreak', // Wrap text
                    lineWidth: 0.5,
                    lineColor: [222, 226, 230] // Light gray lines
                },
                alternateRowStyles: { // Stripe rows
                    fillColor: [248, 249, 250] // Very light gray
                },
                margin: { top: 70, right: 30, bottom: 40, left: 30 },
                tableWidth: 'auto', // Auto width based on content
                // Specify columns to exclude the 'Actions' column index
                columns: allHeaders.map((_, index) => index).filter(index => index !== actionHeaderIndex),
                 didParseCell: function(data) {
                     // Apply text alignment based on header classes (requires careful mapping)
                     if (data.cell.section === 'body' && data.column.index !== undefined) {
                         // Find the original column index *before* actions column was removed
                         let originalColIndex = -1;
                         let currentExportedCol = -1;
                         for(let i = 0; i < allHeaders.length; i++) {
                             if (i !== actionHeaderIndex) { // Skip actions column
                                 currentExportedCol++;
                                 if (currentExportedCol === data.column.index) {
                                     originalColIndex = i;
                                     break;
                                 }
                             }
                         }

                         if (originalColIndex !== -1) {
                             const headerClasses = allHeaders[originalColIndex].classList;
                             if (['unit-price-col', 'salary-col', 'amount-col', 'total-cost-col', 'balance-col', 'credit-col', 'remaining-salary-col'].some(cls => headerClasses.contains(cls))) {
                                 data.cell.styles.halign = 'right';
                             } else if (['quantity-col', 'supply-col', 'sold-col', 'remaining-col', 'age-col', 'interest-col', 'time-col'].some(cls => headerClasses.contains(cls))) {
                                 data.cell.styles.halign = 'center';
                             } else {
                                 data.cell.styles.halign = 'left';
                             }
                              // Style user column
                              if (headerClasses.contains('user-col')) {
                                  data.cell.styles.fontStyle = 'italic';
                                  data.cell.styles.fontSize = (data.cell.styles.fontSize || 9) * 0.9; // Slightly smaller
                                  data.cell.styles.textColor = [100, 100, 100]; // Gray text
                              }
                         }
                     }
                 }
            });

             // Add page numbers
             const pageCount = doc.internal.getNumberOfPages();
             doc.setFontSize(8);
             doc.setTextColor(100);
             for(let i = 1; i <= pageCount; i++) {
                 doc.setPage(i);
                 doc.text('Page ' + String(i) + '/' + String(pageCount), doc.internal.pageSize.width - 60, doc.internal.pageSize.height - 20);
             }

            doc.save(fileName || 'Export.pdf');
        } catch (error) {
            console.error("Erreur export PDF:", error);
            alert(`Erreur lors de l'export PDF: ${error.message}`);
        }
    }

    // --- Other Utility Functions ---
    // Gets the UTC date for the Monday of the specified ISO week
    function getDateOfISOWeek(w, y) {
         try {
            // Create a date for January 1st of the year
            const simple = new Date(Date.UTC(y, 0, 1 + (w - 1) * 7)); // Approximate date
            const dow = simple.getUTCDay(); // Day of week (0=Sun, 1=Mon, ..., 6=Sat)
            const ISOweekStart = simple;

            // Adjust to Monday of the week
            // If Sunday (0) or Saturday (6), move forward/backward accordingly
            // ISO week starts on Monday
            ISOweekStart.setUTCDate(simple.getUTCDate() - dow + (dow === 0 ? -6 : 1));

            return ISOweekStart;
        } catch (e) {
            console.error(`Error calculating start of week for ${y}-W${w}:`, e);
            return new Date(NaN); // Return invalid date on error
        }
    }
    function populateEmployeeSelectForPermission() {
         if (!permEmpNameSelect || !employeesData) return;
         const currentVal = permEmpNameSelect.value; // Store current value if editing
         permEmpNameSelect.innerHTML = '<option value="">-- Choisir Employé --</option>';
         const sortedEmployees = [...employeesData].sort((a, b) => (a.nom || '').localeCompare(b.nom || ''));
         sortedEmployees.forEach(emp => {
             const fullName = `${emp.nom || ''} ${emp.prenom || ''}`.trim();
             if (fullName) {
                 const option = document.createElement('option');
                 option.value = fullName;
                 option.textContent = fullName;
                 permEmpNameSelect.appendChild(option);
             }
         });
         // Restore selection if editing
         if (Array.from(permEmpNameSelect.options).some(opt => opt.value === currentVal)) {
             permEmpNameSelect.value = currentVal;
         } else {
             permEmpNameSelect.selectedIndex = 0; // Reset if value no longer exists
         }
    }
    function populateLearnerSelectForPermission() {
        if (!permLrnNameSelect || !learnersData) return;
        const currentVal = permLrnNameSelect.value;
        permLrnNameSelect.innerHTML = '<option value="">-- Choisir Apprenant --</option>';
        const sortedLearners = [...learnersData].sort((a, b) => (a.nom || '').localeCompare(b.nom || ''));
        sortedLearners.forEach(lrn => {
            const fullName = `${lrn.nom || ''} ${lrn.prenom || ''}`.trim();
            if (fullName) {
                const option = document.createElement('option');
                option.value = fullName;
                option.textContent = fullName;
                permLrnNameSelect.appendChild(option);
            }
        });
        if (Array.from(permLrnNameSelect.options).some(opt => opt.value === currentVal)) {
            permLrnNameSelect.value = currentVal;
        } else {
            permLrnNameSelect.selectedIndex = 0;
        }
    }
    function generateInvoiceNumber() {
        const year = new Date().getFullYear();
        const number = localInvoiceCounter++; // Increment local counter
        return `FACT-${year}-${number.toString().padStart(5, '0')}`;
    }
    function numberToWordsFrench(num) { /* ... Function remains the same ... */ if (num === null || num === undefined || isNaN(num)) return ''; num = Math.abs(num); const belowTwenty = ["zéro", "un", "deux", "trois", "quatre", "cinq", "six", "sept", "huit", "neuf", "dix", "onze", "douze", "treize", "quatorze", "quinze", "seize", "dix-sept", "dix-huit", "dix-neuf"]; const tens = ["", "", "vingt", "trente", "quarante", "cinquante", "soixante", "soixante-dix", "quatre-vingt", "quatre-vingt-dix"]; const scales = ["", "mille", "million", "milliard", "billion"]; function convertChunk(n) { if (n === 0) return ''; if (n < 20) return belowTwenty[n]; if (n < 70) { let ten = Math.floor(n / 10); let unit = n % 10; if (unit === 0) return tens[ten]; if (unit === 1 && ten !== 8 && ten !== 9) return tens[ten] + "-et-" + belowTwenty[unit]; return tens[ten] + (unit ? "-" + belowTwenty[unit] : ""); } if (n < 80) { return "soixante" + (n === 71 ? "-et-" : "-") + belowTwenty[n - 60]; } if (n < 100) { if (n === 80) return tens[8] + "s"; if (n < 90) return tens[8] + "-" + belowTwenty[n - 80]; return tens[9] + "-" + belowTwenty[n - 90]; } let h = Math.floor(n / 100); let remainder = n % 100; let hWord = (h > 1 ? belowTwenty[h] + " " : "") + "cent"; if (h > 1 && remainder === 0) hWord += "s"; return hWord + (remainder === 0 ? "" : " " + convertChunk(remainder)); } if (num === 0) return "Zéro Francs CFA"; let word = ''; let i = 0; while (num > 0) { if (num % 1000 !== 0) { let chunk = num % 1000; let chunkWord = convertChunk(chunk); if (scales[i] === 'mille' && chunk === 1) { chunkWord = ''; } word = chunkWord + (scales[i] ? " " + scales[i] + (chunk > 1 && scales[i] !== 'mille' ? "s" : "") : "") + (word ? " " : "") + word; } num = Math.floor(num / 1000); i++; } if (i === 1 && word === "") word = "mille"; word = word.charAt(0).toUpperCase() + word.slice(1); return word.replace(/\s+/g, ' ').trim() + " Francs CFA"; }
    function updateConnectedUserFields() {
        const username = currentUser?.username || '';
        const fields = document.querySelectorAll('.user-connected-field');
        fields.forEach(field => {
            if (field instanceof HTMLInputElement) {
                field.value = username;
            }
        });
        // console.log(`Champs utilisateur connecté mis à jour avec: ${username || 'Vide'}`);
    }

    // --- Table Update Functions (with Sorting Added and TD classes verified) ---

    function updateSupplyTable() {
        if (!supplyTable) return;
        supplyTable.innerHTML = '';
        // Sort by designation
        const sortedSupplyData = [...supplyData].sort((a, b) => (a.designation || '').localeCompare(b.designation || ''));
        const isAdmin = currentUser && currentUser.status === 'Administrateur';
        sortedSupplyData.forEach((supply) => {
            // Find the original index BEFORE sorting for edit/delete actions
            const originalIndex = supplyData.findIndex(item => item === supply);
            const row = supplyTable.insertRow();
            row.dataset.index = originalIndex; // Store original index
            row.insertCell().textContent = supply.date || '-';
            row.insertCell().textContent = supply.type || '-'; row.cells[row.cells.length-1].classList.add('type-col');
            const designationCellSupply = row.insertCell(); // Get cell reference
            designationCellSupply.textContent = supply.designation || '-';
            designationCellSupply.classList.add('designation-col'); // <-- Class ADDED/Verified
            const quantityCell = row.insertCell(); quantityCell.textContent = supply.quantity || '-'; quantityCell.classList.add('quantity-col');
            const priceCell = row.insertCell(); priceCell.textContent = formatAmount(supply.unitPrice); priceCell.classList.add('unit-price-col');
            const totalCell = row.insertCell(); totalCell.textContent = formatAmount(supply.totalAmount); totalCell.classList.add('amount-col');
            const userCell = row.insertCell(); userCell.textContent = supply.recordedBy || '-'; userCell.classList.add('user-col');
            const actionCell = row.insertCell(); actionCell.classList.add('actions-cell', 'no-print', 'no-export'); // <-- Added no-print/no-export
            actionCell.innerHTML = `
                <button class="action-btn edit-btn" aria-label="Modifier Approvisionnement" title="Modifier" onclick="editSupply(${originalIndex})" ${originalIndex === -1 || !isAdmin ? 'disabled' : ''}>✏️</button>
                <button class="action-btn delete-btn" aria-label="Supprimer Approvisionnement" title="Supprimer" onclick="deleteSupply(${originalIndex})" ${originalIndex === -1 || !isAdmin ? 'disabled' : ''}>❌</button>
            `;
        });
    }

    function updateSalesTable() { // Papeterie
        if (!salesTable) return;
        salesTable.innerHTML = '';
        // Sort by designation
        const sortedSalesData = [...salesData].sort((a, b) => (a.designation || '').localeCompare(b.designation || ''));
        const isAdmin = currentUser && currentUser.status === 'Administrateur';
        sortedSalesData.forEach((sale) => {
            const originalIndex = salesData.findIndex(item => item === sale);
            const row = salesTable.insertRow();
            row.dataset.index = originalIndex;
            row.insertCell().textContent = sale.date || '-';
            const designationCellSales = row.insertCell(); // Get cell reference
            designationCellSales.textContent = sale.designation || '-';
            designationCellSales.classList.add('designation-col'); // <-- Class ADDED/Verified
            const quantityCell = row.insertCell(); quantityCell.textContent = sale.quantity || '-'; quantityCell.classList.add('quantity-col');
            const priceCell = row.insertCell(); priceCell.textContent = formatAmount(sale.unitPrice); priceCell.classList.add('unit-price-col');
            const totalCell = row.insertCell(); totalCell.textContent = formatAmount(sale.totalAmount); totalCell.classList.add('amount-col');
            const userCell = row.insertCell(); userCell.textContent = sale.recordedBy || '-'; userCell.classList.add('user-col');
            const actionCell = row.insertCell(); actionCell.classList.add('actions-cell', 'no-print', 'no-export'); // <-- Added no-print/no-export
            actionCell.innerHTML = `
                <button class="action-btn edit-btn" aria-label="Modifier Vente Papeterie" title="Modifier" onclick="editSaleMisc('Papeterie', ${originalIndex})" ${originalIndex === -1 || !isAdmin ? 'disabled' : ''}>✏️</button>
                <button class="action-btn delete-btn" aria-label="Supprimer Vente Papeterie" title="Supprimer" onclick="deleteSale(${originalIndex})" ${originalIndex === -1 || !isAdmin ? 'disabled' : ''}>❌</button>
            `;
        });
    }

    function updateMaterielElectriqueTable() { // Mat Elec
        if (!materielElectriqueTable) return;
        materielElectriqueTable.innerHTML = '';
        // Sort by designation
        const sortedMEData = [...materielElectriqueData].sort((a, b) => (a.designation || '').localeCompare(b.designation || ''));
        const isAdmin = currentUser && currentUser.status === 'Administrateur';
        sortedMEData.forEach((sale) => {
            const originalIndex = materielElectriqueData.findIndex(item => item === sale);
            const row = materielElectriqueTable.insertRow();
            row.dataset.index = originalIndex;
            row.insertCell().textContent = sale.date || '-';
            const designationCellME = row.insertCell(); // Get cell reference
            designationCellME.textContent = sale.designation || '-';
            designationCellME.classList.add('designation-col'); // <-- Class ADDED/Verified
            const quantityCell = row.insertCell(); quantityCell.textContent = sale.quantity || '-'; quantityCell.classList.add('quantity-col');
            const priceCell = row.insertCell(); priceCell.textContent = formatAmount(sale.unitPrice); priceCell.classList.add('unit-price-col');
            const totalCell = row.insertCell(); totalCell.textContent = formatAmount(sale.totalAmount); totalCell.classList.add('amount-col');
            const userCell = row.insertCell(); userCell.textContent = sale.recordedBy || '-'; userCell.classList.add('user-col');
            const actionCell = row.insertCell(); actionCell.classList.add('actions-cell', 'no-print', 'no-export'); // <-- Added no-print/no-export
            actionCell.innerHTML = `
                <button class="action-btn edit-btn" aria-label="Modifier Vente Mat. Elec." title="Modifier" onclick="editSaleMisc('MatElec', ${originalIndex})" ${originalIndex === -1 || !isAdmin ? 'disabled' : ''}>✏️</button>
                <button class="action-btn delete-btn" aria-label="Supprimer Vente Mat. Elec." title="Supprimer" onclick="deleteMaterielElectriqueSale(${originalIndex})" ${originalIndex === -1 || !isAdmin ? 'disabled' : ''}>❌</button>
            `;
        });
    }

    function updateExpensesTable() { // Dépenses - No designation, keep date sort
        if (!expensesTable) return;
        expensesTable.innerHTML = '';
        const sortedExpenses = [...expensesData].sort((a, b) => (b.date || '').localeCompare(a.date || ''));
        const isAdmin = currentUser && currentUser.status === 'Administrateur';
        sortedExpenses.forEach((expense) => {
            const originalIndex = expensesData.findIndex(item => item === expense);
            const row = expensesTable.insertRow();
            row.dataset.index = originalIndex;
            row.insertCell().textContent = expense.date || '-';
            const reasonCell = row.insertCell(); // Get cell reference
            reasonCell.textContent = expense.reason || '-';
            reasonCell.classList.add('reason-col'); // <-- Class ADDED/Verified
            const quantityCell = row.insertCell(); quantityCell.textContent = expense.quantity ?? '-'; quantityCell.classList.add('quantity-col');
            const amountCell = row.insertCell(); amountCell.textContent = formatAmount(expense.amount); amountCell.classList.add('amount-col');
            const userCell = row.insertCell(); userCell.textContent = expense.recordedBy || '-'; userCell.classList.add('user-col');
            const actionCell = row.insertCell(); actionCell.classList.add('actions-cell', 'no-print', 'no-export'); // <-- Added no-print/no-export
            actionCell.innerHTML = `
                <button class="action-btn edit-btn" aria-label="Modifier Dépense" title="Modifier" onclick="editSaleMisc('Depenses', ${originalIndex})" ${originalIndex === -1 || !isAdmin ? 'disabled' : ''}>✏️</button>
                <button class="action-btn delete-btn" aria-label="Supprimer Dépense" title="Supprimer" onclick="deleteExpense(${originalIndex})" ${originalIndex === -1 || !isAdmin ? 'disabled' : ''}>❌</button>
            `;
        });
    }

    function updateOthersTable() { // Divers
        if (!othersTable) return;
        othersTable.innerHTML = '';
        // Sort by designation
        const sortedOthers = [...othersData].sort((a, b) => (a.designation || '').localeCompare(b.designation || ''));
        const isAdmin = currentUser && currentUser.status === 'Administrateur';
        sortedOthers.forEach((other) => {
            const originalIndex = othersData.findIndex(item => item === other);
            const row = othersTable.insertRow();
            row.dataset.index = originalIndex;
            row.insertCell().textContent = other.date || '-';
            const designationCellOthers = row.insertCell(); // Get cell reference
            designationCellOthers.textContent = other.designation || '-';
            designationCellOthers.classList.add('designation-col'); // <-- Class ADDED/Verified
            const quantityCell = row.insertCell(); quantityCell.textContent = other.quantity ?? '-'; quantityCell.classList.add('quantity-col');
            const totalCell = row.insertCell(); totalCell.textContent = formatAmount(other.totalAmount); totalCell.classList.add('amount-col');
            const userCell = row.insertCell(); userCell.textContent = other.recordedBy || '-'; userCell.classList.add('user-col');
            const actionCell = row.insertCell(); actionCell.classList.add('actions-cell', 'no-print', 'no-export'); // <-- Added no-print/no-export
            actionCell.innerHTML = `
                <button class="action-btn edit-btn" aria-label="Modifier Opération Diverse" title="Modifier" onclick="editSaleMisc('Divers', ${originalIndex})" ${originalIndex === -1 || !isAdmin ? 'disabled' : ''}>✏️</button>
                <button class="action-btn delete-btn" aria-label="Supprimer Opération Diverse" title="Supprimer" onclick="deleteOther(${originalIndex})" ${originalIndex === -1 || !isAdmin ? 'disabled' : ''}>❌</button>
            `;
        });
    }

    function calculateStock(supply, papeterieSales, meSales) {
        let stockMap = {};
        // Aggregate supplies
        supply.forEach(item => {
            const key = item.designation?.trim();
            if (!key || (item.type !== 'Papeterie' && item.type !== 'Matériels électrique')) return;
            const quantity = parseFloat(item.quantity) || 0;
            if (quantity <= 0) return;
            const itemKey = `${item.type}__${key}`; // Unique key per type + designation
            if (!stockMap[itemKey]) {
                stockMap[itemKey] = { designation: key, type: item.type, supplyQuantity: 0, soldQuantity: 0, remainingQuantity: 0, date: item.date };
            }
            stockMap[itemKey].supplyQuantity += quantity;
            stockMap[itemKey].remainingQuantity += quantity;
            // Keep the latest modification date (supply or sale)
            if (!stockMap[itemKey].date || (item.date && new Date(item.date) > new Date(stockMap[itemKey].date))) {
                stockMap[itemKey].date = item.date;
            }
        });
        // Aggregate sales
        const allStockableSales = [...papeterieSales, ...meSales];
        allStockableSales.forEach(item => {
            const key = item.designation?.trim();
            if (!key) return;
            const quantity = parseFloat(item.quantity) || 0;
            if (quantity <= 0) return;
            let itemKey = null;
            // Find the correct key based on sale type (assuming sale.type exists or can be derived)
             if(item.type === 'Papeterie') itemKey = `Papeterie__${key}`;
             else if(item.type === 'Matériels électrique') itemKey = `Matériels électrique__${key}`;
             // If sale type is not stored directly with the sale, we might need another way, but for now assume it is:
             else if (papeterieSales.includes(item)) itemKey = `Papeterie__${key}`;
             else if (meSales.includes(item)) itemKey = `Matériels électrique__${key}`;

            if (itemKey && stockMap[itemKey]) {
                stockMap[itemKey].soldQuantity += quantity;
                stockMap[itemKey].remainingQuantity -= quantity;
                // Update date if sale is newer
                if (!stockMap[itemKey].date || (item.date && new Date(item.date) > new Date(stockMap[itemKey].date))) {
                    stockMap[itemKey].date = item.date;
                }
                // Avoid tiny negative numbers due to floating point issues
                if (Math.abs(stockMap[itemKey].remainingQuantity) < 0.001) {
                    stockMap[itemKey].remainingQuantity = 0;
                }
            } else if (itemKey) {
                // Sale without matching supply - record as negative stock (or handle differently)
                console.warn(`Stock Calc: Vente de '${key}' (${itemKey.split('__')[0]}) sans approvisionnement correspondant.`);
                const saleType = itemKey.split('__')[0];
                stockMap[itemKey] = { designation: key, type: saleType, supplyQuantity: 0, soldQuantity: quantity, remainingQuantity: -quantity, date: item.date };
            } else {
                 console.warn(`Stock Calc: Vente ignorée car type inconnu pour ${key}`);
            }
        });
        return Object.values(stockMap);
    }

    function updateStockTable() {
        if (!stockTable) return;
        stockData = calculateStock(supplyData, salesData, materielElectriqueData);
        // Sort by designation
        const sortedStockData = [...stockData].sort((a, b) => (a.designation || '').localeCompare(b.designation || ''));
        stockTable.innerHTML = '';
        sortedStockData.forEach(stock => {
            const row = stockTable.insertRow();
            row.insertCell().textContent = stock.type || '-'; row.cells[row.cells.length-1].classList.add('type-col');
            row.insertCell().textContent = stock.date || '-'; row.cells[row.cells.length-1].classList.add('date-col');
            const designationCellStock = row.insertCell(); // Get cell reference
            designationCellStock.textContent = stock.designation || '-';
            designationCellStock.classList.add('designation-col'); // <-- Class ADDED/Verified
            const supplyQtyCell = row.insertCell(); supplyQtyCell.textContent = stock.supplyQuantity || 0; supplyQtyCell.classList.add('supply-col');
            const soldQtyCell = row.insertCell(); soldQtyCell.textContent = stock.soldQuantity || 0; soldQtyCell.classList.add('sold-col');
            const remainingQtyCell = row.insertCell(); remainingQtyCell.textContent = stock.remainingQuantity || 0; remainingQtyCell.classList.add('remaining-col');
            row.classList.remove('danger', 'partiel');
            const remaining = stock.remainingQuantity || 0;
            if (remaining <= 0) { row.classList.add('danger'); }
            else if (remaining < 5) { row.classList.add('partiel'); } // Example threshold
        });
        // Update dropdowns that depend on stock
         updateProductDesignationsForCategory('Papeterie');
         updateProductDesignationsForCategory('Matériels électrique');
    }

    function updateEmployeesTable() { // No designation, sort by name
        if (!employeesTable) return;
        employeesTable.innerHTML = '';
        const sortedEmployees = [...employeesData].sort((a, b) => (a.nom || '').localeCompare(b.nom || ''));
        const isAdmin = currentUser && currentUser.status === 'Administrateur';
        sortedEmployees.forEach((employee) => {
            const originalIndex = employeesData.findIndex(emp => emp === employee);
            const row = employeesTable.insertRow();
            row.dataset.index = originalIndex;
            row.insertCell().textContent = employee.nom || '-'; row.cells[row.cells.length-1].classList.add('name-col');
            row.insertCell().textContent = employee.prenom || '-'; row.cells[row.cells.length-1].classList.add('name-col');
            row.insertCell().textContent = employee.statut || '-'; row.cells[row.cells.length-1].classList.add('status-col');
            row.insertCell().textContent = employee.hireDate || '-'; row.cells[row.cells.length-1].classList.add('date-col');
            row.insertCell().textContent = employee.adresse || '-'; row.cells[row.cells.length-1].classList.add('address-col');
            row.insertCell().textContent = employee.telephone || '-'; row.cells[row.cells.length-1].classList.add('contact-col');
            row.insertCell().textContent = employee.lieuResidence || '-'; row.cells[row.cells.length-1].classList.add('residence-col');
            row.insertCell().textContent = employee.joursTravail || '-'; row.cells[row.cells.length-1].classList.add('workdays-col');
            row.insertCell().textContent = employee.heureArrivee || '-'; row.cells[row.cells.length-1].classList.add('time-col');
            row.insertCell().textContent = employee.heureDepart || '-'; row.cells[row.cells.length-1].classList.add('time-col');
            const salary = employee.salary !== null ? parseFloat(employee.salary) : 0;
            const paidAmount = employee.paidAmount || 0; const remainingSalary = salary - paidAmount;
            let salaryCell = row.insertCell(); salaryCell.textContent = formatAmount(salary); salaryCell.classList.add('salary-col');
            let paidCell = row.insertCell(); paidCell.textContent = formatAmount(paidAmount); paidCell.classList.add('amount-col');
            let remainingCell = row.insertCell(); remainingCell.textContent = formatAmount(remainingSalary); remainingCell.classList.add('amount-col', 'remaining-salary-col');
            row.insertCell().textContent = `${employee.contactPersonNom || ''} ${employee.contactPersonPrenom || ''}`.trim() || '-'; row.cells[row.cells.length-1].classList.add('contact-col');
            row.insertCell().textContent = employee.contactPersonTelephone || '-'; row.cells[row.cells.length-1].classList.add('contact-col');
            remainingCell.style.fontWeight = 'bold';
             row.classList.remove('solde', 'partiel', 'danger');
             if (remainingSalary <= 0.005) { row.classList.add('solde'); }
             else if (paidAmount > 0) { row.classList.add('partiel'); }
             else { row.classList.add('danger'); }

            const actionCell = row.insertCell(); actionCell.classList.add('actions-cell', 'no-print', 'no-export'); // <-- Added no-print/no-export
            actionCell.innerHTML = `
                 <button class="action-btn edit-btn" aria-label="Modifier Employé" title="Modifier" onclick="editEmployee(${originalIndex})" ${originalIndex === -1 || !isAdmin ? 'disabled' : ''}>✏️</button>
                 <button class="action-btn pay-btn" aria-label="Enregistrer Paiement Salaire" title="Payer" onclick="recordSalaryPayment(${originalIndex})" ${originalIndex === -1 || !isAdmin ? 'disabled' : ''}>💲</button>
                 <button class="action-btn delete-btn" aria-label="Supprimer Employé" title="Supprimer" onclick="deleteEmployee(${originalIndex})" ${originalIndex === -1 || !isAdmin ? 'disabled' : ''}>❌</button>
            `;
        });
    }

    function updateLearnersTable() { // No designation, sort by name
        if (!learnersTable) return;
        learnersTable.innerHTML = '';
        const sortedLearners = [...learnersData].sort((a, b) => (a.nom || '').localeCompare(b.nom || ''));
        const isAdmin = currentUser && currentUser.status === 'Administrateur';
        sortedLearners.forEach((learner) => {
             const originalIndex = learnersData.findIndex(l => l === learner);
            const row = learnersTable.insertRow();
            row.dataset.index = originalIndex;
            row.insertCell().textContent = learner.nom || '-'; row.cells[row.cells.length-1].classList.add('name-col');
            row.insertCell().textContent = learner.prenom || '-'; row.cells[row.cells.length-1].classList.add('name-col');
            row.insertCell().textContent = learner.age || '-'; row.cells[row.cells.length-1].classList.add('age-col');
            row.insertCell().textContent = learner.adresse || '-';
            row.insertCell().textContent = learner.lieuResidence || '-';
            row.insertCell().textContent = learner.niveauEtudes || '-';
            row.insertCell().textContent = learner.situationMatrimoniale || '-';
            row.insertCell().textContent = `${learner.pereNom || ''} ${learner.perePrenom || ''}`.trim() || '-';
            row.insertCell().textContent = `${learner.mereNom || ''} ${learner.merePrenom || ''}`.trim() || '-';
            row.insertCell().textContent = learner.filiere || '-'; row.cells[row.cells.length-1].classList.add('filiere-col'); // <-- Added class
            row.insertCell().textContent = learner.dureeFormation || '-';
            let cellDocs = row.insertCell(); cellDocs.textContent = formatAmount(learner.fraisDocuments); cellDocs.classList.add('amount-col');
            let cellT1 = row.insertCell(); cellT1.textContent = formatAmount(learner.tranche1); cellT1.classList.add('amount-col');
            let cellT2 = row.insertCell(); cellT2.textContent = formatAmount(learner.tranche2); cellT2.classList.add('amount-col');
            let cellT3 = row.insertCell(); cellT3.textContent = formatAmount(learner.tranche3); cellT3.classList.add('amount-col');
            let cellT4 = row.insertCell(); cellT4.textContent = formatAmount(learner.tranche4); cellT4.classList.add('amount-col');
            row.insertCell().textContent = `${learner.garantNom || ''} ${learner.garantPrenom || ''}`.trim() || '-';
            row.insertCell().textContent = learner.garantTelephone || '-';
            row.insertCell().textContent = learner.garantAdresse || '-';
             const actionCell = row.insertCell(); actionCell.classList.add('actions-cell', 'no-print', 'no-export'); // <-- Added no-print/no-export
             actionCell.innerHTML = `
                 <button class="action-btn edit-btn" aria-label="Modifier Apprenant" title="Modifier" onclick="editLearner(${originalIndex})" ${originalIndex === -1 || !isAdmin ? 'disabled' : ''}>✏️</button>
                 <button class="action-btn pay-btn" aria-label="Enregistrer Paiement Tranche" title="Payer Tranche" onclick="recordTranchePayment(${originalIndex})" ${originalIndex === -1 || !isAdmin ? 'disabled' : ''}>💲</button>
                 <button class="action-btn delete-btn" aria-label="Supprimer Apprenant" title="Supprimer" onclick="deleteLearner(${originalIndex})" ${originalIndex === -1 || !isAdmin ? 'disabled' : ''}>❌</button>
             `;
        });
    }

    function updateMobileMoneyTable() { // No designation, sort by date desc
        if (!mobileMoneyTable) return;
        mobileMoneyTable.innerHTML = '';
        const sortedMMData = [...mobileMoneyData].sort((a, b) => (b.date || '').localeCompare(a.date || ''));
        const isAdmin = currentUser && currentUser.status === 'Administrateur';
        sortedMMData.forEach((transaction) => {
            const originalIndex = mobileMoneyData.findIndex(item => item === transaction );
            const row = mobileMoneyTable.insertRow();
            row.dataset.index = originalIndex;
            const balanceMoov = transaction.balanceMoov || 0, balanceMTN = transaction.balanceMTN || 0, balanceCelttis = transaction.balanceCelttis || 0, balanceCash = transaction.balanceCash || 0;
            const creditMoov = transaction.creditMoov || 0, creditMTN = transaction.creditMTN || 0, creditCelttis = transaction.creditCelttis || 0;
            const perteTransfert = transaction.perteTransfert || 0; const perteCredit = transaction.perteCredit || 0;
            const totalBalance = balanceMoov + balanceMTN + balanceCelttis + balanceCash; const totalCredit = creditMoov + creditMTN + creditCelttis;
            row.insertCell().textContent = transaction.date || '-'; row.cells[row.cells.length-1].classList.add('date-col');
            row.insertCell().textContent = transaction.agent || '-'; row.cells[row.cells.length-1].classList.add('agent-col'); // <-- Added class
            let cellBM = row.insertCell(); cellBM.textContent = formatAmount(balanceMoov); cellBM.classList.add('balance-col');
            let cellBMTN = row.insertCell(); cellBMTN.textContent = formatAmount(balanceMTN); cellBMTN.classList.add('balance-col');
            let cellBC = row.insertCell(); cellBC.textContent = formatAmount(balanceCelttis); cellBC.classList.add('balance-col');
            let cellBCash = row.insertCell(); cellBCash.textContent = formatAmount(balanceCash); cellBCash.classList.add('balance-col');
            let cellTotalB = row.insertCell(); cellTotalB.textContent = formatAmount(totalBalance); cellTotalB.classList.add('balance-col'); cellTotalB.style.fontWeight = 'bold';
            let cellCM = row.insertCell(); cellCM.textContent = formatAmount(creditMoov); cellCM.classList.add('credit-col');
            let cellCMTN = row.insertCell(); cellCMTN.textContent = formatAmount(creditMTN); cellCMTN.classList.add('credit-col');
            let cellCC = row.insertCell(); cellCC.textContent = formatAmount(creditCelttis); cellCC.classList.add('credit-col');
            let cellTotalC = row.insertCell(); cellTotalC.textContent = formatAmount(totalCredit); cellTotalC.classList.add('credit-col'); cellTotalC.style.fontWeight = 'bold';
            let cellPT = row.insertCell(); cellPT.textContent = formatAmount(perteTransfert); cellPT.classList.add('amount-col');
            let cellPC = row.insertCell(); cellPC.textContent = formatAmount(perteCredit); cellPC.classList.add('amount-col');
            const userCell = row.insertCell(); userCell.textContent = transaction.recordedBy || '-'; userCell.classList.add('user-col');
            const actionCell = row.insertCell(); actionCell.classList.add('actions-cell', 'no-print', 'no-export'); // <-- Added no-print/no-export
            actionCell.innerHTML = `
                 <button class="action-btn edit-btn" aria-label="Modifier Point MM" title="Modifier" onclick="editMobileMoney(${originalIndex})" ${originalIndex === -1 || !isAdmin ? 'disabled' : ''}>✏️</button>
                 <button class="action-btn delete-btn" aria-label="Supprimer Point MM" title="Supprimer" onclick="deleteMobileMoney(${originalIndex})" ${originalIndex === -1 || !isAdmin ? 'disabled' : ''}>❌</button>
             `;
        });
    }

    function updateMmFournisseursTable() { // No designation, sort by name
        if (!mmFournisseursTable) return;
        mmFournisseursTable.innerHTML = '';
         const sortedFournisseurs = [...mmFournisseursData].sort((a, b) => { const nc = (a.nom || '').localeCompare(b.nom || ''); return nc !== 0 ? nc : (a.prenom || '').localeCompare(b.prenom || ''); });
         const isAdmin = currentUser && currentUser.status === 'Administrateur';
        sortedFournisseurs.forEach(f => {
            // Key for edit/delete doesn't depend on sorted order
            const row = mmFournisseursTable.insertRow();
            const key = `${f.nom}_${f.prenom}`;
            row.dataset.key = key;
            const montantFourni = f.montantFourni || 0; const creditVendu = f.creditVendu || 0; const creditRestant = montantFourni - creditVendu;
            row.insertCell().textContent = f.nom || '-'; row.cells[row.cells.length-1].classList.add('name-col');
            row.insertCell().textContent = f.prenom || '-'; row.cells[row.cells.length-1].classList.add('name-col');
            row.insertCell().textContent = f.contact || '-'; row.cells[row.cells.length-1].classList.add('contact-col');
            let cellMF = row.insertCell(); cellMF.textContent = formatAmount(montantFourni); cellMF.classList.add('amount-col');
            let cellI = row.insertCell(); cellI.textContent = (f.interet !== null && f.interet !== undefined) ? `${f.interet}%` : '-'; cellI.classList.add('interest-col');
            let cellCV = row.insertCell(); cellCV.textContent = formatAmount(creditVendu); cellCV.classList.add('amount-col');
            let cellCR = row.insertCell(); cellCR.textContent = formatAmount(creditRestant); cellCR.classList.add('amount-col'); cellCR.style.fontWeight = 'bold';
            row.classList.remove('solde', 'danger');
             if (creditRestant <= 0.005) { row.classList.add('solde'); }
             else { row.classList.add('danger'); }
            const actionCell = row.insertCell(); actionCell.classList.add('actions-cell', 'no-print', 'no-export'); // <-- Added no-print/no-export
             const safeNom = (f.nom || '').replace(/'/g, "\\'");
             const safePrenom = (f.prenom || '').replace(/'/g, "\\'");
            actionCell.innerHTML = `
                <button class="action-btn edit-btn" aria-label="Modifier Fournisseur MM" title="Modifier" onclick="editMmFournisseur('${safeNom}', '${safePrenom}')" ${!isAdmin ? 'disabled' : ''}>✏️</button>
                <button class="action-btn delete-btn" aria-label="Supprimer Fournisseur MM" title="Supprimer" onclick="deleteMmFournisseur('${safeNom}', '${safePrenom}')" ${!isAdmin ? 'disabled' : ''}>❌</button>
            `;
        });
    }

    function updateClientProfilesTable() { // No designation, sort by name
        if (!clientProfilesTable) return;
        clientProfilesTable.innerHTML = '';
        const sortedProfiles = [...clientProfilesData].sort((a, b) => { const nc = (a.nom || '').localeCompare(b.nom || ''); return nc !== 0 ? nc : (a.prenom || '').localeCompare(b.prenom || ''); });
        const isAdmin = currentUser && currentUser.status === 'Administrateur';
        sortedProfiles.forEach(p => {
            const key = `${p.nom}_${p.prenom}`;
            const row = clientProfilesTable.insertRow();
            row.dataset.key = key;
            row.insertCell().textContent = p.nom || '-'; row.cells[row.cells.length-1].classList.add('name-col');
            row.insertCell().textContent = p.prenom || '-'; row.cells[row.cells.length-1].classList.add('name-col');
            row.insertCell().textContent = p.adresse || '-';
            row.insertCell().textContent = p.contact || '-'; row.cells[row.cells.length-1].classList.add('contact-col');
            row.insertCell().textContent = p.statut || '-'; row.cells[row.cells.length-1].classList.add('status-col');
            const actionCell = row.insertCell(); actionCell.classList.add('actions-cell', 'no-print', 'no-export'); // <-- Added no-print/no-export
            const safeNom = (p.nom || '').replace(/'/g, "\\'");
            const safePrenom = (p.prenom || '').replace(/'/g, "\\'");
            actionCell.innerHTML = `
                 <button class="action-btn edit-btn" aria-label="Modifier Profil Client" title="Modifier" onclick="editClientProfile('${safeNom}', '${safePrenom}')" ${!isAdmin ? 'disabled' : ''}>✏️</button>
                 <button class="action-btn delete-btn" aria-label="Supprimer Profil Client" title="Supprimer" onclick="deleteClientProfile('${safeNom}', '${safePrenom}')" ${!isAdmin ? 'disabled' : ''}>❌</button>
            `;
        });
    }

    function populateClientSelect() {
        if (!creditorNameSelect) return;
        const previousValue = creditorNameSelect.value;
        creditorNameSelect.innerHTML = '<option value="">-- Choisir Client --</option>';
        const sortedProfiles = [...clientProfilesData].sort((a, b) => {
            const nameCompare = (a.nom || '').localeCompare(b.nom || '');
            return nameCompare !== 0 ? nameCompare : (a.prenom || '').localeCompare(b.prenom || '');
        });
        sortedProfiles.forEach(profile => {
            const option = document.createElement('option');
            const fullName = `${profile.nom || ''} ${profile.prenom || ''}`.trim();
            option.value = fullName;
            option.textContent = fullName + (profile.contact ? ` (${profile.contact})` : '');
            option.dataset.contact = profile.contact || '';
            creditorNameSelect.appendChild(option);
        });
        if (Array.from(creditorNameSelect.options).some(opt => opt.value === previousValue)) {
            creditorNameSelect.value = previousValue;
        } else {
            creditorNameSelect.selectedIndex = 0;
        }
        // Trigger change event to update contact field if necessary
        creditorNameSelect.dispatchEvent(new Event('change'));
    }

    function updateCreditorsTable() {
        if (!creditorsTable) return;
        creditorsTable.innerHTML = '';
        // Sort primarily by designation, then by client name
        const sortedCreditors = [...creditorsData].sort((a, b) => {
             const desCompare = (a.designation || '').localeCompare(b.designation || '');
             return desCompare !== 0 ? desCompare : (a.name || '').localeCompare(b.name || '');
        });
        const isAdmin = currentUser && currentUser.status === 'Administrateur';
        sortedCreditors.forEach((creditor) => {
             const originalIndex = creditorsData.findIndex(item => item === creditor);
            const row = creditorsTable.insertRow();
            row.dataset.index = originalIndex;
            const totalAmount = creditor.totalAmountDue || 0;
            const amountPaid = creditor.amountPaidTotal || 0;
            const remaining = totalAmount - amountPaid;
            const isSolde = remaining <= 0.005;
            const clientProfile = clientProfilesData.find(p => `${p.nom || ''} ${p.prenom || ''}`.trim() === creditor.name);
            const contactDisplay = clientProfile ? clientProfile.contact : (creditor.contact || '-');
            const userDisplay = creditor.lastPaymentBy || creditor.recordedBy || '-';

            row.insertCell().textContent = creditor.lastPaymentDate || creditor.date || '-'; row.cells[row.cells.length-1].classList.add('date-col');
            row.insertCell().textContent = creditor.name || '-'; row.cells[row.cells.length-1].classList.add('name-col');
            const designationCellCred = row.insertCell(); // Get cell reference
            designationCellCred.textContent = creditor.designation || '-';
            designationCellCred.classList.add('designation-col'); // <-- Class ADDED/Verified
            const quantityCell = row.insertCell(); quantityCell.textContent = creditor.quantity ?? '-'; quantityCell.classList.add('quantity-col');
            const unitPriceCell = row.insertCell(); unitPriceCell.textContent = creditor.unitPrice !== null ? formatAmount(creditor.unitPrice) : '-'; unitPriceCell.classList.add('unit-price-col');
            let cellTotal = row.insertCell(); cellTotal.textContent = formatAmount(totalAmount); cellTotal.classList.add('amount-col');
            let cellPaid = row.insertCell(); cellPaid.textContent = formatAmount(amountPaid); cellPaid.classList.add('amount-col');
            let cellRemaining = row.insertCell(); cellRemaining.textContent = formatAmount(remaining); cellRemaining.classList.add('amount-col'); cellRemaining.style.fontWeight = 'bold';
            row.insertCell().textContent = creditor.dueDate || '-'; row.cells[row.cells.length-1].classList.add('date-col');
            row.insertCell().textContent = contactDisplay; row.cells[row.cells.length-1].classList.add('contact-col');
            const statusCell = row.insertCell(); statusCell.textContent = isSolde ? 'Soldé' : 'En cours'; statusCell.classList.add('status-col');
            const userCell = row.insertCell(); userCell.textContent = userDisplay; userCell.classList.add('user-col');
            row.classList.remove('solde', 'partiel');
            if (isSolde) { row.classList.add('solde'); }
            else if (amountPaid > 0) { row.classList.add('partiel'); }
            const actionCell = row.insertCell(); actionCell.classList.add('actions-cell', 'no-print', 'no-export'); // <-- Added no-print/no-export
            actionCell.innerHTML = `
                  <button class="action-btn invoice-btn" aria-label="Imprimer Relevé Crédit" title="Imprimer Relevé" onclick="printCreditReceipt(${originalIndex})" ${originalIndex === -1 ? 'disabled' : ''}>🧾</button>
                  <button class="action-btn delete-btn" aria-label="Supprimer Transaction Crédit" title="Supprimer Transaction" onclick="deleteCreditor(${originalIndex})" ${originalIndex === -1 || !isAdmin ? 'disabled' : ''}>❌</button>
             `;
        });
    }

    function updateDebtTable() { // Has description, not designation. Sort by description.
        if (!debtTable) return;
        debtTable.innerHTML = '';
        // Sort by description first, then maybe by status or date? Let's do description then name.
        const sortedDebts = [...debtData].sort((a, b) => {
            const descCompare = (a.description || '').localeCompare(b.description || '');
            return descCompare !== 0 ? descCompare : (a.name || '').localeCompare(b.name || '');
        });
        const isAdmin = currentUser && currentUser.status === 'Administrateur';
        sortedDebts.forEach((debt) => {
             const originalIndex = debtData.findIndex(item => item === debt);
            const row = debtTable.insertRow();
            row.dataset.index = originalIndex;
            row.insertCell().textContent = debt.date || '-'; row.cells[row.cells.length-1].classList.add('date-col');
            row.insertCell().textContent = debt.type || '-'; row.cells[row.cells.length-1].classList.add('type-col');
            row.insertCell().textContent = debt.name || '-'; row.cells[row.cells.length-1].classList.add('name-col');
            const descriptionCell = row.insertCell(); // Get cell reference
            descriptionCell.textContent = debt.description || '-';
            descriptionCell.classList.add('description-col'); // <-- Class ADDED/Verified
            const amountCell = row.insertCell(); amountCell.textContent = formatAmount(debt.amount); amountCell.classList.add('amount-col');
            row.insertCell().textContent = debt.dueDate || '-'; row.cells[row.cells.length-1].classList.add('date-col');
            row.insertCell().textContent = debt.status || '-'; row.cells[row.cells.length-1].classList.add('status-col');
            const userCell = row.insertCell(); userCell.textContent = debt.recordedBy || '-'; userCell.classList.add('user-col');
            row.classList.remove('solde', 'partiel');
            if (debt.status === 'Remboursé / Récupéré') { row.classList.add('solde'); }
            else if (debt.status === 'Partiellement Remboursé / Récupéré') { row.classList.add('partiel'); }
            else if (debt.status === 'Annulé') { row.style.textDecoration = 'line-through'; row.style.color = '#888'; }
            const actionCell = row.insertCell(); actionCell.classList.add('actions-cell', 'no-print', 'no-export'); // <-- Added no-print/no-export
            actionCell.innerHTML = `
                 <button class="action-btn edit-btn" aria-label="Modifier Dette/Prêt" title="Modifier" onclick="editDebt(${originalIndex})" ${originalIndex === -1 || !isAdmin ? 'disabled' : ''}>✏️</button>
                 <button class="action-btn delete-btn" aria-label="Supprimer Dette/Prêt" title="Supprimer" onclick="deleteDebt(${originalIndex})" ${originalIndex === -1 || !isAdmin ? 'disabled' : ''}>❌</button>
            `;
        });
    }

    function updateEmployeePermissionsTable() { // No designation, sort by request date desc
        if (!employeePermissionsTable) return;
        employeePermissionsTable.innerHTML = '';
         const sortedPermissions = [...employeePermissionsData].sort((a, b) => (b.requestDate || '').localeCompare(a.requestDate || ''));
         const isAdmin = currentUser && currentUser.status === 'Administrateur';
        sortedPermissions.forEach((perm) => {
             const originalIndex = employeePermissionsData.findIndex(p => p === perm);
            const row = employeePermissionsTable.insertRow();
            row.dataset.index = originalIndex;
            row.insertCell().textContent = perm.requestDate || '-'; row.insertCell().textContent = perm.name || '-'; row.cells[row.cells.length-1].classList.add('name-col'); // Added class
            row.insertCell().textContent = perm.permissionDateOrPeriod || '-';
            const reasonCell = row.insertCell(); reasonCell.textContent = perm.reason || '-'; reasonCell.classList.add('reason-col');
            const statusCell = row.insertCell(); statusCell.textContent = perm.status || 'En attente'; statusCell.classList.add('status-col');
            const userCell = row.insertCell(); userCell.textContent = perm.statusUpdatedBy ? `${perm.status} par ${perm.statusUpdatedBy}` : perm.recordedBy || '-'; userCell.classList.add('user-col');
            row.classList.remove('solde', 'partiel', 'danger');
            statusCell.style.fontWeight = 'bold';
            switch (perm.status) {
                case 'Accordé': row.classList.add('solde'); break;
                case 'Refusé': row.classList.add('danger'); break;
                default: row.classList.add('partiel'); break;
            }
            const actionCell = row.insertCell(); actionCell.classList.add('actions-cell', 'no-print', 'no-export'); // <-- Added no-print/no-export
            actionCell.innerHTML = `
                <button class="action-btn pay-btn" aria-label="Accorder Permission" title="Accorder" onclick="updatePermissionStatus('employee', ${originalIndex}, 'Accordé')" ${originalIndex === -1 || perm.status === 'Accordé' || !isAdmin ? 'disabled' : ''}>✔️</button>
                <button class="action-btn delete-btn" aria-label="Refuser Permission" title="Refuser" onclick="updatePermissionStatus('employee', ${originalIndex}, 'Refusé')" ${originalIndex === -1 || perm.status === 'Refusé' || !isAdmin ? 'disabled' : ''}>❌</button>
                <button class="action-btn delete-btn" style="color: var(--color-secondary);" aria-label="Supprimer Demande" title="Supprimer" onclick="deletePermission('employee', ${originalIndex})" ${originalIndex === -1 || !isAdmin ? 'disabled' : ''}>🗑️</button>
            `;
        });
    }

    function updateLearnerPermissionsTable() { // No designation, sort by request date desc
         if (!learnerPermissionsTable) return;
         learnerPermissionsTable.innerHTML = '';
          const sortedPermissions = [...learnerPermissionsData].sort((a, b) => (b.requestDate || '').localeCompare(a.requestDate || ''));
          const isAdmin = currentUser && currentUser.status === 'Administrateur';
         sortedPermissions.forEach((perm) => {
             const originalIndex = learnerPermissionsData.findIndex(p => p === perm);
             const row = learnerPermissionsTable.insertRow();
             row.dataset.index = originalIndex;
             row.insertCell().textContent = perm.requestDate || '-'; row.insertCell().textContent = perm.name || '-'; row.cells[row.cells.length-1].classList.add('name-col'); // Added class
             row.insertCell().textContent = perm.permissionDateOrPeriod || '-';
             const reasonCell = row.insertCell(); reasonCell.textContent = perm.reason || '-'; reasonCell.classList.add('reason-col');
             const statusCell = row.insertCell(); statusCell.textContent = perm.status || 'En attente'; statusCell.classList.add('status-col');
             const userCell = row.insertCell(); userCell.textContent = perm.statusUpdatedBy ? `${perm.status} par ${perm.statusUpdatedBy}` : perm.recordedBy || '-'; userCell.classList.add('user-col');
             row.classList.remove('solde', 'partiel', 'danger');
             statusCell.style.fontWeight = 'bold';
             switch (perm.status) {
                 case 'Accordé': row.classList.add('solde'); break;
                 case 'Refusé': row.classList.add('danger'); break;
                 default: row.classList.add('partiel'); break;
             }
             const actionCell = row.insertCell(); actionCell.classList.add('actions-cell', 'no-print', 'no-export'); // <-- Added no-print/no-export
             actionCell.innerHTML = `
                <button class="action-btn pay-btn" aria-label="Accorder Permission" title="Accorder" onclick="updatePermissionStatus('learner', ${originalIndex}, 'Accordé')" ${originalIndex === -1 || perm.status === 'Accordé' || !isAdmin ? 'disabled' : ''}>✔️</button>
                <button class="action-btn delete-btn" aria-label="Refuser Permission" title="Refuser" onclick="updatePermissionStatus('learner', ${originalIndex}, 'Refusé')" ${originalIndex === -1 || perm.status === 'Refusé' || !isAdmin ? 'disabled' : ''}>❌</button>
                <button class="action-btn delete-btn" style="color: var(--color-secondary);" aria-label="Supprimer Demande" title="Supprimer" onclick="deletePermission('learner', ${originalIndex})" ${originalIndex === -1 || !isAdmin ? 'disabled' : ''}>🗑️</button>
            `;
         });
    }

     function updateAdminTable() { // No designation, sort by username
        if (!adminTable) return;
        adminTable.innerHTML = '';
        const sortedAdminData = [...adminData].sort((a, b) => (a.username || '').localeCompare(b.username || ''));
        const isAdmin = currentUser && currentUser.status === 'Administrateur';

        sortedAdminData.forEach(user => {
            // Key for edit/delete
            const row = adminTable.insertRow();
            row.dataset.key = user.username;
            row.insertCell().textContent = user.username || '-'; row.cells[row.cells.length-1].classList.add('name-col');
            row.insertCell().textContent = user.post || '-'; row.cells[row.cells.length-1].classList.add('post-col'); // <-- Added class
            const statusCell = row.insertCell();
            statusCell.textContent = user.status || '-';
            statusCell.classList.add('status-col');
            statusCell.style.fontWeight = 'bold';
            switch(user.status) {
                case 'Administrateur': statusCell.style.color = 'var(--color-danger)'; break;
                case 'Editeur': statusCell.style.color = 'var(--color-primary)'; break;
                case 'Lecteur': statusCell.style.color = 'var(--color-success)'; break;
                default: statusCell.style.color = 'var(--color-secondary-dark)';
            }
            const actionCell = row.insertCell();
            actionCell.classList.add('actions-cell', 'no-print', 'no-export'); // <-- Added no-print/no-export
             const safeUsername = (user.username || '').replace(/'/g, "\\'");
            const isSelf = currentUser && currentUser.username === user.username;
            const isLastAdmin = user.status === 'Administrateur' && adminData.filter(u => u.status === 'Administrateur').length <= 1;
            actionCell.innerHTML = `
                <button class="action-btn edit-btn" aria-label="Modifier Utilisateur" title="Modifier" onclick="editAdminUser('${safeUsername}')" ${!isAdmin || isSelf ? 'disabled' : ''}>✏️</button>
                <button class="action-btn delete-btn" aria-label="Supprimer Utilisateur" title="Supprimer" onclick="deleteAdminUser('${safeUsername}')" ${!isAdmin || isSelf || isLastAdmin ? 'disabled' : ''}>❌</button>
            `;
        });
    }

    // --- NEW: Per-Table Search Filtering Function ---
    function filterSpecificTable(inputElement) {
        if (!inputElement) return;
        const searchTerm = inputElement.value.toLowerCase().trim();
        const tableId = inputElement.dataset.tableId;
        // Get multiple column classes if specified, split by comma
        const columnClasses = (inputElement.dataset.columnClass || '').split(',').map(c => c.trim()).filter(c => c);

        const table = document.getElementById(tableId);
        const tbody = table?.querySelector('tbody');

        if (!tbody || columnClasses.length === 0) {
            // console.warn(`Filter skipped: table body for #${tableId} or column class not found/specified.`);
            return;
        }

        const rows = tbody.querySelectorAll('tr');
        rows.forEach(row => {
            let matchFound = false;
            if (searchTerm === '') {
                matchFound = true; // Show all if search is empty
            } else {
                 // Check against all specified column classes for a match
                 for (const colClass of columnClasses) {
                     const cells = row.querySelectorAll(`td.${colClass}`); // Might be multiple cells with same class (e.g., name + prenom)
                     for (const cell of cells) {
                         if (cell && cell.textContent.toLowerCase().includes(searchTerm)) {
                             matchFound = true;
                             break; // Found a match in this column class, no need to check others for this row
                         }
                     }
                     if (matchFound) break; // Found a match in one of the cells for this class, move to next row
                 }
            }

            // Show or hide the row
            row.style.display = matchFound ? '' : 'none';
        });
    }

    // --- Search Filtering Function (Global - Kept as is) ---
    function filterTablesByDesignation() {
        if (!globalSearchInput) return;
        const searchTerm = globalSearchInput.value.toLowerCase().trim();

        // Define which tables and which column class to search within them
        const tablesToFilter = [
            { tbody: supplyTable, columnClass: 'designation-col' },
            { tbody: stockTable, columnClass: 'designation-col' },
            { tbody: salesTable, columnClass: 'designation-col' },
            { tbody: materielElectriqueTable, columnClass: 'designation-col' },
            { tbody: expensesTable, columnClass: 'reason-col' }, // Uses reason-col
            { tbody: othersTable, columnClass: 'designation-col' }, // Uses designation-col
            { tbody: creditorsTable, columnClass: 'designation-col' }, // Search designation only globally
            { tbody: debtTable, columnClass: 'description-col' } // Uses description-col
        ];

        tablesToFilter.forEach(config => {
            if (!config.tbody) {
                // console.warn(`Search filter skipped: tbody not found for a config.`);
                return; // Skip if the tbody element doesn't exist (e.g., table not rendered)
            }

            const rows = config.tbody.querySelectorAll('tr');
            rows.forEach(row => {
                // Find the specific cell using the configured class
                const cell = row.querySelector(`td.${config.columnClass}`);
                if (cell) {
                    const cellText = cell.textContent.toLowerCase();
                    // Show row if search term is empty or if cell text includes the term
                    if (searchTerm === '' || cellText.includes(searchTerm)) {
                        row.style.display = ''; // Show row
                    } else {
                        row.style.display = 'none'; // Hide row
                    }
                } else {
                     // If the specific column doesn't exist in a row (e.g., summary rows), keep it visible
                     // Or decide based on specific needs, for now we keep non-data rows visible.
                     // row.style.display = ''; // Optional: ensure non-filterable rows remain visible
                }
            });
        });
    }


    /** Initializes the application UI - Called after login and on Firebase data update */
    function initializeAppUI() {
        // console.log("Initialisation/Mise à jour de l'interface principale de l'application...");
        localInvoiceCounter = 1; // Reset invoice counter on each UI refresh/load

        setTodaysDate();
        // Update tables (includes sorting)
        updateStockTable(); // Calculate stock first
        updateSupplyTable();
        updateSalesTable();
        updateMaterielElectriqueTable();
        updateExpensesTable();
        updateOthersTable();
        updateEmployeesTable();
        updateLearnersTable();
        populateEmployeeSelectForPermission();
        populateLearnerSelectForPermission();
        updateEmployeePermissionsTable();
        updateLearnerPermissionsTable();
        updateMobileMoneyTable();
        updateMmFournisseursTable();
        updateClientProfilesTable();
        populateClientSelect();
        updateCreditorsTable();
        updateDebtTable();
        updateAdminTable();
        handleOperationTypeChange(); // Initialize sales form state

        // Hide all sections initially if no user, otherwise RBAC will show allowed ones
        if (!currentUser) {
            const allSections = [supplySection, salesSection, employeesSection, learnersSection, mobileMoneySection, creditorsSection, debtSection, reportSection, invoiceGeneratorSection, adminSection].filter(Boolean);
            allSections.forEach(section => { if(section) section.classList.add('hidden'); });
        }

        // Hide details containers that are not toggled within sections
        const nonToggleDetails = [
            reportDetailsContainer, reportFilters, showReportDetailsButton,
            document.getElementById('invoice-print-area')
        ].filter(Boolean);
        nonToggleDetails.forEach(container => container.classList.add('hidden'));

        initializeInvoiceForm(); // Set up invoice generator defaults
        updateConnectedUserFields(); // Populate user fields based on currentUser

        // Update header user info
        if (userInfoUsernameSpan && currentUser) userInfoUsernameSpan.textContent = currentUser.username;
        else if (userInfoUsernameSpan) userInfoUsernameSpan.textContent = '';
        if (userInfoStatusSpan && currentUser) userInfoStatusSpan.textContent = currentUser.status;
        else if (userInfoStatusSpan) userInfoStatusSpan.textContent = '';

        // Apply role restrictions last to enable/disable elements correctly
        applyRoleRestrictions();

        // Apply the global filter AFTER tables are populated and RBAC applied
        filterTablesByDesignation(); // Apply Global Filter

        // Apply local filters (resetting their values is optional, maybe better not to reset)
        document.querySelectorAll('.table-search-container input[type="search"]').forEach(input => {
            filterSpecificTable(input);
        });

        // console.log("Initialisation/Mise à jour UI terminée.");
    }

    // --- Role-Based Restrictions (RBAC) ---
    function applyRoleRestrictions() {
        if (!currentUser) {
            // console.warn("Impossible d'appliquer les restrictions : aucun utilisateur connecté.");
            // Hide main sections and disable critical buttons if no user is logged in
            document.querySelectorAll('.main-buttons button').forEach(el => el.style.display = 'none');
            document.querySelectorAll('form button[type="submit"]').forEach(btn => btn.disabled = true);
            document.querySelectorAll('.actions-cell .action-btn').forEach(btn => btn.disabled = true);
             const addInvoiceItemBtn = document.getElementById('add-invoice-item-button');
             const previewPrintInvoiceBtn = document.getElementById('preview-print-invoice-button');
             const generateReportBtn = document.getElementById('generate-report');
            if (addInvoiceItemBtn) addInvoiceItemBtn.disabled = true;
            if (previewPrintInvoiceBtn) previewPrintInvoiceBtn.disabled = true;
            if (generateReportBtn) generateReportBtn.disabled = true;
            // Also hide sections explicitly if needed
            const allSections = [supplySection, salesSection, employeesSection, learnersSection, mobileMoneySection, creditorsSection, debtSection, reportSection, invoiceGeneratorSection, adminSection].filter(Boolean);
            allSections.forEach(section => { if(section) section.classList.add('hidden'); });
            return;
        }

        const status = currentUser.status;
        // console.log(`Application des restrictions pour: ${status}`);

        const isAdmin = status === 'Administrateur';
        const isEditor = status === 'Editeur';
        const isLecteur = status === 'Lecteur';

        // --- SELECTORS ---
        const allNavButtons = document.querySelectorAll('.main-buttons button');
        const allSubmitButtons = document.querySelectorAll('form button[type="submit"]');
        // Query dynamic buttons inside the function each time it runs
        const allActionButtons = document.querySelectorAll('.actions-cell .action-btn');
        const addInvoiceItemBtn = document.getElementById('add-invoice-item-button');
        const previewPrintInvoiceBtn = document.getElementById('preview-print-invoice-button');
        const generateReportBtn = document.getElementById('generate-report');
        const reportPrintExportBtns = document.querySelectorAll('#report-details-container .print-export-btn');
        const allEditButtons = document.querySelectorAll('.actions-cell .edit-btn');
        const allDeleteButtons = document.querySelectorAll('.actions-cell .delete-btn');
        const allPayButtons = document.querySelectorAll('.actions-cell .pay-btn'); // Salary/Tranche
        const allPermissionButtons = document.querySelectorAll('#employee-permissions-table .action-btn, #learner-permissions-table .action-btn');
        const allInvoicePrintButtons = document.querySelectorAll('.actions-cell .invoice-btn'); // Credit receipt


        // --- Default: Disable/Hide Everything Restricted ---
        allNavButtons.forEach(btn => btn.style.display = 'none'); // Hide all nav first
        allSubmitButtons.forEach(btn => btn.disabled = true);
        allActionButtons.forEach(btn => btn.disabled = true); // Disable all actions first
        if (addInvoiceItemBtn) addInvoiceItemBtn.disabled = true;
        if (previewPrintInvoiceBtn) previewPrintInvoiceBtn.disabled = true;
        if (generateReportBtn) generateReportBtn.disabled = true;
        reportPrintExportBtns.forEach(btn => btn.disabled = true);

        // --- ROLE-BASED ENABLING ---

        if (isAdmin) {
            // console.log("Accès Administrateur");
            allNavButtons.forEach(btn => btn.style.display = ''); // Show all nav
            allSubmitButtons.forEach(btn => btn.disabled = false); // Enable all submits
            // Re-enable action buttons based on their specific logic (needs re-render potentially)
             // Calling updateAllTablesForPermissions() handles re-enabling based on logic
             updateAllTablesForPermissions();

            if (addInvoiceItemBtn) addInvoiceItemBtn.disabled = false;
            document.querySelectorAll('.remove-invoice-item-btn').forEach(btn => btn.disabled = false); // Enable remove btns
            if (previewPrintInvoiceBtn) previewPrintInvoiceBtn.disabled = false;
            if (generateReportBtn) generateReportBtn.disabled = false;
            reportPrintExportBtns.forEach(btn => btn.disabled = false);
             allInvoicePrintButtons.forEach(btn => btn.disabled = false); // Enable credit receipt printing
            if (showAdminSectionButton) showAdminSectionButton.style.display = ''; // Show Admin nav button


        } else if (isEditor) {
            // console.log("Accès Editeur");
            // Allowed Nav Buttons
            if (showSupplySectionButton) showSupplySectionButton.style.display = '';
            if (showSalesSectionButton) showSalesSectionButton.style.display = '';
            if (showMobileMoneySectionButton) showMobileMoneySectionButton.style.display = '';
            if (generateInvoiceButton) generateInvoiceButton.style.display = '';
             if (showReportSectionButton) showReportSectionButton.style.display = ''; // Editors can view reports

            // Allowed Form Submits (Adding only)
            if (supplyForm) supplyForm.querySelector('button[type="submit"]').disabled = false;
            if (salesForm) salesForm.querySelector('button[type="submit"]').disabled = false;
            if (mobileMoneyForm) mobileMoneyForm.querySelector('button[type="submit"]').disabled = false;
            if (mmFournisseurForm) mmFournisseurForm.querySelector('button[type="submit"]').disabled = false;
            // These remain disabled: Employee, Learner, Client Profile, Creditor, Debt, Permission, Admin

            // Invoice Generation
            if (addInvoiceItemBtn) addInvoiceItemBtn.disabled = false;
            document.querySelectorAll('.remove-invoice-item-btn').forEach(btn => btn.disabled = false);
            if (previewPrintInvoiceBtn) previewPrintInvoiceBtn.disabled = false;

             // Report Generation & Export/Print
             if (generateReportBtn) generateReportBtn.disabled = false;
             reportPrintExportBtns.forEach(btn => btn.disabled = false);
             allInvoicePrintButtons.forEach(btn => btn.disabled = false); // Enable credit receipt printing


            // Explicitly Disable actions not allowed for Editor
            allEditButtons.forEach(btn => btn.disabled = true);
            allDeleteButtons.forEach(btn => btn.disabled = true);
            allPayButtons.forEach(btn => btn.disabled = true);
            allPermissionButtons.forEach(btn => btn.disabled = true);


            // Hide Admin section
             if (showAdminSectionButton) showAdminSectionButton.style.display = 'none';
             if (adminSection) adminSection.classList.add('hidden');

        } else if (isLecteur) {
            // console.log("Accès Lecteur");
            // Only Bilan Nav Button
            if (showReportSectionButton) showReportSectionButton.style.display = '';

            // Enable report export/print buttons & credit receipt printing
             reportPrintExportBtns.forEach(btn => btn.disabled = false);
             allInvoicePrintButtons.forEach(btn => btn.disabled = false);

            // Hide Admin section
             if (showAdminSectionButton) showAdminSectionButton.style.display = 'none';
             if (adminSection) adminSection.classList.add('hidden');

            // All other interactive buttons (submits, actions, invoice add/gen, report gen) remain disabled.
        }
    }

    // Helper to re-run table updates, needed after permissions change or data load
    function updateAllTablesForPermissions() {
        updateSupplyTable(); updateSalesTable(); updateMaterielElectriqueTable(); updateExpensesTable();
        updateOthersTable(); updateEmployeesTable(); updateLearnersTable(); updateMobileMoneyTable();
        updateMmFournisseursTable(); updateClientProfilesTable(); updateCreditorsTable(); updateDebtTable();
        updateEmployeePermissionsTable(); updateLearnerPermissionsTable(); updateAdminTable();
    }

    /** Handles data updates from Firebase */
    function handleFirebaseDataUpdate(snapshot) {
        console.log("Réception des données de Firebase...");
        try {
            const dbData = snapshot.val() || {};
            // Assign data safely, defaulting to empty array if null/undefined/not array
            const getData = (key) => Array.isArray(dbData[key]) ? dbData[key] : [];
            salesData = getData('salesData');
            materielElectriqueData = getData('materielElectriqueData');
            expensesData = getData('expensesData');
            othersData = getData('othersData');
            supplyData = getData('supplyData');
            employeesData = getData('employeesData');
            learnersData = getData('learnersData');
            mobileMoneyData = getData('mobileMoneyData');
            mmFournisseursData = getData('mmFournisseursData');
            clientProfilesData = getData('clientProfilesData');
            creditorsData = getData('creditorsData');
            debtData = getData('debtData');
            employeePermissionsData = getData('employeePermissionsData');
            learnerPermissionsData = getData('learnerPermissionsData');
            adminData = getData('adminData'); // Load admin data too
            // console.log("Données globales mises à jour depuis Firebase.");

            // If a user is logged in, refresh the UI completely
            if (currentUser) {
                initializeAppUI();
            } else {
                // If no user is logged in (e.g., initial load before login),
                // enable the login button once data is ready.
                 if(loginForm) loginForm.querySelector('button[type="submit"]').disabled = false;
            }

        } catch (error) {
            console.error("Erreur lors du traitement des données Firebase:", error);
            alert("Erreur lors de la mise à jour des données. L'affichage peut être incorrect.");
            // Optionally disable UI elements or show an error message
        }
    }


    // --- Form Submit Handlers (WITH PERMISSION CHECKS) ---
    // (Form submit handlers remain unchanged - permissions are checked inside)
    if(supplyForm) supplyForm.addEventListener('submit', function (event) {
        event.preventDefault();
        if (!currentUser || !(currentUser.status === 'Administrateur' || currentUser.status === 'Editeur')) {
             alert("Accès Refusé: Permissions insuffisantes."); return;
        }
        const editIndex = supplyEditIndexInput ? parseInt(supplyEditIndexInput.value, 10) : -1;
        const isEditing = editIndex > -1;

        if (isEditing && currentUser.status === 'Editeur') {
             alert("Accès Refusé: Les éditeurs ne peuvent pas modifier les données existantes."); return;
        }
        if (!supplyDateInput || !supplyTypeSelect || !supplyDesignationInput || !supplyQuantityInput || !supplyUnitPriceInput || !supplyTotalAmountInput) { alert("Erreur interne: Champs appro. manquants."); return; }

        const date = supplyDateInput.value; const type = supplyTypeSelect.value; const designation = supplyDesignationInput.value.trim();
        const quantity = parseFloat(supplyQuantityInput.value); const unitPrice = parseFloat(supplyUnitPriceInput.value); const totalAmount = parseFloat(supplyTotalAmountInput.value);

        if (!date || !type || !designation || isNaN(quantity) || quantity <= 0 || isNaN(unitPrice) || unitPrice < 0 || isNaN(totalAmount)) { alert("Veuillez remplir correctement tous les champs d'approvisionnement."); return; }

        const isStockableType = (type === 'Papeterie' || type === 'Matériels électrique');
        let originalStockableStatus = false;
        let requiresStockUpdate = false;
        let originalDataBackup = null;

        // Check for designation conflicts only if it's a stockable type
        if (isStockableType) {
            const conflictingItem = supplyData.find((item, index) =>
                item.designation === designation &&
                (item.type === 'Papeterie' || item.type === 'Matériels électrique') &&
                item.type !== type && // Different type
                index !== editIndex // Not the item being edited
            );
            if (conflictingItem) {
                alert(`Attention : Désignation "${designation}" existe déjà pour le type stockable "${conflictingItem.type}". Veuillez utiliser une désignation unique ou vérifier le type.`);
                return;
            }
        }

        const newData = { date, type, designation, quantity, unitPrice, totalAmount }; // Removed recordedBy initially

        if (isEditing) { // Admin Editing
            if(editIndex >= supplyData.length) { alert("Erreur : index de modification invalide."); return; }
            originalDataBackup = JSON.parse(JSON.stringify(supplyData[editIndex]));
            newData.recordedBy = originalDataBackup.recordedBy; // Keep original recorder
            newData.lastModifiedBy = currentUser?.username || 'N/A';
            newData.lastModifiedDate = new Date().toISOString();
            originalStockableStatus = originalDataBackup.type === 'Papeterie' || originalDataBackup.type === 'Matériels électrique';
            requiresStockUpdate = (isStockableType || originalStockableStatus) &&
                                  (originalDataBackup.designation !== designation || originalDataBackup.type !== type || originalDataBackup.quantity !== quantity);
            // Update local data first
            supplyData[editIndex] = newData;
             // Save to Firebase. UI will update via listener 'on'.
            saveDataToFirebase('supplyData', supplyData)
                 .then(() => {
                     alert('Approvisionnement mis à jour.'); // Give feedback immediately
                     // Reset form after successful save intention
                     supplyForm.reset(); setTodaysDate(); updateConnectedUserFields();
                     if(supplyEditIndexInput) supplyEditIndexInput.value = '';
                     supplyForm.querySelector('button[type="submit"]').textContent = 'Ajouter Approvisionnement';
                 })
                 .catch(error => {
                     // Revert local data on failure
                      if (originalDataBackup) { supplyData[editIndex] = originalDataBackup; }
                      // No need to call updateTable here, listener will handle it if needed
                  });

        } else { // Admin or Editor Adding
            newData.recordedBy = currentUser?.username || 'N/A';
            // Add locally first
            supplyData.push(newData);
            requiresStockUpdate = isStockableType;
             // Save to Firebase. UI will update via listener 'on'.
             saveDataToFirebase('supplyData', supplyData)
                 .then(() => {
                      alert('Approvisionnement ajouté.');
                      // Reset form after successful save intention
                      supplyForm.reset(); setTodaysDate(); updateConnectedUserFields();
                 })
                 .catch(error => {
                      // Revert local data on failure
                       supplyData.pop();
                   });
        }
    });

    if(salesForm) salesForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const editIndex = salesEditIndexInput ? parseInt(salesEditIndexInput.value, 10) : -1;
        const editType = salesEditTypeInput?.value || ''; // Will be 'Papeterie', 'Matériels électrique', etc.
        const isEditing = editIndex > -1 && editType;
        const isAdmin = currentUser && currentUser.status === 'Administrateur';
        const isEditor = currentUser && currentUser.status === 'Editeur';

        if (!currentUser || (!isAdmin && !isEditor)) {
            alert("Accès Refusé: Permissions insuffisantes."); return;
        }
        if (isEditing && !isAdmin) {
             alert("Accès Refusé: Seuls les administrateurs peuvent modifier."); return;
        }

        if (!saleDateInput?.value) { alert("La date est requise."); return; }
        const date = saleDateInput.value;
        const operationType = operationTypeSelect.value; // The type selected in the dropdown NOW
        const recordedBy = currentUser?.username || 'N/A';
        let needsStockUpdate = false;
        let dataArray, storageKey, originalDataBackup = null;
        let tempLocalData = null; // To hold the modified array before saving

        try {
            let itemData = { date }; // Common fields, recorder added later based on add/edit

            // --- Determine target array and storage key ---
            if (operationType === 'Papeterie') { dataArray = salesData; storageKey = 'salesData'; }
            else if (operationType === 'Matériels électrique') { dataArray = materielElectriqueData; storageKey = 'materielElectriqueData'; }
            else if (operationType === 'Dépenses') { dataArray = expensesData; storageKey = 'expensesData'; }
            else if (operationType === 'Divers') { dataArray = othersData; storageKey = 'othersData'; }
            else { throw new Error("Type d'opération inconnu."); }

            // --- Backup original item if editing ---
             if (isEditing) {
                 if (editType !== operationType) { throw new Error("Modification impossible: Le type d'opération ne peut pas être changé. Supprimez et recréez l'entrée."); }
                 if (editIndex >= dataArray.length) { throw new Error("Erreur interne: Index de modification invalide."); }
                 originalDataBackup = JSON.parse(JSON.stringify(dataArray[editIndex]));
             }

            // --- Extract and Validate data based on type ---
             if (operationType === 'Papeterie' || operationType === 'Matériels électrique') {
                 needsStockUpdate = true;
                 const designationSelect = (operationType === 'Papeterie') ? saleDesignationSelect : meDesignationSelect;
                 const quantityInput = (operationType === 'Papeterie') ? saleQuantityInput : meQuantityInput;
                 const unitPriceInput = (operationType === 'Papeterie') ? saleUnitPriceInput : meUnitPriceInput;
                 const totalAmountInput = (operationType === 'Papeterie') ? saleTotalAmountInput : meTotalAmountInput;

                 itemData.type = operationType; // Store type with the data
                 itemData.designation = designationSelect.value; if (!itemData.designation) throw new Error("Sélectionnez une désignation.");
                 itemData.quantity = parseFloat(quantityInput.value) || 0; if (itemData.quantity <= 0) throw new Error("Quantité > 0 requise.");
                 itemData.unitPrice = parseFloat(unitPriceInput.value) || 0; if (itemData.unitPrice < 0) throw new Error("Prix unitaire >= 0 requis.");
                 itemData.totalAmount = parseFloat(totalAmountInput.value) || (itemData.quantity * itemData.unitPrice);

                 const stockChange = isEditing ? itemData.quantity - originalDataBackup.quantity : itemData.quantity;
                 if (stockChange !== 0) { // Only check if quantity changes
                     const currentStockItem = stockData.find(stock => stock.designation === itemData.designation && stock.type === operationType);
                     const availableStock = currentStockItem ? currentStockItem.remainingQuantity : 0;
                     const effectiveAvailable = isEditing ? availableStock + originalDataBackup.quantity : availableStock;
                     if (itemData.quantity > effectiveAvailable) {
                         if (!confirm(`Stock ${operationType} insuffisant pour ${itemData.designation}. Stock actuel avant modif: ${effectiveAvailable}. Vendre/Modifier quand même (${itemData.quantity}) ?`)) {
                             throw new Error(`Opération annulée par l'utilisateur.`);
                         }
                     }
                 }
             } else if (operationType === 'Dépenses') {
                 itemData.reason = expenseReasonInput.value.trim(); if (!itemData.reason) throw new Error("Motif dépense requis.");
                 itemData.quantity = expenseQuantityInput.value ? (parseFloat(expenseQuantityInput.value) || null) : null;
                 itemData.amount = parseFloat(expenseAmountInput.value) || 0; if (itemData.amount <= 0) throw new Error("Montant total dépense > 0 requis.");
             } else if (operationType === 'Divers') {
                 itemData.type = 'Divers'; // Store type
                 itemData.designation = otherDesignationInput.value.trim(); if (!itemData.designation) throw new Error("Désignation/Motif requis pour Divers.");
                 itemData.quantity = otherQuantityInput.value ? (parseFloat(otherQuantityInput.value) || null) : null;
                 itemData.totalAmount = parseFloat(otherTotalAmountInput.value); if (isNaN(itemData.totalAmount) || itemData.totalAmount <= 0) throw new Error("Montant Total Divers > 0 requis.");
             }

            // --- Prepare Updated Local Data Array ---
             tempLocalData = [...dataArray]; // Work on a copy
             if (isEditing) {
                 itemData.recordedBy = originalDataBackup.recordedBy;
                 itemData.lastModifiedBy = recordedBy;
                 itemData.lastModifiedDate = new Date().toISOString();
                 tempLocalData[editIndex] = { ...originalDataBackup, ...itemData }; // Merge, keep potential history
             } else {
                 itemData.recordedBy = recordedBy;
                 tempLocalData.push(itemData);
             }

             // --- Save Data ---
             if (!storageKey) throw new Error("Erreur interne: Clé de sauvegarde indéterminée.");
              saveDataToFirebase(storageKey, tempLocalData)
                 .then(() => {
                     const action = isEditing ? 'mise à jour' : 'ajoutée';
                     alert(`Opération ${action}.`);
                     // Reset form after successful save intention
                     salesForm.reset(); setTodaysDate(); handleOperationTypeChange(); updateConnectedUserFields();
                     if (salesEditIndexInput) salesEditIndexInput.value = '';
                     if (salesEditTypeInput) salesEditTypeInput.value = '';
                     salesForm.querySelector('button[type="submit"]').textContent = 'Ajouter';
                 })
                 .catch(error => {
                     // No need to revert local data here, the global vars weren't changed yet
                      console.error(`Failed to save ${storageKey}.`);
                 });

        } catch (error) {
            alert(`Erreur ajout/modification opération: ${error.message}`);
            // No local data revert needed as we didn't modify global vars yet
        }
    });

    if(employeeForm) employeeForm.addEventListener('submit', function (event) {
        event.preventDefault();
        if (!currentUser || currentUser.status !== 'Administrateur') {
            alert("Accès Refusé: Seuls les administrateurs peuvent gérer les employés."); return;
        }
        const editIndex = employeeEditIndexInput ? parseInt(employeeEditIndexInput.value, 10) : -1;
        const isEditing = editIndex > -1;
        if (!employeeNomInput) { alert("Erreur interne: Champ nom employé manquant."); return; }
        const nom = employeeNomInput.value.trim(); if (!nom) { alert("Nom employé requis."); return; }

        const salaryValue = employeeSalaryInput ? parseFloat(employeeSalaryInput.value) : null;
        const paidAmountValue = employeePaidAmountInput ? parseFloat(employeePaidAmountInput.value) : 0;
        if (salaryValue !== null && (isNaN(salaryValue) || salaryValue < 0)) { alert("Le salaire doit être un nombre positif ou vide."); return; }
        if (isNaN(paidAmountValue) || paidAmountValue < 0) { alert("Montant payé doit être un nombre positif ou zéro."); return; }

        const employeeDataObj = {
            nom, prenom: employeePrenomInput?.value.trim() || '', statut: employeeRoleInput?.value.trim() || '',
            adresse: employeeAdresseInput?.value.trim() || '', telephone: employeeTelephoneInput?.value.trim() || '',
            lieuResidence: employeeLieuResidenceInput?.value.trim() || '', joursTravail: employeeJoursTravailInput?.value.trim() || '',
            heureArrivee: employeeHeureArriveeInput?.value || '', heureDepart: employeeHeureDepartInput?.value || '',
            salary: salaryValue, paidAmount: paidAmountValue, hireDate: employeeHireDateInput?.value || '',
            contactPersonNom: employeeContactPersonNomInput?.value.trim() || '', contactPersonPrenom: employeeContactPersonPrenomInput?.value.trim() || '',
            contactPersonAdresse: employeeContactPersonAdresseInput?.value.trim() || '', contactPersonTelephone: employeeContactPersonTelephoneInput?.value.trim() || '',
            contactPersonLieuResidence: employeeContactPersonLieuResidenceInput?.value.trim() || ''
        };

        let originalDataBackup = null;
        let tempLocalData = [...employeesData]; // Work on copy

        if (isEditing) {
            if (editIndex >= tempLocalData.length) { alert("Erreur: Index employé invalide."); return; }
            originalDataBackup = JSON.parse(JSON.stringify(tempLocalData[editIndex]));
            employeeDataObj.paymentHistory = originalDataBackup.paymentHistory || [];
            employeeDataObj.recordedBy = originalDataBackup.recordedBy;
            employeeDataObj.lastModifiedBy = currentUser?.username || 'N/A';
            employeeDataObj.lastModifiedDate = new Date().toISOString();
            tempLocalData[editIndex] = employeeDataObj; // Update the copy
        } else {
            employeeDataObj.recordedBy = currentUser?.username || 'N/A';
            tempLocalData.push(employeeDataObj); // Add to the copy
        }

        saveDataToFirebase('employeesData', tempLocalData)
            .then(() => {
                const action = isEditing ? 'mis à jour' : 'ajouté';
                alert(`Employé ${action}.`);
                // Reset form after successful save intention
                employeeForm.reset(); setTodaysDate(); updateConnectedUserFields();
                if(employeeEditIndexInput) employeeEditIndexInput.value = '';
                employeeForm.querySelector('button[type="submit"]').textContent = 'Ajouter Employé';
            })
            .catch(error => {
                 console.error('Failed to save employee data.');
                 // No revert needed as global vars were not touched
             });
    });

    if(learnerForm) learnerForm.addEventListener('submit', function (event) {
        event.preventDefault();
         if (!currentUser || currentUser.status !== 'Administrateur') {
             alert("Accès Refusé: Seuls les administrateurs peuvent gérer les apprenants."); return;
         }
        const editIndex = learnerEditIndexInput ? parseInt(learnerEditIndexInput.value, 10) : -1;
        const isEditing = editIndex > -1;
        if (!learnerNomInput || !learnerFiliereInput) { alert("Erreur interne: Champs apprenant manquants."); return; }
        const nom = learnerNomInput.value.trim(); const filiere = learnerFiliereInput.value.trim(); if (!nom || !filiere) { alert("Nom et filière requis."); return; }

        const ageValue = learnerAgeInput ? parseInt(learnerAgeInput.value) : null;
        const fraisDocsValue = learnerFraisDocumentsInput ? parseFloat(learnerFraisDocumentsInput.value) : 0;
        const tranche1Value = learnerTranche1Input ? parseFloat(learnerTranche1Input.value) : 0;
        const tranche2Value = learnerTranche2Input ? parseFloat(learnerTranche2Input.value) : 0;
        const tranche3Value = learnerTranche3Input ? parseFloat(learnerTranche3Input.value) : 0;
        const tranche4Value = learnerTranche4Input ? parseFloat(learnerTranche4Input.value) : 0;
         if (ageValue !== null && (isNaN(ageValue) || ageValue < 0)) { alert("L'âge doit être un nombre positif."); return; }
         if (isNaN(fraisDocsValue) || fraisDocsValue < 0 || isNaN(tranche1Value) || tranche1Value < 0 || isNaN(tranche2Value) || tranche2Value < 0 || isNaN(tranche3Value) || tranche3Value < 0 || isNaN(tranche4Value) || tranche4Value < 0) {
             alert("Frais et montants des tranches doivent être des nombres positifs ou zéro."); return;
         }

        const learnerDataObj = {
            nom, prenom: learnerPrenomInput?.value.trim() || '', age: ageValue,
            adresse: learnerAdresseInput?.value.trim() || '', lieuResidence: learnerLieuResidenceInput?.value.trim() || '',
            niveauEtudes: learnerNiveauEtudesInput?.value.trim() || '', situationMatrimoniale: learnerSituationMatrimonialeSelect?.value || '',
            pereNom: learnerPereNomInput?.value.trim() || '', perePrenom: learnerPerePrenomInput?.value.trim() || '',
            mereNom: learnerMereNomInput?.value.trim() || '', merePrenom: learnerMerePrenomInput?.value.trim() || '',
            filiere, dureeFormation: learnerDureeFormationInput?.value.trim() || '',
            fraisDocuments: fraisDocsValue, tranche1: tranche1Value, tranche2: tranche2Value, tranche3: tranche3Value, tranche4: tranche4Value,
            garantNom: learnerGarantNomInput?.value.trim() || '', garantPrenom: learnerGarantPrenomInput?.value.trim() || '',
            garantTelephone: learnerGarantTelephoneInput?.value.trim() || '', garantAdresse: learnerGarantAdresseInput?.value.trim() || ''
        };

         let originalDataBackup = null;
         let tempLocalData = [...learnersData]; // Work on copy

         if (isEditing) {
             if (editIndex >= tempLocalData.length) { alert("Erreur: Index apprenant invalide."); return; }
             originalDataBackup = JSON.parse(JSON.stringify(tempLocalData[editIndex]));
             learnerDataObj.paymentHistory = originalDataBackup.paymentHistory || [];
             learnerDataObj.recordedBy = originalDataBackup.recordedBy;
             learnerDataObj.lastModifiedBy = currentUser?.username || 'N/A';
             learnerDataObj.lastModifiedDate = new Date().toISOString();
             tempLocalData[editIndex] = learnerDataObj; // Update copy
         } else {
             learnerDataObj.recordedBy = currentUser?.username || 'N/A';
             tempLocalData.push(learnerDataObj); // Add to copy
         }

        saveDataToFirebase('learnersData', tempLocalData)
            .then(() => {
                 const action = isEditing ? 'mis à jour' : 'ajouté';
                 alert(`Apprenant ${action}.`);
                 // Reset form after successful save intention
                 learnerForm.reset(); updateConnectedUserFields(); setTodaysDate();
                 if(learnerEditIndexInput) learnerEditIndexInput.value = '';
                 learnerForm.querySelector('button[type="submit"]').textContent = 'Ajouter Apprenant';
            })
            .catch(error => {
                  console.error('Failed to save learner data.');
             });
    });

    if(mobileMoneyForm) mobileMoneyForm.addEventListener('submit', function (event) {
        event.preventDefault();
         if (!currentUser || !(currentUser.status === 'Administrateur' || currentUser.status === 'Editeur')) {
             alert("Accès Refusé: Permissions insuffisantes."); return;
         }
        const editIndex = mobileMoneyEditIndexInput ? parseInt(mobileMoneyEditIndexInput.value, 10) : -1;
        const isEditing = editIndex > -1;

         if (isEditing && currentUser.status === 'Editeur') {
             alert("Accès Refusé: Les éditeurs ne peuvent pas modifier."); return;
         }
        if (!mmDateInput || !mmAgentInput) { alert("Erreur interne: Champs Point MM manquants."); return; }
        const date = mmDateInput.value; const agent = mmAgentInput.value.trim(); if (!date || !agent) { alert("Date et Agent requis pour Point MM."); return; }

        const balanceMoov = parseFloat(mmBalanceMoovInput?.value) || 0; const balanceMTN = parseFloat(mmBalanceMtnInput?.value) || 0;
        const balanceCelttis = parseFloat(mmBalanceCelttisInput?.value) || 0; const balanceCash = parseFloat(mmBalanceCashInput?.value) || 0;
        const creditMoov = parseFloat(mmCreditMoovInput?.value) || 0; const creditMTN = parseFloat(mmCreditMtnInput?.value) || 0;
        const creditCelttis = parseFloat(mmCreditCelttisInput?.value) || 0; const perteTransfert = parseFloat(mmPerteTransfertInput?.value) || 0;
        const perteCredit = parseFloat(mmPerteCreditInput?.value) || 0;
        if (balanceMoov < 0 || balanceMTN < 0 || balanceCelttis < 0 || balanceCash < 0 || creditMoov < 0 || creditMTN < 0 || creditCelttis < 0 || perteTransfert < 0 || perteCredit < 0) {
            alert("Soldes, crédits, et pertes MM ne peuvent pas être négatifs."); return;
        }

        const transactionData = {
            date, agent, balanceMoov, balanceMTN, balanceCelttis, balanceCash,
            creditMoov, creditMTN, creditCelttis, perteTransfert, perteCredit
        };

         let originalDataBackup = null;
         let tempLocalData = [...mobileMoneyData]; // Work on copy

        if (isEditing) { // Admin Editing
            if (editIndex >= tempLocalData.length) { alert("Erreur: Index Point MM invalide."); return; }
             const existingEntryIndex = tempLocalData.findIndex((item, idx) => item.date === date && item.agent === agent && idx !== editIndex);
             if (existingEntryIndex > -1) { alert(`Modification impossible : un autre point existe déjà pour ${agent} à la date ${date}.`); return; }
            originalDataBackup = JSON.parse(JSON.stringify(tempLocalData[editIndex]));
            transactionData.recordedBy = originalDataBackup.recordedBy;
            transactionData.lastModifiedBy = currentUser?.username || 'N/A';
            transactionData.lastModifiedDate = new Date().toISOString();
            tempLocalData[editIndex] = transactionData; // Update copy
        } else { // Admin or Editor adds
            const existingEntryIndex = tempLocalData.findIndex(item => item.date === date && item.agent === agent);
            if (existingEntryIndex > -1) { alert(`Ajout impossible : point existe déjà pour ${agent} à la date ${date}. Modifiez l'entrée existante.`); return; }
            transactionData.recordedBy = currentUser?.username || 'N/A';
            tempLocalData.push(transactionData); // Add to copy
        }

        saveDataToFirebase('mobileMoneyData', tempLocalData)
            .then(() => {
                const action = isEditing ? 'mis à jour' : 'ajouté';
                alert(`Point Mobile Money ${action}.`);
                // Reset form after successful save intention
                mobileMoneyForm.reset(); setTodaysDate(); updateConnectedUserFields();
                if(mobileMoneyEditIndexInput) mobileMoneyEditIndexInput.value = '';
                mobileMoneyForm.querySelector('button[type="submit"]').textContent = 'Ajouter Point Journalier';
            })
            .catch(error => {
                 console.error('Failed to save mobile money data.');
             });
    });

    if(mmFournisseurForm) mmFournisseurForm.addEventListener('submit', function (event) {
        event.preventDefault();
         if (!currentUser || !(currentUser.status === 'Administrateur' || currentUser.status === 'Editeur')) {
             alert("Accès Refusé: Permissions insuffisantes."); return;
         }
        const editKey = mmFournisseurEditKeyInput?.value || '';
        const isEditing = !!editKey;
         if (isEditing && currentUser.status === 'Editeur') {
             alert("Accès Refusé: Les éditeurs ne peuvent pas modifier."); return;
         }

        const nom = mmFournisseurNomInput?.value.trim(); const prenom = mmFournisseurPrenomInput?.value.trim();
        const contact = mmFournisseurContactInput?.value.trim(); const montantFourni = parseFloat(mmFournisseurMontantInput?.value);
        const interet = parseFloat(mmFournisseurInteretInput?.value); const creditVendu = parseFloat(mmFournisseurVenduInput?.value) || 0;

        if (!nom) { alert("Nom fournisseur MM requis."); return; }
        if (isNaN(montantFourni) || montantFourni < 0) { alert("Montant Fourni doit être un nombre positif."); return; }
        if (creditVendu < 0) { alert("Crédit Vendu ne peut être négatif."); return; }
        if (!isNaN(interet) && interet < 0) { alert("Intérêt ne peut être négatif."); return; }

        const fournisseurDataObj = {
            nom, prenom, contact, montantFourni, interet: !isNaN(interet) ? interet : null, creditVendu
        };

        let existingIndex = -1;
        let isNameChangeDuringEdit = false;
        let originalDataBackup = null;
        let tempLocalData = [...mmFournisseursData]; // Work on copy

         if(isEditing) { // Admin Editing
             const [editNom, editPrenom] = editKey.split('_');
             existingIndex = tempLocalData.findIndex(f => f.nom === editNom && f.prenom === editPrenom);
             if (existingIndex > -1) {
                 originalDataBackup = JSON.parse(JSON.stringify(tempLocalData[existingIndex]));
                  if (nom !== editNom || prenom !== editPrenom) { isNameChangeDuringEdit = true; }
                  fournisseurDataObj.recordedBy = originalDataBackup.recordedBy;
                  fournisseurDataObj.lastModifiedBy = currentUser?.username || 'N/A';
                  fournisseurDataObj.lastModifiedDate = new Date().toISOString();
             } else { alert("Erreur: Fournisseur à modifier non trouvé."); return; }
         } else { // Adding
             existingIndex = tempLocalData.findIndex(f => f.nom === nom && f.prenom === prenom);
             if (existingIndex > -1) { alert(`Fournisseur ${nom} ${prenom} existe déjà. Modifiez via le tableau.`); return; }
             fournisseurDataObj.recordedBy = currentUser?.username || 'N/A';
         }

         if (isNameChangeDuringEdit) { // Admin Renaming
             const duplicateCheck = tempLocalData.findIndex(f => f.nom === nom && f.prenom === prenom);
             if (duplicateCheck > -1) {
                 alert(`Impossible de renommer : le fournisseur ${nom} ${prenom} existe déjà.`);
                 const [origN, origP] = editKey.split('_'); mmFournisseurNomInput.value = origN; mmFournisseurPrenomInput.value = origP; return;
             }
             tempLocalData.splice(existingIndex, 1); // Remove old entry from copy
             tempLocalData.push(fournisseurDataObj); // Add new one to copy
         } else if (isEditing) { // Admin Updating existing (no name change)
             tempLocalData[existingIndex] = fournisseurDataObj; // Update copy
         } else { // Admin or Editor Adding new
             tempLocalData.push(fournisseurDataObj); // Add to copy
         }

        saveDataToFirebase('mmFournisseursData', tempLocalData)
             .then(() => {
                 const action = isEditing ? (isNameChangeDuringEdit ? 'renommé/mis à jour' : 'mis à jour') : 'ajouté';
                 alert(`Fournisseur ${nom} ${prenom} ${action}.`);
                 // Reset form after successful save intention
                 mmFournisseurForm.reset(); updateConnectedUserFields(); setTodaysDate();
                 if(mmFournisseurEditKeyInput) mmFournisseurEditKeyInput.value = '';
                 mmFournisseurForm.querySelector('button[type="submit"]').textContent = 'Ajouter / Mettre à Jour Fournisseur';
             })
             .catch(error => {
                 console.error('Failed to save MM Fournisseur data.');
             });
    });

    if(clientProfileForm) clientProfileForm.addEventListener('submit', function (event) {
        event.preventDefault();
         if (!currentUser || currentUser.status !== 'Administrateur') {
             alert("Accès Refusé: Seuls les administrateurs peuvent gérer les profils client."); return;
         }
        const editKey = clientProfileEditKeyInput?.value || '';
        const isEditing = !!editKey;
        const nom = clientProfileNomInput?.value.trim(); const prenom = clientProfilePrenomInput?.value.trim();
        const adresse = clientProfileAdresseInput?.value.trim(); const contact = clientProfileContactInput?.value.trim();
        const statut = clientProfileStatutInput?.value.trim();
        if (!nom) { alert("Nom client requis pour profil."); return; }

        const profileDataObj = { nom, prenom, adresse, contact, statut };
        const newFullName = `${nom} ${prenom}`.trim();
        let existingIndex = -1;
        let isNameChangeDuringEdit = false;
        let originalFullName = '';
        let originalProfileBackup = null;
        let tempProfilesData = [...clientProfilesData]; // Work on profile copy
        let tempCreditorsData = [...creditorsData]; // Work on creditor copy
        let creditorsNeedUpdate = false;

         if(isEditing) { // Admin Editing
             const [editNom, editPrenom] = editKey.split('_');
             originalFullName = `${editNom} ${editPrenom}`.trim();
             existingIndex = tempProfilesData.findIndex(p => p.nom === editNom && p.prenom === editPrenom);
             if (existingIndex > -1) {
                 originalProfileBackup = JSON.parse(JSON.stringify(tempProfilesData[existingIndex]));
                 if (newFullName !== originalFullName) { isNameChangeDuringEdit = true; }
                 profileDataObj.recordedBy = originalProfileBackup.recordedBy;
                 profileDataObj.lastModifiedBy = currentUser?.username || 'N/A';
                 profileDataObj.lastModifiedDate = new Date().toISOString();
             } else { alert("Erreur: Profil à modifier non trouvé."); return; }
         } else { // Adding
             existingIndex = tempProfilesData.findIndex(p => p.nom === nom && p.prenom === prenom);
             if (existingIndex > -1) { alert(`Profil ${nom} ${prenom} existe déjà. Modifiez via le tableau.`); return; }
             profileDataObj.recordedBy = currentUser?.username || 'N/A';
         }

         if (isNameChangeDuringEdit) { // Admin Renaming
             const duplicateCheck = tempProfilesData.findIndex(p => p.nom === nom && p.prenom === prenom);
             if (duplicateCheck > -1) {
                 alert(`Impossible de renommer : le profil ${nom} ${prenom} existe déjà.`);
                 const [origN, origP] = editKey.split('_'); clientProfileNomInput.value = origN; clientProfilePrenomInput.value = origP; return;
             }
             // Update creditors copy
             tempCreditorsData.forEach((cred, index) => { if (cred.name === originalFullName) { tempCreditorsData[index].name = newFullName; creditorsNeedUpdate = true; } });
             // Update profiles copy
             tempProfilesData.splice(existingIndex, 1); // Remove old from copy
             tempProfilesData.push(profileDataObj); // Add new to copy
         } else if (isEditing) { // Admin Updating existing (no name change)
             tempProfilesData[existingIndex] = profileDataObj; // Update copy
         } else { // Adding new
             tempProfilesData.push(profileDataObj); // Add to copy
         }

         const savePromises = [saveDataToFirebase('clientProfilesData', tempProfilesData)];
         if (creditorsNeedUpdate) {
             savePromises.push(saveDataToFirebase('creditorsData', tempCreditorsData));
         }

         Promise.all(savePromises)
            .then(() => {
                const action = isEditing ? (isNameChangeDuringEdit ? 'renommé' : 'mis à jour') : 'ajouté';
                alert(`Profil client ${nom} ${prenom} ${action}.${creditorsNeedUpdate ? ' Transactions crédit associées mises à jour.' : ''}`);
                // Reset form after successful save intention
                clientProfileForm.reset(); updateConnectedUserFields(); setTodaysDate();
                if(clientProfileEditKeyInput) clientProfileEditKeyInput.value = '';
                clientProfileForm.querySelector('button[type="submit"]').textContent = 'Ajouter / Mettre à Jour Profil';
            })
            .catch(error => {
                 console.error('Failed to save client profile/creditor data.');
             });
    });

    if(creditorForm) creditorForm.addEventListener('submit', function (event) {
        event.preventDefault();
        if (!currentUser || currentUser.status !== 'Administrateur') {
            alert("Accès Refusé: Seuls les administrateurs peuvent gérer les crédits client."); return;
        }

        if (!creditorDateInput || !creditorNameSelect || !creditorDesignationInput || !creditorAmountPaidInput) { alert("Erreur interne: Champs Transaction Crédit manquants."); return; }
        const date = creditorDateInput.value; const name = creditorNameSelect.value; const designation = creditorDesignationInput.value.trim();
        const quantity = creditorQuantityInput?.value ? (parseFloat(creditorQuantityInput.value) || null) : null;
        const unitPrice = creditorUnitPriceInput?.value ? (parseFloat(creditorUnitPriceInput.value) || null) : null;
        const totalAmountDueEntered = parseFloat(creditorTotalAmountDueInput.value);
        const amountPaidNow = parseFloat(creditorAmountPaidInput.value);
        const dueDate = creditorDueDateInput?.value || '';
        const recordedBy = currentUser?.username || 'N/A';

        if (!date || !name || !designation) { alert("Date, Client et Désignation requis."); return; }
        if (isNaN(amountPaidNow) || amountPaidNow < 0) { alert("Montant Payé doit être un nombre positif ou zéro."); return; }

        let tempLocalData = [...creditorsData]; // Work on copy
        let dataChanged = false;

        try {
            // Find index in the *current global* data to check if it exists
            const existingCreditorIndex = creditorsData.findIndex(c =>
                c.name === name && c.designation === designation && ((c.totalAmountDue || 0) - (c.amountPaidTotal || 0) > 0.005)
            );

            if (existingCreditorIndex > -1) { // Adding payment to existing credit
                // Get the corresponding item from the *copy* to modify it
                 const existingCreditorInCopy = tempLocalData[existingCreditorIndex];
                 if (!existingCreditorInCopy) throw new Error("Incohérence interne: crédit non trouvé dans la copie locale.");

                 const currentRemaining = (existingCreditorInCopy.totalAmountDue || 0) - (existingCreditorInCopy.amountPaidTotal || 0);
                 if (!isNaN(totalAmountDueEntered) && totalAmountDueEntered > 0 && Math.abs(totalAmountDueEntered - existingCreditorInCopy.totalAmountDue) > 0.01) {
                     console.warn(`Montant Total Dû entré (${formatAmount(totalAmountDueEntered)}) ignoré pour paiement.`);
                 }
                 if (amountPaidNow > currentRemaining + 0.005) {
                     throw new Error(`Paiement (${formatAmount(amountPaidNow)}) dépasse le solde restant (${formatAmount(currentRemaining)}).`);
                 }
                 existingCreditorInCopy.amountPaidTotal = (existingCreditorInCopy.amountPaidTotal || 0) + amountPaidNow;
                 existingCreditorInCopy.lastPaymentDate = date;
                 existingCreditorInCopy.lastPaymentBy = recordedBy;
                 if (dueDate && dueDate !== existingCreditorInCopy.dueDate) existingCreditorInCopy.dueDate = dueDate;
                 if (!existingCreditorInCopy.paymentHistory) existingCreditorInCopy.paymentHistory = [];
                 existingCreditorInCopy.paymentHistory.push({ date, amount: amountPaidNow, recordedBy });
                 alert(`Paiement de ${formatAmount(amountPaidNow)} enregistré (préparation sauvegarde) pour ${name} - ${designation}.\nNouveau solde: ${formatAmount(existingCreditorInCopy.totalAmountDue - existingCreditorInCopy.amountPaidTotal)}`);
                 dataChanged = true;
            } else { // Creating a new credit transaction
                 let finalTotalDue;
                 if ((isNaN(totalAmountDueEntered) || totalAmountDueEntered <= 0) && quantity !== null && unitPrice !== null && quantity > 0 && unitPrice >= 0) {
                      finalTotalDue = quantity * unitPrice;
                      if (finalTotalDue <= 0) throw new Error("Montant Total Dû calculé doit être > 0.");
                      creditorTotalAmountDueInput.value = formatAmount(finalTotalDue);
                 } else if (!isNaN(totalAmountDueEntered) && totalAmountDueEntered > 0) {
                     finalTotalDue = totalAmountDueEntered;
                      if (quantity !== null && unitPrice !== null && quantity > 0 && unitPrice >= 0) {
                          const calculatedTotal = quantity * unitPrice;
                          if (Math.abs(calculatedTotal - finalTotalDue) > 0.01) {
                              if (!confirm(`Total Dû entré (${formatAmount(finalTotalDue)}) est différent du calcul Qté*PU (${formatAmount(calculatedTotal)}). Continuer avec ${formatAmount(finalTotalDue)} ?`)) return;
                          }
                      }
                 } else {
                     throw new Error("Montant Total Dû > 0 requis (entré directement ou via Qté*PU) pour nouvelle transaction.");
                 }
                 if (amountPaidNow > finalTotalDue + 0.005) {
                     throw new Error(`Montant Payé (${formatAmount(amountPaidNow)}) dépasse le Total Dû (${formatAmount(finalTotalDue)}).`);
                 }
                 // Check for similar sold credits in global data before adding to temp data
                  const similarSoldCreditorExists = creditorsData.some(c =>
                      c.name === name && c.designation === designation && ((c.totalAmountDue || 0) - (c.amountPaidTotal || 0) <= 0.005)
                  );
                  if (similarSoldCreditorExists) {
                      if (!confirm(`Un crédit similaire déjà soldé existe pour ${name} - "${designation}". Voulez-vous créer une NOUVELLE transaction de crédit ?`)) {
                          return; // Cancel operation
                      }
                  }
                 const newCreditor = {
                     date, name, designation, quantity, unitPrice, totalAmountDue: finalTotalDue,
                     amountPaidTotal: amountPaidNow, lastPaymentDate: date, dueDate: dueDate || null,
                     recordedBy: recordedBy,
                     paymentHistory: [{ date, amount: amountPaidNow, recordedBy }]
                 };
                 tempLocalData.push(newCreditor); // Add to copy
                 alert(`Nouveau crédit créé (préparation sauvegarde) pour ${name} - "${designation}".\nDû: ${formatAmount(finalTotalDue)}, Payé: ${formatAmount(amountPaidNow)}, Restant: ${formatAmount(finalTotalDue - amountPaidNow)}`);
                 dataChanged = true;
            }

            if (dataChanged) {
                saveDataToFirebase('creditorsData', tempLocalData)
                    .then(() => {
                        console.log('Creditor data saved to Firebase.');
                        // Reset form after successful save intention
                        creditorForm.reset(); populateClientSelect();
                        setTodaysDate(); updateConnectedUserFields();
                    })
                    .catch(error => {
                         console.error('Failed to save creditor data.');
                    });
            }
        } catch (error) {
            alert(`Erreur Gestion Crédit Client : ${error.message}`);
        }
    });

    if(debtForm) debtForm.addEventListener('submit', function (event) {
        event.preventDefault();
         if (!currentUser || currentUser.status !== 'Administrateur') {
             alert("Accès Refusé: Seuls les administrateurs peuvent gérer les dettes/prêts."); return;
         }
        const editIndex = debtEditIndexInput ? parseInt(debtEditIndexInput.value, 10) : -1;
        const isEditing = editIndex > -1;
        if (!debtDateInput || !debtTypeSelect || !debtNameInput || !debtDescriptionInput || !debtAmountInput || !debtStatusSelect) { alert("Erreur interne: Champs Dette/Prêt manquants."); return; }

        const date = debtDateInput.value; const type = debtTypeSelect.value; const name = debtNameInput.value.trim();
        const description = debtDescriptionInput.value.trim(); const amount = parseFloat(debtAmountInput.value);
        const dueDate = debtDueDateInput?.value || ''; const status = debtStatusSelect.value;
        if (!date || !type || !name || !description || isNaN(amount) || amount <= 0 || !status) { alert("Veuillez remplir correctement tous les champs Dette/Prêt (Montant doit être > 0)."); return; }

        const debtItemData = { date, type, name, description, amount, dueDate, status };

         let originalDataBackup = null;
         let tempLocalData = [...debtData]; // Work on copy

         if (isEditing) {
             if (editIndex >= tempLocalData.length) { alert("Erreur: Index Dette/Prêt invalide."); return; }
             originalDataBackup = JSON.parse(JSON.stringify(tempLocalData[editIndex]));
             debtItemData.recordedBy = originalDataBackup.recordedBy;
             debtItemData.lastModifiedBy = currentUser?.username || 'N/A';
             debtItemData.lastModifiedDate = new Date().toISOString();
             tempLocalData[editIndex] = debtItemData; // Update copy
         } else {
             const isDuplicate = tempLocalData.some(d => d.date === date && d.type === type && d.name === name && d.description === description && d.amount === amount);
             if (isDuplicate) { if (!confirm("Une entrée très similaire existe déjà. Voulez-vous l'ajouter quand même ?")) { return; } }
             debtItemData.recordedBy = currentUser?.username || 'N/A';
             tempLocalData.push(debtItemData); // Add to copy
         }

        saveDataToFirebase('debtData', tempLocalData)
            .then(() => {
                const action = isEditing ? 'mise à jour' : 'ajoutée';
                alert(`Dette/Prêt ${action}.`);
                // Reset form after successful save intention
                debtForm.reset(); setTodaysDate(); updateConnectedUserFields();
                if(debtEditIndexInput) debtEditIndexInput.value = '';
                debtForm.querySelector('button[type="submit"]').textContent = 'Ajouter Dette/Prêt';
            })
            .catch(error => {
                 console.error('Failed to save debt data.');
             });
    });

    if(permissionEmployeeForm) permissionEmployeeForm.addEventListener('submit', function (event) {
        event.preventDefault();
         if (!currentUser || currentUser.status !== 'Administrateur') {
             alert("Accès Refusé: Seuls les administrateurs peuvent gérer les permissions."); return;
         }
        const requestDate = permEmpReqDateInput?.value; const name = permEmpNameSelect?.value;
        const permissionDateOrPeriod = permEmpDateInput?.value.trim(); const reason = permEmpReasonTextarea?.value.trim();
        if (!requestDate || !name || !permissionDateOrPeriod || !reason) { alert("Veuillez remplir tous les champs pour la demande de permission."); return; }
        const newPermission = {
            requestDate, name, permissionDateOrPeriod, reason, status: 'En attente',
            recordedBy: currentUser?.username || 'N/A'
        };
        let tempLocalData = [...employeePermissionsData]; // Work on copy
        tempLocalData.push(newPermission); // Add to copy

        saveDataToFirebase('employeePermissionsData', tempLocalData)
            .then(() => {
                alert(`Demande de permission ajoutée pour ${name}.`);
                // Reset form after successful save intention
                permissionEmployeeForm.reset(); setTodaysDate(); updateConnectedUserFields();
            })
            .catch(error => { console.error('Failed to save employee permission.'); });
    });

    if(permissionLearnerForm) permissionLearnerForm.addEventListener('submit', function (event) {
         event.preventDefault();
          if (!currentUser || currentUser.status !== 'Administrateur') {
              alert("Accès Refusé: Seuls les administrateurs peuvent gérer les permissions."); return;
          }
         const requestDate = permLrnReqDateInput?.value; const name = permLrnNameSelect?.value;
         const permissionDateOrPeriod = permLrnDateInput?.value.trim(); const reason = permLrnReasonTextarea?.value.trim();
         if (!requestDate || !name || !permissionDateOrPeriod || !reason) { alert("Veuillez remplir tous les champs pour la demande de permission."); return; }
         const newPermission = {
             requestDate, name, permissionDateOrPeriod, reason, status: 'En attente',
             recordedBy: currentUser?.username || 'N/A'
         };
         let tempLocalData = [...learnerPermissionsData]; // Work on copy
         tempLocalData.push(newPermission); // Add to copy

         saveDataToFirebase('learnerPermissionsData', tempLocalData)
             .then(() => {
                 alert(`Demande de permission ajoutée pour ${name}.`);
                 // Reset form after successful save intention
                 permissionLearnerForm.reset(); setTodaysDate(); updateConnectedUserFields();
             })
             .catch(error => { console.error('Failed to save learner permission.'); });
    });

    if(adminForm) adminForm.addEventListener('submit', function (event) {
        event.preventDefault();
         if (!currentUser || currentUser.status !== 'Administrateur') {
             alert("Accès Refusé: Seuls les administrateurs peuvent gérer les utilisateurs."); return;
         }
        const editKey = adminEditKeyInput?.value || ''; // This is the username being edited
        const isEditing = !!editKey;
        const username = adminUsernameInput?.value.trim();
        const post = adminPostInput?.value.trim();
        const password = adminPasswordInput?.value; // Get password entered, might be empty
        const status = adminStatusSelect?.value;
        const operatedBy = currentUser?.username || 'N/A';

        if (!username) { alert("Le nom d'utilisateur est requis."); adminUsernameInput?.focus(); return; }
        if (!status) { alert("Le statut est requis."); adminStatusSelect?.focus(); return; }

        let passwordToSave = undefined;
        let existingPassword = null;
        const editingUserIndex = isEditing ? adminData.findIndex(u => u.username === editKey) : -1;

        if (isEditing && editingUserIndex > -1) {
            existingPassword = adminData[editingUserIndex].password;
        }

        // Determine the password to save
        if (password) { // If a new password was entered
            passwordToSave = password; // Use the new password
            console.warn(`SECURITY RISK: Saving/Updating password directly for user '${username}'. Use Firebase Auth.`);
        } else if (isEditing) { // If editing and password field is empty
            passwordToSave = existingPassword; // Keep the existing password
        } else if (!isEditing && !password) { // If adding new user and password field is empty
            alert("Le mot de passe est requis pour un nouvel utilisateur."); adminPasswordInput?.focus(); return;
        }

        // Build the user data object
        const userData = {
            username, post: post || '', status,
            ...(passwordToSave !== undefined && { password: passwordToSave }), // Only include password if defined
            lastModifiedBy: operatedBy, lastModifiedDate: new Date().toISOString()
        };

        const potentialDuplicateIndex = adminData.findIndex(u => u.username === username);
        let originalDataBackup = null;
        if (isEditing && editingUserIndex > -1) { originalDataBackup = JSON.parse(JSON.stringify(adminData[editingUserIndex])); }

        let tempLocalData = [...adminData]; // Work on copy
        let actionAlert = '';

        // Logic for Add / Edit / Rename on the copy
        if (isEditing && editKey === username) { // Editing existing user, username unchanged
            if (editingUserIndex > -1) {
                userData.recordedBy = originalDataBackup.recordedBy; // Keep original recorder
                tempLocalData[editingUserIndex] = { ...originalDataBackup, ...userData }; // Merge data in copy
                actionAlert = `Utilisateur '${username}' mis à jour.`;
            } else { alert(`Erreur : Utilisateur à modifier ('${editKey}') non trouvé.`); return; }
        } else if (isEditing && editKey !== username) { // Editing existing user, username HAS changed (Rename)
            if (potentialDuplicateIndex > -1) {
                alert(`Erreur : Le nouveau nom d'utilisateur '${username}' existe déjà.`);
                adminUsernameInput.value = editKey; adminUsernameInput.focus(); return;
            }
            if (editingUserIndex > -1) {
                 userData.recordedBy = originalDataBackup.recordedBy; // Keep original recorder from old entry
                 tempLocalData.splice(editingUserIndex, 1); // Remove old entry from copy
                 tempLocalData.push(userData); // Add new entry with new username to copy
                 actionAlert = `Utilisateur renommé de '${editKey}' en '${username}' et mis à jour.`;
            } else { alert(`Erreur : Utilisateur à modifier ('${editKey}') non trouvé.`); return; }
        } else { // Adding new user
            if (potentialDuplicateIndex > -1) {
                alert(`Erreur : Le nom d'utilisateur '${username}' existe déjà.`); adminUsernameInput.focus(); return;
            }
            userData.recordedBy = operatedBy; // Recorder is the current operator
            tempLocalData.push(userData); // Add to copy
            actionAlert = `Utilisateur '${username}' ajouté.`;
        }

        saveDataToFirebase('adminData', tempLocalData)
            .then(() => {
                alert(actionAlert);
                // Reset form after successful save intention
                adminForm.reset(); updateConnectedUserFields(); setTodaysDate();
                if(adminEditKeyInput) adminEditKeyInput.value = '';
                 adminPasswordInput.placeholder = "Entrer pour définir/modifier";
                 adminForm.querySelector('button[type="submit"]').textContent = 'Ajouter / Mettre à Jour Utilisateur';
            })
            .catch(error => {
                 console.error('Failed to save admin data.');
             });
    });


    // --- Event Listeners for Show/Hide Details ---
    const addToggleListener = (button, container) => {
        if(button && container) {
             // Prevent adding multiple listeners if initializeAppUI is called multiple times
             if (!button._hasToggleListener) {
                 button.addEventListener('click', () => toggleVisibility(container));
                 button._hasToggleListener = true;
             }
        }
    };
    addToggleListener(showSupplyListButton, supplyListContainer);
    addToggleListener(showStockDetailsButton, stockDetailsContainer);
    addToggleListener(showEmployeesDetailsButton, employeesDetailsContainer);
    addToggleListener(showLearnersDetailsButton, learnersDetailsContainer);
    addToggleListener(showMobileMoneyDetailsButton, mobileMoneyDetailsContainer);
    addToggleListener(showMmFournisseursDetailsButton, mmFournisseursDetailsContainer);
    addToggleListener(showClientProfilesButton, clientProfilesContainer);
    addToggleListener(showCreditorsDetailsButton, creditorsDetailsContainer);
    addToggleListener(showDebtDetailsButton, debtDetailsContainer);
    addToggleListener(showReportDetailsButton, reportDetailsContainer);
    addToggleListener(showEmployeePermissionsButton, employeePermissionsContainer);
    addToggleListener(showLearnerPermissionsButton, learnerPermissionsContainer);
    addToggleListener(showAdminUsersButton, adminUsersContainer);

    const addSalesToggleListener = (button, container) => {
        if(button && container) {
             if (!button._hasSalesToggleListener) {
                 button.addEventListener('click', () => toggleSalesSubSectionVisibility(container));
                 button._hasSalesToggleListener = true;
             }
        }
    };
    addSalesToggleListener(showSalesDetailsButton, salesDetailsContainer);
    addSalesToggleListener(showMaterielElectriqueDetailsButton, materielElectriqueDetailsContainer);
    addSalesToggleListener(showExpensesDetailsButton, expensesDetailsContainer);
    addSalesToggleListener(showOthersDetailsButton, othersDetailsContainer);


    // --- Event Listeners for Main Section Visibility ---
    const allMainSections = [supplySection, salesSection, employeesSection, learnersSection, mobileMoneySection, creditorsSection, debtSection, reportSection, invoiceGeneratorSection, adminSection].filter(Boolean);
    const addSectionToggleListener = (button, sectionToShow) => {
        if (button) {
             if (!button._hasSectionToggleListener) {
                 button.addEventListener('click', () => {
                     if (button.style.display === 'none') {
                          console.warn(`Tentative d'accès à une section non autorisée (${sectionToShow?.id}) via un bouton caché.`);
                          return;
                      }
                     setSectionVisibility(sectionToShow, allMainSections.filter(s => s !== sectionToShow));
                 });
                 button._hasSectionToggleListener = true;
             }
        }
    };
    addSectionToggleListener(showSupplySectionButton, supplySection);
    addSectionToggleListener(showSalesSectionButton, salesSection);
    addSectionToggleListener(showEmployeesSectionButton, employeesSection);
    addSectionToggleListener(showLearnersSectionButton, learnersSection);
    addSectionToggleListener(showMobileMoneySectionButton, mobileMoneySection);
    addSectionToggleListener(showCreditorsSectionButton, creditorsSection);
    addSectionToggleListener(showDebtSectionButton, debtSection);
    addSectionToggleListener(showAdminSectionButton, adminSection);
    addSectionToggleListener(showReportSectionButton, reportSection);
    addSectionToggleListener(generateInvoiceButton, invoiceGeneratorSection);


    // --- Event Listeners for Auto Calculations ---
    const addCalculationListener = (input, func) => {
        if (input && !input._hasCalcListener) {
            input.addEventListener('input', func);
            input._hasCalcListener = true;
        }
    };
    addCalculationListener(supplyQuantityInput, () => calculateTotalAmount(supplyQuantityInput, supplyUnitPriceInput, supplyTotalAmountInput));
    addCalculationListener(supplyUnitPriceInput, () => calculateTotalAmount(supplyQuantityInput, supplyUnitPriceInput, supplyTotalAmountInput));
    addCalculationListener(saleQuantityInput, () => calculateTotalAmount(saleQuantityInput, saleUnitPriceInput, saleTotalAmountInput));
    addCalculationListener(saleUnitPriceInput, () => calculateTotalAmount(saleQuantityInput, saleUnitPriceInput, saleTotalAmountInput));
    addCalculationListener(meQuantityInput, () => calculateTotalAmount(meQuantityInput, meUnitPriceInput, meTotalAmountInput));
    addCalculationListener(meUnitPriceInput, () => calculateTotalAmount(meQuantityInput, meUnitPriceInput, meTotalAmountInput));
    addCalculationListener(creditorQuantityInput, calculateCreditorTotalAmount);
    addCalculationListener(creditorUnitPriceInput, calculateCreditorTotalAmount);
    if(operationTypeSelect && !operationTypeSelect._hasChangeListener) {
        operationTypeSelect.addEventListener('change', handleOperationTypeChange);
        operationTypeSelect._hasChangeListener = true;
    }
    if(creditorNameSelect && !creditorNameSelect._hasChangeListener) {
        creditorNameSelect.addEventListener('change', function() {
            const selectedOption = this.options[this.selectedIndex];
            if (creditorContactInput) { creditorContactInput.value = selectedOption?.dataset?.contact || ''; }
        });
        creditorNameSelect._hasChangeListener = true;
    }

    // --- Multi-Item Invoice Calculation & Item Management ---
    function calculateInvoiceTotal() { /* ... Function remains the same ... */ if (!invoiceItemsContainer || !invoiceGenTotalAmountInput || !invoiceGenTotalWordsInput) return; let grandTotal = 0; const itemRows = invoiceItemsContainer.querySelectorAll('.invoice-item-row'); itemRows.forEach(row => { const quantityInput = row.querySelector('.item-quantity'); const unitPriceInput = row.querySelector('.item-unit-price'); const quantity = parseFloat(quantityInput?.value) || 0; const unitPrice = parseFloat(unitPriceInput?.value) || 0; grandTotal += quantity * unitPrice; }); invoiceGenTotalAmountInput.value = formatAmount(grandTotal); invoiceGenTotalWordsInput.value = numberToWordsFrench(grandTotal); }
    function addInvoiceItemRow() { /* ... Function remains the same ... */ if (!currentUser || !(currentUser.status === 'Administrateur' || currentUser.status === 'Editeur')) return; if (!invoiceItemsContainer) return; const newRow = document.createElement('div'); newRow.classList.add('form-row', 'invoice-item-row'); const currentIndex = invoiceItemIndex++; newRow.innerHTML = ` <div style="flex-basis: 40%;"> <label for="invoice-gen-designation-${currentIndex}">Désignation:</label> <input type="text" id="invoice-gen-designation-${currentIndex}" class="item-designation" required> </div> <div> <label for="invoice-gen-quantity-${currentIndex}">Quantité:</label> <input type="number" id="invoice-gen-quantity-${currentIndex}" class="item-quantity" min="0" step="any" required> </div> <div> <label for="invoice-gen-unit-price-${currentIndex}">Prix Unitaire:</label> <input type="number" id="invoice-gen-unit-price-${currentIndex}" class="item-unit-price" min="0" step="any" required> </div> <div style="display: flex; align-items: flex-end;"> <button type="button" class="action-btn delete-btn remove-invoice-item-btn" title="Supprimer Ligne" style="margin-bottom: 2px;">❌</button> </div>`; invoiceItemsContainer.appendChild(newRow); const addedInputs = newRow.querySelectorAll('.item-quantity, .item-unit-price'); addedInputs.forEach(input => input.addEventListener('input', calculateInvoiceTotal)); calculateInvoiceTotal(); newRow.querySelector('.item-designation')?.focus(); const removeBtn = newRow.querySelector('.remove-invoice-item-btn'); if (removeBtn && currentUser && (currentUser.status === 'Administrateur' || currentUser.status === 'Editeur')) { removeBtn.disabled = false; } }

    if (addInvoiceItemButton && !addInvoiceItemButton._hasClickListener) {
        addInvoiceItemButton.addEventListener('click', addInvoiceItemRow);
        addInvoiceItemButton._hasClickListener = true;
    }

    if (invoiceItemsContainer && !invoiceItemsContainer._hasClickListener) {
        invoiceItemsContainer.addEventListener('click', function(event) {
            if (event.target.classList.contains('remove-invoice-item-btn')) {
                if (!currentUser || !(currentUser.status === 'Administrateur' || currentUser.status === 'Editeur')) return;
                const rowToRemove = event.target.closest('.invoice-item-row');
                 if (invoiceItemsContainer.querySelectorAll('.invoice-item-row').length <= 1) { alert("Vous devez avoir au moins une ligne d'article."); return; }
                if (rowToRemove) { rowToRemove.remove(); calculateInvoiceTotal(); }
            }
        });
        invoiceItemsContainer.addEventListener('input', function(event) {
            if (event.target.classList.contains('item-quantity') || event.target.classList.contains('item-unit-price')) { calculateInvoiceTotal(); }
        });
        invoiceItemsContainer._hasClickListener = true; // Mark container listener added
    }

    function initializeInvoiceForm() {
        if (invoiceItemsContainer) { invoiceItemsContainer.innerHTML = ''; addInvoiceItemRow(); }
        else { console.error("Invoice items container not found."); return; }
        if(invoiceGenDateInput && !invoiceGenDateInput.value) invoiceGenDateInput.value = new Date().toISOString().split('T')[0];
        if(invoiceGenNumberInput) invoiceGenNumberInput.value = generateInvoiceNumber();
        calculateInvoiceTotal();
    }


    // --- Event Listeners for Print/Export ---
    const addPrintListener = (button, containerId) => {
         if (button && !button._hasPrintListener) {
             button.addEventListener('click', () => printSpecificTable(containerId));
             button._hasPrintListener = true;
         }
    };
    addPrintListener(printSupplyButton, 'supply-list-container');
    addPrintListener(printStockButton, 'stock-details-container');
    addPrintListener(printSalesButton, 'sales-details-container');
    addPrintListener(printMaterielElectriqueButton, 'materiel-electrique-details-container');
    addPrintListener(printExpensesButton, 'expenses-details-container');
    addPrintListener(printOthersButton, 'others-details-container');
    addPrintListener(printEmployeesButton, 'employees-details-container');
    addPrintListener(printLearnersButton, 'learners-details-container');
    addPrintListener(printMobileMoneyButton, 'mobile-money-details-container');
    addPrintListener(printMmFournisseursButton, 'mm-fournisseurs-details-container');
    addPrintListener(printClientProfilesButton, 'client-profiles-container');
    addPrintListener(printCreditorsButton, 'creditors-details-container');
    addPrintListener(printDebtButton, 'debt-details-container');
    addPrintListener(printReportButton, 'report-details-container');
    addPrintListener(printEmployeePermissionsButton, 'employee-permissions-container');
    addPrintListener(printLearnerPermissionsButton, 'learner-permissions-container');
    addPrintListener(printAdminUsersButton, 'admin-users-container');


    const addExcelListener = (button, tableId, fileName) => {
        if (button && !button._hasExcelListener) {
            button.addEventListener('click', () => exportToExcel(tableId, fileName));
            button._hasExcelListener = true;
        } else if (button && !document.getElementById(tableId)) {
             console.warn(`Excel export button found, but table #${tableId} not found.`);
        }
    };
    addExcelListener(exportSupplyExcelButton, 'supply-table', 'Approvisionnements.xlsx');
    addExcelListener(exportStockExcelButton, 'stock-table', 'Etat_Stocks.xlsx');
    addExcelListener(exportSalesExcelButton, 'sales-table', 'Ventes_Papeterie.xlsx');
    addExcelListener(exportMaterielElectriqueExcelButton, 'materiel-electrique-table', 'Ventes_Mat_Electrique.xlsx');
    addExcelListener(exportExpensesExcelButton, 'expenses-table', 'Depenses.xlsx');
    addExcelListener(exportOthersExcelButton, 'others-table', 'Operations_Diverses.xlsx');
    addExcelListener(exportEmployeesExcelButton, 'employees-table', 'Employes.xlsx');
    addExcelListener(exportLearnersExcelButton, 'learners-table', 'Apprenants.xlsx');
    addExcelListener(exportMobileMoneyExcelButton, 'mobile-money-table', 'Mobile_Money_Points.xlsx');
    addExcelListener(exportMmFournisseursExcelButton, 'mm-fournisseurs-table', 'Mobile_Money_Fournisseurs.xlsx');
    addExcelListener(exportClientProfilesExcelButton, 'client-profiles-table', 'Profils_Clients.xlsx');
    addExcelListener(exportCreditorsExcelButton, 'creditors-table', 'Credits_Clients_Transactions.xlsx');
    addExcelListener(exportDebtExcelButton, 'debt-table', 'Dettes_Prets_Entreprise.xlsx');
    addExcelListener(exportReportExcelButton, 'report-table', 'Bilan_Genere.xlsx');
    addExcelListener(exportEmployeePermissionsExcelButton, 'employee-permissions-table', 'Permissions_Employes.xlsx');
    addExcelListener(exportLearnerPermissionsExcelButton, 'learner-permissions-table', 'Permissions_Apprenants.xlsx');
    addExcelListener(exportAdminUsersExcelButton, 'admin-table', 'Utilisateurs.xlsx');

    const addPdfListener = (button, tableId, fileName) => {
        if (button && !button._hasPdfListener) {
            button.addEventListener('click', () => exportToPdf(tableId, fileName));
            button._hasPdfListener = true;
        } else if (button && !document.getElementById(tableId)) {
             console.warn(`PDF export button found, but table #${tableId} not found.`);
        }
    };
    addPdfListener(exportSupplyPdfButton, 'supply-table', 'Approvisionnements.pdf');
    addPdfListener(exportStockPdfButton, 'stock-table', 'Etat_Stocks.pdf');
    addPdfListener(exportSalesPdfButton, 'sales-table', 'Ventes_Papeterie.pdf');
    addPdfListener(exportMaterielElectriquePdfButton, 'materiel-electrique-table', 'Ventes_Mat_Electrique.pdf');
    addPdfListener(exportExpensesPdfButton, 'expenses-table', 'Depenses.pdf');
    addPdfListener(exportOthersPdfButton, 'others-table', 'Operations_Diverses.pdf');
    addPdfListener(exportEmployeesPdfButton, 'employees-table', 'Employes.pdf');
    addPdfListener(exportLearnersPdfButton, 'learners-table', 'Apprenants.pdf');
    addPdfListener(exportMobileMoneyPdfButton, 'mobile-money-table', 'Mobile_Money_Points.pdf');
    addPdfListener(exportMmFournisseursPdfButton, 'mm-fournisseurs-table', 'Mobile_Money_Fournisseurs.pdf');
    addPdfListener(exportClientProfilesPdfButton, 'client-profiles-table', 'Profils_Clients.pdf');
    addPdfListener(exportCreditorsPdfButton, 'creditors-table', 'Credits_Clients_Transactions.pdf');
    addPdfListener(exportDebtPdfButton, 'debt-table', 'Dettes_Prets_Entreprise.pdf');
    addPdfListener(exportReportPdfButton, 'report-table', 'Bilan_Genere.pdf');
    addPdfListener(exportEmployeePermissionsPdfButton, 'employee-permissions-table', 'Permissions_Employes.pdf');
    addPdfListener(exportLearnerPermissionsPdfButton, 'learner-permissions-table', 'Permissions_Apprenants.pdf');
    addPdfListener(exportAdminUsersPdfButton, 'admin-table', 'Utilisateurs.pdf');


    // --- Report Generation Event Listeners ---
     const showReportFilters = (showDaily, showWeekly, showMonthly, showYearly) => {
        if (reportFilters) reportFilters.classList.remove('hidden');
        if (dailyFilter) dailyFilter.classList.toggle('hidden', !showDaily);
        if (weeklyFilter) weeklyFilter.classList.toggle('hidden', !showWeekly);
        if (monthlyFilter) monthlyFilter.classList.toggle('hidden', !showMonthly);
        if (yearlyFilter) yearlyFilter.classList.toggle('hidden', !showYearly);
        if (reportDetailsContainer) reportDetailsContainer.classList.add('hidden');
        if (showReportDetailsButton) showReportDetailsButton.classList.add('hidden');
        setTodaysDate(); // Ensure default date/week/month/year is set
     };

    const addReportTypeListener = (button, daily, weekly, monthly, yearly) => {
        if (button && !button._hasReportTypeListener) {
             button.addEventListener('click', () => showReportFilters(daily, weekly, monthly, yearly));
             button._hasReportTypeListener = true;
        }
    };
    addReportTypeListener(dailyReportButton, true, false, false, false);
    addReportTypeListener(weeklyReportButton, false, true, false, false);
    addReportTypeListener(monthlyReportButton, false, false, true, false);
    addReportTypeListener(yearlyReportButton, false, false, false, true);

    if(generateReportButton && !generateReportButton._hasClickListener) {
         generateReportButton.addEventListener('click', function () {
             if (!currentUser) { return; } // Basic check, real check in RBAC

            let selectedDate = null, selectedWeek = null, selectedMonth = null, selectedYear = null;
            let filterType = '', filterLabel = '';
            if (!dailyFilter?.classList.contains('hidden')) { selectedDate = reportDateInput?.value; filterType = 'day'; filterLabel = selectedDate ? `Jour: ${selectedDate}` : 'Journalier'; }
            else if (!weeklyFilter?.classList.contains('hidden')) { selectedWeek = reportWeekInput?.value; filterType = 'week'; filterLabel = selectedWeek ? `Semaine: ${selectedWeek}` : 'Hebdomadaire'; }
            else if (!monthlyFilter?.classList.contains('hidden')) { selectedMonth = reportMonthInput?.value; filterType = 'month'; filterLabel = selectedMonth ? `Mois: ${selectedMonth}` : 'Mensuel'; }
            else if (!yearlyFilter?.classList.contains('hidden')) { selectedYear = reportYearInput?.value; filterType = 'year'; filterLabel = selectedYear ? `Année: ${selectedYear}` : 'Annuel'; }
            else { alert("Choisissez d'abord un type de bilan."); return; }

            if ((filterType === 'day' && !selectedDate) || (filterType === 'week' && !selectedWeek) || (filterType === 'month' && !selectedMonth) || (filterType === 'year' && !selectedYear)) {
                 alert("Veuillez spécifier la période pour le bilan."); return;
             }

            const filterDataByDate = (data) => {
                 if (!Array.isArray(data)) return [];
                 return data.filter(item => {
                     if (!item?.date) return false; // Skip items without a date
                     const itemDateStr = item.date; // Expects "YYYY-MM-DD"
                     try {
                         if (filterType === 'day') {
                             return itemDateStr === selectedDate;
                         }
                         if (filterType === 'month') { // "YYYY-MM"
                             return itemDateStr.startsWith(selectedMonth);
                         }
                         if (filterType === 'year') { // "YYYY"
                             return itemDateStr.startsWith(selectedYear.toString());
                         }
                         if (filterType === 'week') { // "YYYY-W##"
                             if (!selectedWeek?.includes('-W')) return false; // Basic format check
                             const [yW, wW] = selectedWeek.split('-W').map(Number);
                             if (isNaN(yW) || isNaN(wW)) return false; // Check conversion

                             const startOfWeek = getDateOfISOWeek(wW, yW);
                             if (isNaN(startOfWeek.getTime())) return false; // Check for invalid date calculation

                             const endOfWeek = new Date(startOfWeek);
                             endOfWeek.setUTCDate(startOfWeek.getUTCDate() + 6); // End of week is 6 days after start
                             endOfWeek.setUTCHours(23, 59, 59, 999); // Include the whole last day

                             // Parse item date as UTC to compare with UTC week boundaries
                             const itemDate = new Date(itemDateStr + 'T00:00:00Z');
                             if (isNaN(itemDate.getTime())) return false; // Check if item date is valid

                             return itemDate >= startOfWeek && itemDate <= endOfWeek;
                         }
                         return false; // Should not happen if filterType is set
                     } catch (e) {
                         console.error("Erreur filtre date:", item, filterType, e);
                         return false; // Exclude item if error occurs during filtering
                     }
                 });
             };

            const filteredSales = filterDataByDate(salesData);
            const filteredMESales = filterDataByDate(materielElectriqueData);
            const filteredExpenses = filterDataByDate(expensesData);
            const filteredOthers = filterDataByDate(othersData);
            const filteredSupplies = filterDataByDate(supplyData);
            const filteredMobileMoney = filterDataByDate(mobileMoneyData);

            updateReportTable(filteredSales, filteredMESales, filteredExpenses, filteredOthers, filteredSupplies, filteredMobileMoney, filterLabel);

            if (reportDetailsContainer) reportDetailsContainer.classList.remove('hidden');
            if (showReportDetailsButton) showReportDetailsButton.classList.remove('hidden');
         });
         generateReportButton._hasClickListener = true;
    }

    function updateReportTable(papeterieSales, meSales, expenses, others, supplies, mobileMoney, filterLabel) {
        if (!reportTable) return;
        reportTable.innerHTML = ''; // Clear previous report
        const reportTitleH3 = reportDetailsContainer?.querySelector('h3');
        if (reportTitleH3) reportTitleH3.textContent = `Bilan Généré (${filterLabel})`;

        let totalPapeterieIncome = 0, totalMEIncome = 0, totalOthersIncome = 0;
        let totalPapeterieExpense = 0, totalMEExpense = 0, totalOtherExpenses = 0, totalDiversExpense = 0;
        let totalMMCreditLoss = 0, totalMMTransferLoss = 0;

        const addRow = (type, detail, quantity, amount, isIncome = true) => {
            const row = reportTable.insertRow();
            row.insertCell().textContent = type; row.cells[row.cells.length-1].classList.add('type-col'); // Add class
            row.insertCell().textContent = detail; row.cells[row.cells.length-1].classList.add('designation-col'); // Add class (using designation for detail)
            const qtyCell = row.insertCell(); qtyCell.textContent = quantity ?? '-'; qtyCell.classList.add('quantity-col');
            const amountCell = row.insertCell(); amountCell.textContent = formatAmount(amount); amountCell.classList.add('amount-col');
            amountCell.style.color = isIncome ? 'var(--color-success)' : 'var(--color-danger)';
        };

        // Income from Sales
        papeterieSales.forEach(item => { const income = item.totalAmount || 0; addRow('Vente Papeterie', item.designation, item.quantity, income); totalPapeterieIncome += income; });
        meSales.forEach(item => { const income = item.totalAmount || 0; addRow('Vente Mat. Elec.', item.designation, item.quantity, income); totalMEIncome += income; });
        others.forEach(item => { const income = item.totalAmount || 0; addRow('Opération Diverse (Revenu)', item.designation, item.quantity, income); totalOthersIncome += income; });

        // Expenses
        expenses.forEach(item => { const expense = item.amount || 0; addRow('Dépense Directe', item.reason, item.quantity, expense, false); totalOtherExpenses += expense; });

        // Cost of Goods Sold (Approximation using supply cost during the period - better would be FIFO/Average cost)
        // Note: This is a simple approach. Real COGS is more complex.
        supplies.forEach(item => {
             const expense = item.totalAmount || 0;
             const type = item.type === 'Papeterie' ? 'Appro. Papeterie' : (item.type === 'Matériels électrique' ? 'Appro. Mat. Elec.' : 'Appro. Divers');
             addRow(type, item.designation, item.quantity, expense, false);
             if (item.type === 'Papeterie') totalPapeterieExpense += expense;
             else if (item.type === 'Matériels électrique') totalMEExpense += expense;
             else totalDiversExpense += expense;
         });

        // Mobile Money Losses
        mobileMoney.forEach(item => {
            const creditLoss = item.perteCredit || 0;
            const transferLoss = item.perteTransfert || 0;
            if (creditLoss > 0) { addRow('Perte MM (Crédit)', `Agent: ${item.agent}`, '-', creditLoss, false); totalMMCreditLoss += creditLoss; }
            if (transferLoss > 0) { addRow('Perte MM (Transfert/Retrait)', `Agent: ${item.agent}`, '-', transferLoss, false); totalMMTransferLoss += transferLoss; }
        });


        // Summary Row (Optional - Can be complex, showing totals)
        const totalIncome = totalPapeterieIncome + totalMEIncome + totalOthersIncome;
        const totalExpense = totalPapeterieExpense + totalMEExpense + totalDiversExpense + totalOtherExpenses + totalMMCreditLoss + totalMMTransferLoss;
        const netResult = totalIncome - totalExpense;

        const summaryRow = reportTable.insertRow(); summaryRow.style.fontWeight = 'bold'; summaryRow.style.backgroundColor = '#e9ecef';
        summaryRow.insertCell().textContent = 'TOTAL';
        summaryRow.insertCell().textContent = 'Revenus: ' + formatAmount(totalIncome); summaryRow.cells[1].style.color = 'var(--color-success)';
        summaryRow.insertCell().textContent = 'Dépenses: ' + formatAmount(totalExpense); summaryRow.cells[2].style.color = 'var(--color-danger)';
        const netCell = summaryRow.insertCell(); netCell.textContent = formatAmount(netResult); netCell.classList.add('amount-col');
        netCell.style.color = netResult >= 0 ? 'var(--color-success)' : 'var(--color-danger)';

    }


    /** Helper Function to Save Data to Firebase */
    async function saveDataToFirebase(key, data) {
         // Permission check removed from here - handled in caller functions
        try {
            const dataToSave = data === undefined || data === null ? [] : data; // Ensure we save [] not null
            await dataRef.child(key).set(dataToSave);
            // console.log(`${key} data saved successfully to Firebase.`);
            return Promise.resolve();
        } catch (error) {
            console.error(`Firebase save error for key [${key}]:`, error);
            alert(`Erreur critique lors de la sauvegarde des données (${key}). Vos dernières modifications pourraient être perdues. Vérifiez votre connexion et réessayez.`);
            throw error; // Re-throw to be caught by caller
        }
    }


    // --- Delete Functions (WITH PERMISSION CHECKS) ---
    // (Delete functions remain unchanged)
    window.deleteSupply = async (index) => {
        if (!currentUser || currentUser.status !== 'Administrateur') { alert("Accès Refusé: Admin seulement."); return; }
        if (index < 0 || index >= supplyData.length) return;
        const item = supplyData[index];
        if (confirm(`Supprimer appro ${item.date || '?'} pour "${item.designation || '?'}" (Qté: ${item.quantity || '?'}) ?\nATTENTION: Affecte stock.`)) {
            const reqStkUpd = item.type === 'Papeterie' || item.type === 'Matériels électrique';
            let tempLocalData = [...supplyData]; // Work on copy
            tempLocalData.splice(index, 1); // Remove from copy
            try {
                await saveDataToFirebase('supplyData', tempLocalData);
                // UI update will happen via the 'on' listener
                 alert('Approvisionnement supprimé.');
            } catch (e) { /* Error already handled in saveDataToFirebase */ }
        }
    };

    window.deleteSale = async (index) => {
        if (!currentUser || currentUser.status !== 'Administrateur') { alert("Accès Refusé: Admin seulement."); return; }
        if (index < 0 || index >= salesData.length) return;
        const item = salesData[index];
        if (confirm(`Supprimer vente Papeterie ${item.date || '?'} pour "${item.designation || '?'}" (Qté: ${item.quantity || '?'}) ?\nATTENTION: Affecte stock.`)) {
            let tempLocalData = [...salesData];
            tempLocalData.splice(index, 1);
            try {
                await saveDataToFirebase('salesData', tempLocalData);
                 alert('Vente Papeterie supprimée.');
            } catch (e) { /* Error handled */ }
        }
    };

    window.deleteMaterielElectriqueSale = async (index) => {
        if (!currentUser || currentUser.status !== 'Administrateur') { alert("Accès Refusé: Admin seulement."); return; }
        if (index < 0 || index >= materielElectriqueData.length) return;
        const item = materielElectriqueData[index];
        if (confirm(`Supprimer vente Mat. Elec. ${item.date || '?'} pour "${item.designation || '?'}" (Qté: ${item.quantity || '?'}) ?\nATTENTION: Affecte stock.`)) {
            let tempLocalData = [...materielElectriqueData];
            tempLocalData.splice(index, 1);
            try {
                await saveDataToFirebase('materielElectriqueData', tempLocalData);
                 alert('Vente Mat. Elec. supprimée.');
            } catch (e) { /* Error handled */ }
        }
    };

    window.deleteExpense = async (index) => {
        if (!currentUser || currentUser.status !== 'Administrateur') { alert("Accès Refusé: Admin seulement."); return; }
        if (index < 0 || index >= expensesData.length) return;
        const item = expensesData[index];
        if (confirm(`Supprimer dépense du ${item.date || '?'} ("${item.reason || '?'}", Montant: ${formatAmount(item.amount)}) ?`)) {
            let tempLocalData = [...expensesData];
            tempLocalData.splice(index, 1);
            try { await saveDataToFirebase('expensesData', tempLocalData); alert('Dépense supprimée.'); }
            catch (e) { /* Error handled */ }
        }
    };

    window.deleteOther = async (index) => {
        if (!currentUser || currentUser.status !== 'Administrateur') { alert("Accès Refusé: Admin seulement."); return; }
        if (index < 0 || index >= othersData.length) return;
        const item = othersData[index];
        if (confirm(`Supprimer op. diverse du ${item.date || '?'} ("${item.designation || '?'}", Montant: ${formatAmount(item.totalAmount)}) ?`)) {
            let tempLocalData = [...othersData];
            tempLocalData.splice(index, 1);
            try { await saveDataToFirebase('othersData', tempLocalData); alert('Opération diverse supprimée.'); }
            catch (e) { /* Error handled */ }
        }
    };

    window.deleteEmployee = async (index) => {
        if (!currentUser || currentUser.status !== 'Administrateur') { alert("Accès Refusé: Admin seulement."); return; }
        if (index < 0 || index >= employeesData.length) return;
        const item = employeesData[index];
        if (confirm(`Supprimer l'employé: ${item.nom || '?'} ${item.prenom || ''} ? Définitif.`)) {
            let tempLocalData = [...employeesData];
            tempLocalData.splice(index, 1);
            try {
                await saveDataToFirebase('employeesData', tempLocalData);
                 alert('Employé supprimé.');
            } catch (e) { /* Error handled */ }
        }
    };

     window.deleteLearner = async (index) => {
         if (!currentUser || currentUser.status !== 'Administrateur') { alert("Accès Refusé: Admin seulement."); return; }
        if (index < 0 || index >= learnersData.length) return;
        const item = learnersData[index];
        if (confirm(`Supprimer l'apprenant: ${item.nom || '?'} ${item.prenom || ''} (Filière: ${item.filiere || 'N/A'}) ? Définitif.`)) {
            let tempLocalData = [...learnersData];
            tempLocalData.splice(index, 1);
            try {
                await saveDataToFirebase('learnersData', tempLocalData);
                 alert('Apprenant supprimé.');
            } catch (e) { /* Error handled */ }
        }
    };

     window.deleteMobileMoney = async (originalIndex) => {
         if (!currentUser || currentUser.status !== 'Administrateur') { alert("Accès Refusé: Admin seulement."); return; }
        if (originalIndex < 0 || originalIndex >= mobileMoneyData.length) { alert("Index invalide."); return; }
        const item = mobileMoneyData[originalIndex];
        if (confirm(`Supprimer Point MM du ${item.date || '?'} (Agent: ${item.agent || '?'}) ?`)) {
            let tempLocalData = [...mobileMoneyData];
            tempLocalData.splice(originalIndex, 1);
            try { await saveDataToFirebase('mobileMoneyData', tempLocalData); alert('Point Mobile Money supprimé.'); }
            catch (e) { /* Error handled */ }
        }
    };

    window.deleteMmFournisseur = async (nom, prenom) => {
        if (!currentUser || currentUser.status !== 'Administrateur') { alert("Accès Refusé: Admin seulement."); return; }
        const sN = String(nom || '').replace(/\\'/g, "'"); const sP = String(prenom || '').replace(/\\'/g, "'");
        const fournisseurFullName = `${sN} ${sP}`.trim();
        const initialLength = mmFournisseursData.length;
        let tempLocalData = mmFournisseursData.filter(f => !(f.nom === sN && f.prenom === sP));

        if (tempLocalData.length < initialLength) {
            if (confirm(`Supprimer fournisseur MM : ${fournisseurFullName} ?`)) {
                try { await saveDataToFirebase('mmFournisseursData', tempLocalData); alert(`Fournisseur ${fournisseurFullName} supprimé.`); }
                catch (e) { /* Error handled */ }
            }
        } else { alert(`Erreur : Fournisseur ${fournisseurFullName} non trouvé.`); }
    };

    window.deleteClientProfile = async (nom, prenom) => {
        if (!currentUser || currentUser.status !== 'Administrateur') { alert("Accès Refusé: Admin seulement."); return; }
        const sN = String(nom || '').replace(/\\'/g, "'"); const sP = String(prenom || '').replace(/\\'/g, "'");
        const clientFullName = `${sN} ${sP}`.trim();
        const hasActiveCredit = creditorsData.some(c => c.name === clientFullName && ((c.totalAmountDue || 0) - (c.amountPaidTotal || 0) > 0.005) );
        if (hasActiveCredit) { alert(`Impossible supprimer profil ${clientFullName}, crédits non soldés associés.`); return; }

        const profileIndex = clientProfilesData.findIndex(p => p.nom === sN && p.prenom === sP);
        if (profileIndex === -1) { alert(`Erreur : Profil ${clientFullName} non trouvé.`); return; }

        if (confirm(`Supprimer profil client : ${clientFullName} ?\nATTENTION : Ceci supprimera aussi crédits SOLDÉS associés.`)) {
            let tempProfilesData = [...clientProfilesData];
            let tempCreditorsData = [...creditorsData];
            let credRemovedCount = 0;

            // Filter out profile
            tempProfilesData.splice(profileIndex, 1);
            // Filter out associated *sold* creditors
            const initialCreditorLength = tempCreditorsData.length;
            tempCreditorsData = tempCreditorsData.filter(c => !( c.name === clientFullName && ((c.totalAmountDue || 0) - (c.amountPaidTotal || 0) <= 0.005) ));
            credRemovedCount = initialCreditorLength - tempCreditorsData.length;

            try {
                const savePromises = [saveDataToFirebase('clientProfilesData', tempProfilesData)];
                if (credRemovedCount > 0) { savePromises.push(saveDataToFirebase('creditorsData', tempCreditorsData)); }
                await Promise.all(savePromises);
                 alert(`Profil ${clientFullName} supprimé.` + (credRemovedCount > 0 ? ` ${credRemovedCount} crédit(s) soldé(s) associé(s) supprimé(s).` : ''));
                 // Reset form if the deleted profile was being edited
                 if(clientProfileEditKeyInput?.value === `${sN}_${sP}`) {
                     clientProfileForm.reset(); clientProfileEditKeyInput.value = '';
                     clientProfileForm.querySelector('button[type="submit"]').textContent = 'Ajouter / Mettre à Jour Profil';
                     updateConnectedUserFields();
                 }
            } catch (e) { /* Error handled */ }
        }
    };

    window.deleteCreditor = async (originalIndex) => {
        if (!currentUser || currentUser.status !== 'Administrateur') { alert("Accès Refusé: Admin seulement."); return; }
        if (originalIndex < 0 || originalIndex >= creditorsData.length) { alert("Index invalide."); return; }
        const item = creditorsData[originalIndex];
        const remaining = (item.totalAmountDue || 0) - (item.amountPaidTotal || 0);
        if (confirm(`Supprimer TOUTE la transaction crédit pour ${item.name || '?'} ("${item.designation || '?'}")?\nSolde: ${formatAmount(remaining)}. IRREVERSIBLE.`)) {
            let tempLocalData = [...creditorsData];
            tempLocalData.splice(originalIndex, 1);
            try { await saveDataToFirebase('creditorsData', tempLocalData); alert('Transaction crédit supprimée.'); }
            catch (e) { /* Error handled */ }
        }
    };

    window.deleteDebt = async (originalIndex) => {
        if (!currentUser || currentUser.status !== 'Administrateur') { alert("Accès Refusé: Admin seulement."); return; }
        if (originalIndex < 0 || originalIndex >= debtData.length) { alert("Index invalide."); return; }
        const item = debtData[originalIndex];
        if (confirm(`Supprimer ${item.type || 'entrée'} : ${item.name || '?'} ("${item.description || '?'}", Montant: ${formatAmount(item.amount)}) ?`)) {
            let tempLocalData = [...debtData];
            tempLocalData.splice(originalIndex, 1);
            try { await saveDataToFirebase('debtData', tempLocalData); alert(`${item.type || 'Entrée'} supprimé(e).`); }
            catch (e) { /* Error handled */ }
        }
    };

    window.deletePermission = async (type, index) => {
         if (!currentUser || currentUser.status !== 'Administrateur') { alert("Accès Refusé: Admin seulement."); return; }
        let dataArray, storageKey, itemType;
        if (type === 'employee') { dataArray = employeePermissionsData; storageKey = 'employeePermissionsData'; itemType = 'employé'; }
        else if (type === 'learner') { dataArray = learnerPermissionsData; storageKey = 'learnerPermissionsData'; itemType = 'apprenant'; }
        else { return; }
        if (index < 0 || index >= dataArray.length) { alert("Index invalide."); return; }
        const perm = dataArray[index];
        if (confirm(`Supprimer demande permission pour ${perm.name || '?'} (${itemType}) du ${perm.requestDate || '?'} ?`)) {
            let tempLocalData = [...dataArray];
            tempLocalData.splice(index, 1);
            try { await saveDataToFirebase(storageKey, tempLocalData); alert('Demande permission supprimée.'); }
            catch (e) { /* Error handled */ }
        }
    };

     window.deleteAdminUser = async (username) => {
         if (!currentUser || currentUser.status !== 'Administrateur') { alert("Accès Refusé: Admin seulement."); return; }
        const safeUsername = String(username || '').replace(/\\'/g, "'");
        const userIndex = adminData.findIndex(u => u.username === safeUsername);
        if (userIndex === -1) { alert(`Utilisateur '${safeUsername}' non trouvé.`); return; }
        const userToDelete = adminData[userIndex];
         if(currentUser && currentUser.username === safeUsername) { alert("Impossible supprimer votre propre compte."); return; }
         const adminCount = adminData.filter(u => u.status === 'Administrateur').length;
         if(userToDelete.status === 'Administrateur' && adminCount <= 1) { alert("Impossible supprimer le dernier administrateur."); return; }
        if (confirm(`Supprimer utilisateur '${safeUsername}' (${userToDelete.status || ''}) ? IRREVERSIBLE.`)) {
            let tempLocalData = [...adminData];
            tempLocalData.splice(userIndex, 1);
            try {
                await saveDataToFirebase('adminData', tempLocalData);
                alert(`Utilisateur '${safeUsername}' supprimé.`);
                // Reset form if the deleted user was being edited
                 if (adminEditKeyInput?.value === safeUsername) {
                     adminForm.reset(); updateConnectedUserFields(); adminEditKeyInput.value = '';
                     adminPasswordInput.placeholder = "Entrer pour définir/modifier";
                     adminForm.querySelector('button[type="submit"]').textContent = 'Ajouter / Mettre à Jour Utilisateur';
                 }
            } catch (e) { /* Error handled */ }
        }
    };


    // --- Edit Functions (WITH PERMISSION CHECKS) ---
    // (Edit functions remain unchanged)
    window.editSupply = (index) => {
         if (!currentUser || currentUser.status !== 'Administrateur') { alert("Accès Refusé: Admin seulement."); return; }
        if (index < 0 || index >= supplyData.length) return;
        const item = supplyData[index];
        if (!supplyForm || !supplyEditIndexInput || !supplyDateInput || !supplyTypeSelect || !supplyDesignationInput || !supplyQuantityInput || !supplyUnitPriceInput || !supplyTotalAmountInput || !supplyUserConnectedInput) { alert("Erreur interne: Formulaire approvisionnement incomplet."); return; }
        supplyForm.reset();
        supplyDateInput.value = item.date || '';
        supplyTypeSelect.value = item.type || '';
        supplyDesignationInput.value = item.designation || '';
        supplyQuantityInput.value = item.quantity || '';
        supplyUnitPriceInput.value = item.unitPrice !== null ? item.unitPrice : '';
        calculateTotalAmount(supplyQuantityInput, supplyUnitPriceInput, supplyTotalAmountInput);
        updateConnectedUserFields();
        supplyEditIndexInput.value = index; // Store original index
        supplyForm.querySelector('button[type="submit"]').textContent = 'Mettre à Jour Approvisionnement';
        supplySection?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    window.editSaleMisc = (typeKey, originalIndex) => {
        if (!currentUser || currentUser.status !== 'Administrateur') { alert("Accès Refusé: Admin seulement."); return; }
        let dataArray, item, formToReset = salesForm, operationTypeValue = '';
        try {
            if (typeKey === 'Papeterie') { dataArray = salesData; operationTypeValue = 'Papeterie'; }
            else if (typeKey === 'MatElec') { dataArray = materielElectriqueData; operationTypeValue = 'Matériels électrique'; }
            else if (typeKey === 'Depenses') { dataArray = expensesData; operationTypeValue = 'Dépenses'; }
            else if (typeKey === 'Divers') { dataArray = othersData; operationTypeValue = 'Divers'; }
            else throw new Error("Type invalide pour modif.");
            if (originalIndex < 0 || originalIndex >= dataArray.length) throw new Error("Index invalide.");
            item = dataArray[originalIndex];
        } catch (error) { alert(`Erreur prépa modif : ${error.message}`); return; }
        if (!item) { alert("Erreur: Enregistrement introuvable."); return; }

        formToReset.reset();
        if(saleDateInput) saleDateInput.value = item.date || '';
        if (operationTypeSelect) { operationTypeSelect.value = operationTypeValue; handleOperationTypeChange(); }
        else { alert("Erreur interne: Sélecteur type op. introuvable."); return; }

        // Populate the correct sub-form
        if (typeKey === 'Papeterie' && papeterieDetailsForm) {
            if(saleDesignationSelect) {
                 // Ensure the designation exists in the dropdown, add if necessary for editing
                 updateProductDesignationsForCategory('Papeterie'); // Update dropdown first
                 const exists = Array.from(saleDesignationSelect.options).some(opt => opt.value === item.designation);
                 if (!exists && item.designation) { saleDesignationSelect.add(new Option(item.designation, item.designation, true, true)); }
                 saleDesignationSelect.value = item.designation || '';
             }
            if(saleQuantityInput) saleQuantityInput.value = item.quantity || '';
            if(saleUnitPriceInput) saleUnitPriceInput.value = item.unitPrice ?? '';
            calculateTotalAmount(saleQuantityInput, saleUnitPriceInput, saleTotalAmountInput);
        } else if (typeKey === 'MatElec' && materielElectriqueDetailsForm) {
             if(meDesignationSelect) {
                  updateProductDesignationsForCategory('Matériels électrique'); // Update dropdown
                  const exists = Array.from(meDesignationSelect.options).some(opt => opt.value === item.designation);
                  if (!exists && item.designation) { meDesignationSelect.add(new Option(item.designation, item.designation, true, true)); }
                  meDesignationSelect.value = item.designation || '';
              }
            if(meQuantityInput) meQuantityInput.value = item.quantity || '';
            if(meUnitPriceInput) meUnitPriceInput.value = item.unitPrice ?? '';
            calculateTotalAmount(meQuantityInput, meUnitPriceInput, meTotalAmountInput);
        } else if (typeKey === 'Depenses' && depensesDetailsForm) {
            if(expenseReasonInput) expenseReasonInput.value = item.reason || '';
            if(expenseQuantityInput) expenseQuantityInput.value = item.quantity ?? '';
            if(expenseAmountInput) expenseAmountInput.value = item.amount || '';
        } else if (typeKey === 'Divers' && diversDetailsForm) {
            if(otherDesignationInput) otherDesignationInput.value = item.designation || '';
            if(otherQuantityInput) otherQuantityInput.value = item.quantity ?? '';
            if(otherTotalAmountInput) otherTotalAmountInput.value = item.totalAmount || '';
        } else { console.warn(`Modif type '${typeKey}' mais form non trouvé.`); }

        updateConnectedUserFields();
        if (salesEditIndexInput) salesEditIndexInput.value = originalIndex;
        if (salesEditTypeInput) salesEditTypeInput.value = operationTypeValue;
        const submitButton = formToReset.querySelector('button[type="submit"]');
        if (submitButton) submitButton.textContent = 'Mettre à Jour Opération';
        salesSection?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    window.editEmployee = (index) => {
        if (!currentUser || currentUser.status !== 'Administrateur') { alert("Accès Refusé: Admin seulement."); return; }
        if (index < 0 || index >= employeesData.length) return;
        const emp = employeesData[index];
        if (!employeeForm || !employeeEditIndexInput || !employeeUserConnectedInput) { alert("Erreur: Formulaire employé introuvable."); return; }
        employeeForm.reset();
        if(employeeNomInput) employeeNomInput.value = emp.nom || ''; if(employeePrenomInput) employeePrenomInput.value = emp.prenom || '';
        if(employeeRoleInput) employeeRoleInput.value = emp.statut || ''; if(employeeAdresseInput) employeeAdresseInput.value = emp.adresse || '';
        if(employeeTelephoneInput) employeeTelephoneInput.value = emp.telephone || ''; if(employeeLieuResidenceInput) employeeLieuResidenceInput.value = emp.lieuResidence || '';
        if(employeeJoursTravailInput) employeeJoursTravailInput.value = emp.joursTravail || ''; if(employeeHeureArriveeInput) employeeHeureArriveeInput.value = emp.heureArrivee || '';
        if(employeeHeureDepartInput) employeeHeureDepartInput.value = emp.heureDepart || ''; if(employeeSalaryInput) employeeSalaryInput.value = emp.salary ?? '';
        if(employeePaidAmountInput) employeePaidAmountInput.value = emp.paidAmount || ''; if(employeeHireDateInput) employeeHireDateInput.value = emp.hireDate || '';
        if(employeeContactPersonNomInput) employeeContactPersonNomInput.value = emp.contactPersonNom || ''; if(employeeContactPersonPrenomInput) employeeContactPersonPrenomInput.value = emp.contactPersonPrenom || '';
        if(employeeContactPersonAdresseInput) employeeContactPersonAdresseInput.value = emp.contactPersonAdresse || ''; if(employeeContactPersonTelephoneInput) employeeContactPersonTelephoneInput.value = emp.contactPersonTelephone || '';
        if(employeeContactPersonLieuResidenceInput) employeeContactPersonLieuResidenceInput.value = emp.contactPersonLieuResidence || '';
        updateConnectedUserFields(); employeeEditIndexInput.value = index;
        employeeForm.querySelector('button[type="submit"]').textContent = 'Mettre à Jour Employé';
        employeesSection?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

     window.editLearner = (index) => {
        if (!currentUser || currentUser.status !== 'Administrateur') { alert("Accès Refusé: Admin seulement."); return; }
        if (index < 0 || index >= learnersData.length) return;
        const lrn = learnersData[index];
        if (!learnerForm || !learnerEditIndexInput || !learnerUserConnectedInput) { alert("Erreur: Formulaire apprenant introuvable."); return; }
        learnerForm.reset();
        if(learnerNomInput) learnerNomInput.value = lrn.nom || ''; if(learnerPrenomInput) learnerPrenomInput.value = lrn.prenom || '';
        if(learnerAgeInput) learnerAgeInput.value = lrn.age ?? ''; if(learnerAdresseInput) learnerAdresseInput.value = lrn.adresse || '';
        if(learnerLieuResidenceInput) learnerLieuResidenceInput.value = lrn.lieuResidence || ''; if(learnerNiveauEtudesInput) learnerNiveauEtudesInput.value = lrn.niveauEtudes || '';
        if(learnerSituationMatrimonialeSelect) learnerSituationMatrimonialeSelect.value = lrn.situationMatrimoniale || ''; if(learnerPereNomInput) learnerPereNomInput.value = lrn.pereNom || '';
        if(learnerPerePrenomInput) learnerPerePrenomInput.value = lrn.perePrenom || ''; if(learnerMereNomInput) learnerMereNomInput.value = lrn.mereNom || '';
        if(learnerMerePrenomInput) learnerMerePrenomInput.value = lrn.merePrenom || ''; if(learnerFiliereInput) learnerFiliereInput.value = lrn.filiere || '';
        if(learnerDureeFormationInput) learnerDureeFormationInput.value = lrn.dureeFormation || ''; if(learnerFraisDocumentsInput) learnerFraisDocumentsInput.value = lrn.fraisDocuments || '';
        if(learnerTranche1Input) learnerTranche1Input.value = lrn.tranche1 || ''; if(learnerTranche2Input) learnerTranche2Input.value = lrn.tranche2 || '';
        if(learnerTranche3Input) learnerTranche3Input.value = lrn.tranche3 || ''; if(learnerTranche4Input) learnerTranche4Input.value = lrn.tranche4 || '';
        if(learnerGarantNomInput) learnerGarantNomInput.value = lrn.garantNom || ''; if(learnerGarantPrenomInput) learnerGarantPrenomInput.value = lrn.garantPrenom || '';
        if(learnerGarantTelephoneInput) learnerGarantTelephoneInput.value = lrn.garantTelephone || ''; if(learnerGarantAdresseInput) learnerGarantAdresseInput.value = lrn.garantAdresse || '';
        updateConnectedUserFields(); learnerEditIndexInput.value = index;
        learnerForm.querySelector('button[type="submit"]').textContent = 'Mettre à Jour Apprenant';
        learnersSection?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

     window.editMobileMoney = (originalIndex) => {
         if (!currentUser || currentUser.status !== 'Administrateur') { alert("Accès Refusé: Admin seulement."); return; }
        if (originalIndex < 0 || originalIndex >= mobileMoneyData.length) { alert("Index invalide."); return; }
        const item = mobileMoneyData[originalIndex];
        if (!mobileMoneyForm || !mobileMoneyEditIndexInput || !mmPointUserConnectedInput) { alert("Erreur: Formulaire MM introuvable."); return; }
        mobileMoneyForm.reset();
        if(mmDateInput) mmDateInput.value = item.date || ''; if(mmAgentInput) mmAgentInput.value = item.agent || '';
        if(mmBalanceMoovInput) mmBalanceMoovInput.value = item.balanceMoov || ''; if(mmBalanceMtnInput) mmBalanceMtnInput.value = item.balanceMTN || '';
        if(mmBalanceCelttisInput) mmBalanceCelttisInput.value = item.balanceCelttis || ''; if(mmBalanceCashInput) mmBalanceCashInput.value = item.balanceCash || '';
        if(mmCreditMoovInput) mmCreditMoovInput.value = item.creditMoov || ''; if(mmCreditMtnInput) mmCreditMtnInput.value = item.creditMTN || '';
        if(mmCreditCelttisInput) mmCreditCelttisInput.value = item.creditCelttis || ''; if(mmPerteTransfertInput) mmPerteTransfertInput.value = item.perteTransfert || '';
        if(mmPerteCreditInput) mmPerteCreditInput.value = item.perteCredit || '';
        updateConnectedUserFields(); mobileMoneyEditIndexInput.value = originalIndex;
        mobileMoneyForm.querySelector('button[type="submit"]').textContent = 'Mettre à Jour Point MM';
        mobileMoneySection?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

     window.editMmFournisseur = (nom, prenom) => {
        if (!currentUser || currentUser.status !== 'Administrateur') { alert("Accès Refusé: Admin seulement."); return; }
        const sN = String(nom || '').replace(/\\'/g, "'"); const sP = String(prenom || '').replace(/\\'/g, "'");
        const key = `${sN}_${sP}`;
        const f = mmFournisseursData.find(f => f.nom === sN && f.prenom === sP);
        if (f && mmFournisseurForm && mmFournisseurEditKeyInput && mmFournisseurUserConnectedInput) {
            mmFournisseurForm.reset();
            if(mmFournisseurNomInput) mmFournisseurNomInput.value = f.nom || ''; if(mmFournisseurPrenomInput) mmFournisseurPrenomInput.value = f.prenom || '';
            if(mmFournisseurContactInput) mmFournisseurContactInput.value = f.contact || ''; if(mmFournisseurMontantInput) mmFournisseurMontantInput.value = f.montantFourni || '';
            if(mmFournisseurInteretInput) mmFournisseurInteretInput.value = f.interet ?? ''; if(mmFournisseurVenduInput) mmFournisseurVenduInput.value = f.creditVendu || '';
            updateConnectedUserFields(); mmFournisseurEditKeyInput.value = key;
            mmFournisseurForm.querySelector('button[type="submit"]').textContent = 'Mettre à Jour Fournisseur';
            mmFournisseurForm?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else { alert(`Fournisseur ${sN} ${sP} non trouvé ou form incomplet.`); if(mmFournisseurEditKeyInput) mmFournisseurEditKeyInput.value = ''; }
    };

     window.editClientProfile = (nom, prenom) => {
          if (!currentUser || currentUser.status !== 'Administrateur') { alert("Accès Refusé: Admin seulement."); return; }
        const sN = String(nom || '').replace(/\\'/g, "'"); const sP = String(prenom || '').replace(/\\'/g, "'");
        const key = `${sN}_${sP}`;
        const p = clientProfilesData.find(p => p.nom === sN && p.prenom === sP);
        if (p && clientProfileForm && clientProfileEditKeyInput && clientUserConnectedInput) {
            clientProfileForm.reset();
            if(clientProfileNomInput) clientProfileNomInput.value = p.nom || ''; if(clientProfilePrenomInput) clientProfilePrenomInput.value = p.prenom || '';
            if(clientProfileAdresseInput) clientProfileAdresseInput.value = p.adresse || ''; if(clientProfileContactInput) clientProfileContactInput.value = p.contact || '';
            if(clientProfileStatutInput) clientProfileStatutInput.value = p.statut || '';
            updateConnectedUserFields(); clientProfileEditKeyInput.value = key;
            clientProfileForm.querySelector('button[type="submit"]').textContent = 'Mettre à Jour Profil';
            clientProfileForm?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else { alert(`Profil ${sN} ${sP} non trouvé ou form incomplet.`); if(clientProfileEditKeyInput) clientProfileEditKeyInput.value = ''; }
    };

    window.editDebt = (originalIndex) => {
        if (!currentUser || currentUser.status !== 'Administrateur') { alert("Accès Refusé: Admin seulement."); return; }
        if (originalIndex < 0 || originalIndex >= debtData.length) { alert("Index invalide."); return; }
        const item = debtData[originalIndex];
        if (!debtForm || !debtEditIndexInput || !debtUserConnectedInput) { alert("Erreur: Formulaire Dette/Prêt introuvable."); return; }
        debtForm.reset();
        if(debtDateInput) debtDateInput.value = item.date || ''; if(debtTypeSelect) debtTypeSelect.value = item.type || '';
        if(debtNameInput) debtNameInput.value = item.name || ''; if(debtDescriptionInput) debtDescriptionInput.value = item.description || '';
        if(debtAmountInput) debtAmountInput.value = item.amount || ''; if(debtDueDateInput) debtDueDateInput.value = item.dueDate || '';
        if(debtStatusSelect) debtStatusSelect.value = item.status || '';
        updateConnectedUserFields(); debtEditIndexInput.value = originalIndex;
        debtForm.querySelector('button[type="submit"]').textContent = 'Mettre à Jour Dette/Prêt';
        debtSection?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    window.editAdminUser = (username) => {
        if (!currentUser || currentUser.status !== 'Administrateur') { alert("Accès Refusé: Admin seulement."); return; }
        const safeUsername = String(username || '').replace(/\\'/g, "'");
        const user = adminData.find(u => u.username === safeUsername);
        if (!user) { alert(`Utilisateur '${safeUsername}' non trouvé.`); return; }
        if (!adminForm || !adminEditKeyInput || !adminUsernameInput || !adminPostInput || !adminPasswordInput || !adminStatusSelect || !adminOpUserConnectedInput) { alert("Erreur interne: Form Admin incomplet."); return; }
        if(currentUser && currentUser.username === safeUsername) { alert("Modif impossible : propre compte."); return; }
        adminForm.reset();
        adminUsernameInput.value = user.username || ''; adminPostInput.value = user.post || '';
        adminStatusSelect.value = user.status || 'Lecteur'; adminPasswordInput.value = '';
        adminPasswordInput.placeholder = "Laisser vide si inchangé";
        updateConnectedUserFields(); adminEditKeyInput.value = user.username;
        adminForm.querySelector('button[type="submit"]').textContent = 'Mettre à Jour Utilisateur';
        adminSection?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };


    // --- Permission Status Update Function ---
    window.updatePermissionStatus = async (type, index, newStatus) => {
         if (!currentUser || currentUser.status !== 'Administrateur') { alert("Accès Refusé: Admin seulement."); return; }
        let dataArray, storageKey, itemType;
        if (type === 'employee') { dataArray = employeePermissionsData; storageKey = 'employeePermissionsData'; itemType = 'employé'; }
        else if (type === 'learner') { dataArray = learnerPermissionsData; storageKey = 'learnerPermissionsData'; itemType = 'apprenant'; }
        else { return; }
        if (index < 0 || index >= dataArray.length) { alert("Index invalide."); return; }

        let tempLocalData = [...dataArray]; // Work on copy
        tempLocalData[index].status = newStatus;
        tempLocalData[index].statusUpdatedBy = currentUser?.username || 'N/A';
        tempLocalData[index].statusUpdateDate = new Date().toISOString().split('T')[0];
        try {
            await saveDataToFirebase(storageKey, tempLocalData);
             alert(`Statut demande mis à jour à "${newStatus}".`);
        } catch(e) { /* Error handled */ }
    };

    // --- Payment Recording Functions ---
    window.recordSalaryPayment = async (index) => {
        if (!currentUser || currentUser.status !== 'Administrateur') { alert("Accès Refusé: Admin seulement."); return; }
        if (index < 0 || index >= employeesData.length) return;
        const emp = employeesData[index];
        const salary = emp.salary !== null ? parseFloat(emp.salary) : 0; const totalPaid = emp.paidAmount || 0; const remaining = salary - totalPaid;
        const paymentDate = prompt("Date paiement (AAAA-MM-JJ) :", new Date().toISOString().split('T')[0]);
        if (!paymentDate || !/^\d{4}-\d{2}-\d{2}$/.test(paymentDate)) { if (paymentDate !== null) alert("Format date invalide."); return; }
        const amountStr = prompt(`Employé: ${emp.nom || ''} ${emp.prenom || ''}\nSalaire Base: ${formatAmount(salary)}\nDéjà Payé: ${formatAmount(totalPaid)}\nRestant Dû: ${formatAmount(remaining)}\n\nMontant payé ce jour :`, remaining > 0 ? formatAmount(remaining) : '0.00');
        if (amountStr === null) return; const amountPaidThisTime = parseFloat(amountStr);
        if (isNaN(amountPaidThisTime) || amountPaidThisTime < 0) { alert("Montant invalide."); return; }
        if (amountPaidThisTime === 0) { alert("Aucun paiement enregistré (montant = 0)."); return; }
        if (amountPaidThisTime > remaining + 0.005) { alert(`Montant payé (${formatAmount(amountPaidThisTime)}) dépasse solde restant (${formatAmount(remaining)}).`); return; }

        let tempLocalData = [...employeesData]; // Work on copy
        const empInCopy = tempLocalData[index];
        empInCopy.paidAmount = (empInCopy.paidAmount || 0) + amountPaidThisTime;
        if (!empInCopy.paymentHistory) empInCopy.paymentHistory = [];
        empInCopy.paymentHistory.push({ date: paymentDate, amount: amountPaidThisTime, recordedBy: currentUser?.username || 'N/A' });
        empInCopy.lastModifiedBy = currentUser?.username || 'N/A'; // Track modification
        empInCopy.lastModifiedDate = new Date().toISOString();

        try {
            await saveDataToFirebase('employeesData', tempLocalData);
            alert(`Paiement de ${formatAmount(amountPaidThisTime)} enregistré pour ${emp.nom} ${emp.prenom} le ${paymentDate}.`);
            if (confirm('Imprimer reçu ?')) { printSalaryInvoice(index, paymentDate, amountPaidThisTime); }
        } catch(e) { /* Error handled */ }
    };

    window.recordTranchePayment = async (index) => {
        if (!currentUser || currentUser.status !== 'Administrateur') { alert("Accès Refusé: Admin seulement."); return; }
        if (index < 0 || index >= learnersData.length) return;
        const lrn = learnersData[index];
        const paymentDate = prompt("Date paiement (AAAA-MM-JJ) :", new Date().toISOString().split('T')[0]);
        if (!paymentDate || !/^\d{4}-\d{2}-\d{2}$/.test(paymentDate)) { if (paymentDate !== null) alert("Format date invalide."); return; }
        const paymentReason = prompt(`Paiement pour ${lrn.nom} ${lrn.prenom}.\nMotif (Ex: Tranche 1, Frais Docs):`, "Paiement Tranche Formation");
        if (!paymentReason) return; const amountStr = prompt("Montant payé :"); if (amountStr === null) return;
        const amountPaidThisTime = parseFloat(amountStr); if (isNaN(amountPaidThisTime) || amountPaidThisTime <= 0) { alert("Montant invalide."); return; }
        const trancheChoice = prompt( `Ligne à créditer pour ${formatAmount(amountPaidThisTime)} ?\n1. Frais Docs (${formatAmount(lrn.fraisDocuments)})\n2. Tranche 1 (${formatAmount(lrn.tranche1)})\n3. Tranche 2 (${formatAmount(lrn.tranche2)})\n4. Tranche 3 (${formatAmount(lrn.tranche3)})\n5. Tranche 4 (${formatAmount(lrn.tranche4)})\nEntrez (1-5). MONTANT SERA AJOUTÉ.` );
        if (!trancheChoice) return; const choice = parseInt(trancheChoice); if (isNaN(choice) || choice < 1 || choice > 5) { alert("Choix invalide."); return; }

        let tempLocalData = [...learnersData]; // Work on copy
        const lrnInCopy = tempLocalData[index];
        let updated = false;
        let appliedTo = '';

        switch (choice) {
            case 1: lrnInCopy.fraisDocuments = (lrnInCopy.fraisDocuments || 0) + amountPaidThisTime; appliedTo = 'Frais Docs'; updated = true; break;
            case 2: lrnInCopy.tranche1 = (lrnInCopy.tranche1 || 0) + amountPaidThisTime; appliedTo = 'Tranche 1'; updated = true; break;
            case 3: lrnInCopy.tranche2 = (lrnInCopy.tranche2 || 0) + amountPaidThisTime; appliedTo = 'Tranche 2'; updated = true; break;
            case 4: lrnInCopy.tranche3 = (lrnInCopy.tranche3 || 0) + amountPaidThisTime; appliedTo = 'Tranche 3'; updated = true; break;
            case 5: lrnInCopy.tranche4 = (lrnInCopy.tranche4 || 0) + amountPaidThisTime; appliedTo = 'Tranche 4'; updated = true; break;
        }

         if (!lrnInCopy.paymentHistory) lrnInCopy.paymentHistory = [];
         lrnInCopy.paymentHistory.push({ date: paymentDate, amount: amountPaidThisTime, reason: paymentReason, appliedTo, recordedBy: currentUser?.username || 'N/A' });
         lrnInCopy.lastModifiedBy = currentUser?.username || 'N/A'; // Track modification
         lrnInCopy.lastModifiedDate = new Date().toISOString();

        if (updated) {
            try {
                await saveDataToFirebase('learnersData', tempLocalData);
                 alert(`Paiement de ${formatAmount(amountPaidThisTime)} pour "${paymentReason}" enregistré pour ${lrn.nom} ${lrn.prenom} le ${paymentDate}.`);
                 if (confirm('Imprimer reçu ?')) { printLearnerInvoice(index, paymentDate, paymentReason, amountPaidThisTime); }
            } catch (e) { /* Error handled */ }
        }
    };


    // --- Invoice Printing Functions ---
    function printSalaryInvoice(employeeIndex, paymentDate, amountPaidThisTime) {
         if (employeeIndex < 0 || employeeIndex >= employeesData.length) return;
         const emp = employeesData[employeeIndex];
         const invoiceArea = document.getElementById('invoice-print-area');
         if (!invoiceArea) { alert("Zone d'impression introuvable."); return; }

         // Simple Invoice HTML Structure
         const html = `
             <div style="border: 1px solid #ccc; padding: 20px; width: 80%; margin: 20px auto; font-family: Arial, sans-serif;">
                 <div style="text-align: center; margin-bottom: 20px;">
                     <img src="logo.jpg" alt="Logo" style="max-height: 60px; border-radius: 50%; display: block; margin: 0 auto 10px auto;">
                     <h2 style="margin: 0;">REÇU DE PAIEMENT DE SALAIRE</h2>
                     <strong>LA CHARITÉ MODESTE</strong><br>
                     <small>Adresse, Contact, etc.</small>
                 </div>
                 <hr>
                 <p><strong>Date de Paiement :</strong> ${paymentDate}</p>
                 <p><strong>Employé :</strong> ${emp.nom || ''} ${emp.prenom || ''}</p>
                 <p><strong>Poste :</strong> ${emp.statut || 'N/A'}</p>
                 <hr>
                 <p><strong>Montant Payé :</strong> ${formatAmount(amountPaidThisTime)} FCFA</p>
                 <p><strong>En Lettres :</strong> ${numberToWordsFrench(amountPaidThisTime)}</p>
                 <hr>
                 <p style="margin-top: 30px;"><strong>Signature Employé :</strong> _________________________</p>
                 <p style="margin-top: 10px;"><strong>Signature Employeur :</strong> _________________________</p>
                 <p style="text-align: center; font-size: 0.8em; margin-top: 40px;">
                     Généré le ${new Date().toLocaleDateString('fr-FR')} ${new Date().toLocaleTimeString('fr-FR')}
                 </p>
             </div>
         `;
         invoiceArea.innerHTML = html;
         printElement('invoice-print-area');
     }

     function printLearnerInvoice(learnerIndex, paymentDate, paymentReason, amountPaidThisTime) {
         if (learnerIndex < 0 || learnerIndex >= learnersData.length) return;
         const lrn = learnersData[learnerIndex];
         const invoiceArea = document.getElementById('invoice-print-area');
         if (!invoiceArea) { alert("Zone d'impression introuvable."); return; }

         // Simple Invoice HTML Structure
         const html = `
             <div style="border: 1px solid #ccc; padding: 20px; width: 80%; margin: 20px auto; font-family: Arial, sans-serif;">
                 <div style="text-align: center; margin-bottom: 20px;">
                      <img src="logo.jpg" alt="Logo" style="max-height: 60px; border-radius: 50%; display: block; margin: 0 auto 10px auto;">
                      <h2 style="margin: 0;">REÇU DE PAIEMENT FRAIS FORMATION</h2>
                      <strong>LA CHARITÉ MODESTE</strong><br>
                      <small>Adresse, Contact, etc.</small>
                  </div>
                 <hr>
                 <p><strong>Date de Paiement :</strong> ${paymentDate}</p>
                 <p><strong>Apprenant :</strong> ${lrn.nom || ''} ${lrn.prenom || ''}</p>
                 <p><strong>Filière :</strong> ${lrn.filiere || 'N/A'}</p>
                 <hr>
                 <p><strong>Motif Paiement :</strong> ${paymentReason || 'N/A'}</p>
                 <p><strong>Montant Payé :</strong> ${formatAmount(amountPaidThisTime)} FCFA</p>
                 <p><strong>En Lettres :</strong> ${numberToWordsFrench(amountPaidThisTime)}</p>
                 <hr>
                 <p style="margin-top: 30px;"><strong>Signature Apprenant/Parent :</strong> _________________________</p>
                 <p style="margin-top: 10px;"><strong>Signature Établissement :</strong> _________________________</p>
                  <p style="text-align: center; font-size: 0.8em; margin-top: 40px;">
                      Généré le ${new Date().toLocaleDateString('fr-FR')} ${new Date().toLocaleTimeString('fr-FR')}
                  </p>
             </div>
         `;
         invoiceArea.innerHTML = html;
         printElement('invoice-print-area');
     }

    window.printCreditReceipt = (originalIndex) => {
         if (originalIndex < 0 || originalIndex >= creditorsData.length) return;
         const credit = creditorsData[originalIndex];
         const clientProfile = clientProfilesData.find(p => `${p.nom || ''} ${p.prenom || ''}`.trim() === credit.name);
         const invoiceArea = document.getElementById('invoice-print-area');
         if (!invoiceArea) { alert("Zone d'impression introuvable."); return; }

         const totalAmount = credit.totalAmountDue || 0;
         const totalPaid = credit.amountPaidTotal || 0;
         const remaining = totalAmount - totalPaid;

         let paymentHistoryHTML = '<h4>Historique Paiements :</h4><ul>';
         if (credit.paymentHistory && credit.paymentHistory.length > 0) {
             credit.paymentHistory.forEach(p => {
                 paymentHistoryHTML += `<li>${p.date}: ${formatAmount(p.amount)} FCFA (par ${p.recordedBy || 'N/A'})</li>`;
             });
         } else {
             paymentHistoryHTML += '<li>Aucun paiement enregistré dans l\'historique détaillé.</li>';
         }
         paymentHistoryHTML += '</ul>';

         const html = `
              <div style="border: 1px solid #ccc; padding: 20px; width: 90%; margin: 20px auto; font-family: Arial, sans-serif; font-size: 10pt;">
                  <div style="text-align: center; margin-bottom: 15px;">
                      <img src="logo.jpg" alt="Logo" style="max-height: 50px; border-radius: 50%; display: block; margin: 0 auto 8px auto;">
                      <h3 style="margin: 0;">RELEVÉ DE COMPTE CRÉDIT</h3>
                      <strong>LA CHARITÉ MODESTE</strong><br>
                      <small>Adresse, Contact, etc.</small>
                  </div>
                 <hr>
                 <p><strong>Date Relevé :</strong> ${new Date().toLocaleDateString('fr-FR')}</p>
                 <p><strong>Client :</strong> ${credit.name || ''}</p>
                 ${clientProfile?.contact ? `<p><strong>Contact Client :</strong> ${clientProfile.contact}</p>` : ''}
                 <hr>
                 <p><strong>Désignation/Produit :</strong> ${credit.designation || 'N/A'}</p>
                 ${credit.quantity !== null ? `<p><strong>Quantité :</strong> ${credit.quantity}</p>` : ''}
                 ${credit.unitPrice !== null ? `<p><strong>Prix Unitaire :</strong> ${formatAmount(credit.unitPrice)}</p>` : ''}
                 <p><strong>Date Initiale Transaction :</strong> ${credit.date || 'N/A'}</p>
                 <p><strong>Date Échéance :</strong> ${credit.dueDate || 'N/A'}</p>
                 <hr style="margin: 10px 0;">
                 <p><strong>Montant Total Dû :</strong> ${formatAmount(totalAmount)} FCFA</p>
                 <p><strong>Montant Total Payé :</strong> ${formatAmount(totalPaid)} FCFA</p>
                 <p><strong>Montant Restant Dû : <span style="font-weight: bold; color: ${remaining > 0 ? 'red' : 'green'};">${formatAmount(remaining)} FCFA</span></strong></p>
                 <hr style="margin: 10px 0;">
                 ${paymentHistoryHTML}
                 <hr style="margin: 10px 0;">
                 <p style="text-align: center; font-size: 0.8em; margin-top: 20px;">
                     Généré le ${new Date().toLocaleDateString('fr-FR')} ${new Date().toLocaleTimeString('fr-FR')}
                 </p>
              </div>
         `;
         invoiceArea.innerHTML = html;
         printElement('invoice-print-area');
     };

    function generateInvoiceHTML(invoiceData) {
         const { date, number, clientName, clientContact, items, totalAmount, totalWords } = invoiceData;
         let itemsHTML = '';
         items.forEach(item => {
             itemsHTML += `
                 <tr>
                     <td style="border: 1px solid #ddd; padding: 6px;">${item.designation || ''}</td>
                     <td style="border: 1px solid #ddd; padding: 6px; text-align: center;">${item.quantity || 0}</td>
                     <td style="border: 1px solid #ddd; padding: 6px; text-align: right;">${formatAmount(item.unitPrice)}</td>
                     <td style="border: 1px solid #ddd; padding: 6px; text-align: right;">${formatAmount(item.total)}</td>
                 </tr>
             `;
         });

         const html = `
             <div class="invoice-wrapper" style="border: 1px solid #aaa; padding: 25px; margin: 20px; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; font-size: 10pt; background-color: #fff; color: #000;">
                 <div class="invoice-header" style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 20px; padding-bottom: 10px; border-bottom: 2px solid #333;">
                     <div class="invoice-details">
                         <img src="logo.jpg" alt="Logo La Charité Modeste" class="invoice-logo" style="max-height: 60px; margin-bottom: 10px;">
                         <br><strong>LA CHARITÉ MODESTE</strong>
                         <br>Adresse...
                         <br>Téléphone: ...
                         <br>Email: ...
                     </div>
                     <div class="invoice-title" style="text-align: right;">
                         <h2 style="margin: 0 0 10px 0; font-size: 18pt;">FACTURE</h2>
                         <div class="invoice-details">
                             <strong>N° Facture :</strong> ${number}<br>
                             <strong>Date :</strong> ${date}
                         </div>
                     </div>
                 </div>

                 <div class="invoice-client-details" style="margin-bottom: 25px; text-align: left;">
                     <strong>Client :</strong><br>
                     ${clientName}<br>
                     ${clientContact ? `Contact: ${clientContact}<br>` : ''}
                     <!-- Ajouter Adresse Client si nécessaire -->
                 </div>

                 <div class="invoice-items">
                     <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
                         <thead>
                             <tr>
                                 <th style="border: 1px solid #bbb; padding: 8px; background-color: #eee; text-align: left;">Désignation</th>
                                 <th style="border: 1px solid #bbb; padding: 8px; background-color: #eee; text-align: center; width: 10%;">Quantité</th>
                                 <th style="border: 1px solid #bbb; padding: 8px; background-color: #eee; text-align: right; width: 20%;">Prix Unitaire</th>
                                 <th style="border: 1px solid #bbb; padding: 8px; background-color: #eee; text-align: right; width: 20%;">Montant Total</th>
                             </tr>
                         </thead>
                         <tbody>
                             ${itemsHTML}
                         </tbody>
                     </table>
                 </div>

                 <div class="invoice-summary" style="text-align: right; margin-top: 20px; padding-top: 10px; border-top: 1px solid #ccc; font-size: 11pt;">
                      Arrêté la présente facture à la somme de :<br>
                      <strong style="font-size: 10.5pt;">${totalWords}</strong>
                     <hr style="margin: 8px 0; border: none; border-top: 1px dashed #ccc;">
                     <strong>MONTANT TOTAL :</strong>
                     <strong style="display: inline-block; min-width: 120px; text-align: right; margin-left: 10px;">${formatAmount(totalAmount)} FCFA</strong>
                 </div>

                 <div class="invoice-footer" style="margin-top: 40px; padding-top: 10px; border-top: 1px solid #eee; font-size: 8pt; text-align: center; color: #555;">
                     Merci de votre confiance.<br>
                     LA CHARITÉ MODESTE - IFU: [Numéro IFU] - RCCM: [Numéro RCCM]
                 </div>
             </div>
         `;
         return html;
     }

    if (previewPrintInvoiceButton && !previewPrintInvoiceButton._hasClickListener) {
        previewPrintInvoiceButton.addEventListener('click', () => {
            if (!currentUser || !(currentUser.status === 'Administrateur' || currentUser.status === 'Editeur')) { alert("Accès Refusé."); return; }
            let isValid = true; invoiceGeneratorForm?.querySelectorAll('.invalid-field').forEach(el => el.classList.remove('invalid-field'));
            if (!invoiceGenDateInput?.value) { isValid = false; invoiceGenDateInput?.classList.add('invalid-field'); }
            if (!invoiceGenClientNameInput?.value.trim()) { isValid = false; invoiceGenClientNameInput?.classList.add('invalid-field'); }
            if (!invoiceGenNumberInput?.value) { isValid = false; invoiceGenNumberInput?.classList.add('invalid-field'); }
            const items = []; const itemRows = invoiceItemsContainer?.querySelectorAll('.invoice-item-row');
            if (!itemRows || itemRows.length === 0) { alert("Ajoutez au moins une ligne."); return; }
            itemRows.forEach((row) => {
                const designationInput = row.querySelector('.item-designation'); const quantityInput = row.querySelector('.item-quantity'); const unitPriceInput = row.querySelector('.item-unit-price');
                const designation = designationInput?.value.trim(); const quantity = parseFloat(quantityInput?.value); const unitPrice = parseFloat(unitPriceInput?.value);
                let rowIsValid = true;
                if (!designation) { isValid = false; rowIsValid = false; designationInput?.classList.add('invalid-field'); }
                if (isNaN(quantity) || quantity < 0) { isValid = false; rowIsValid = false; quantityInput?.classList.add('invalid-field'); }
                if (isNaN(unitPrice) || unitPrice < 0) { isValid = false; rowIsValid = false; unitPriceInput?.classList.add('invalid-field'); }
                if (rowIsValid) { items.push({ designation, quantity, unitPrice, total: quantity * unitPrice }); }
            });
            if (!isValid) { alert("Vérifiez champs en rouge."); const firstInvalid = invoiceGeneratorForm?.querySelector('.invalid-field'); firstInvalid?.scrollIntoView({ behavior: 'smooth', block: 'center' }); firstInvalid?.focus(); return; }
            calculateInvoiceTotal(); const finalTotalAmount = parseFloat(invoiceGenTotalAmountInput.value);
            const invoiceData = { date: invoiceGenDateInput.value, number: invoiceGenNumberInput.value, clientName: invoiceGenClientNameInput.value.trim(), clientContact: invoiceGenClientContactInput?.value.trim() || '', items: items, totalAmount: finalTotalAmount, totalWords: numberToWordsFrench(finalTotalAmount) };
            const invoiceHTML = generateInvoiceHTML(invoiceData); const invoiceArea = document.getElementById('invoice-print-area');
            if (invoiceArea) { invoiceArea.innerHTML = invoiceHTML; printElement('invoice-print-area'); }
            else { alert("Erreur critique: Zone impression facture introuvable."); }
        });
        previewPrintInvoiceButton._hasClickListener = true;
    }


    // --- Login and Logout Logic ---
    function handleLogin(event) {
        event.preventDefault();
        const username = loginUsernameInput.value.trim(); const password = loginPasswordInput.value;
        if (!username || !password) { loginErrorMessage.textContent = "Nom d'utilisateur et mot de passe requis."; loginErrorMessage.classList.remove('hidden'); return; }
        // INSECURE LOGIN - Replace with Firebase Auth in a real app
        const foundUser = adminData.find(user => user.username === username && user.password === password);
        if (foundUser) {
            console.log(`Connecté: ${username}, Statut: ${foundUser.status}`);
            currentUser = { username: foundUser.username, status: foundUser.status };
            if (loginContainer) loginContainer.classList.add('hidden');
            if (mainAppContainer) mainAppContainer.classList.remove('hidden');
            loginForm.reset(); loginErrorMessage.classList.add('hidden');
            initializeAppUI(); // Initialize UI AFTER successful login
        } else {
            console.log("Échec connexion pour:", username);
            loginErrorMessage.textContent = "Nom d'utilisateur ou mot de passe incorrect.";
            loginErrorMessage.classList.remove('hidden'); currentUser = null;
        }
    }

    function handleLogout() {
         if (confirm("Voulez-vous vraiment vous déconnecter ?")) {
             // Detach Firebase listener
             if (firebaseListenerHandle) {
                 dataRef.off('value', firebaseListenerHandle);
                 firebaseListenerHandle = null;
                 console.log("Firebase listener détaché.");
             }

             currentUser = null;
             if (mainAppContainer) mainAppContainer.classList.add('hidden');
             if (loginContainer) loginContainer.classList.remove('hidden');
             const allSections = [supplySection, salesSection, employeesSection, learnersSection, mobileMoneySection, creditorsSection, debtSection, reportSection, invoiceGeneratorSection, adminSection].filter(Boolean);
             allSections.forEach(section => { if(section) section.classList.add('hidden'); });
             if (userInfoUsernameSpan) userInfoUsernameSpan.textContent = '';
             if (userInfoStatusSpan) userInfoStatusSpan.textContent = '';
              // Re-disable login button until data is potentially reloaded on next login attempt
              if(loginForm) loginForm.querySelector('button[type="submit"]').disabled = true;
             console.log("Utilisateur déconnecté.");

             // Re-attach listener for next login attempt
             attachFirebaseListener();
         }
    }

    // --- Initialisation ---
    // Function to attach the Firebase listener
    function attachFirebaseListener() {
        if (!firebaseListenerHandle) { // Only attach if not already attached
            firebaseListenerHandle = dataRef.on('value', handleFirebaseDataUpdate, (error) => {
                console.error("Erreur écoute Firebase:", error);
                alert("Erreur de connexion à la base de données en temps réel. Certaines fonctionnalités peuvent être indisponibles.");
                // Potentially disable UI elements or show a persistent error message
                if(loginForm) loginForm.querySelector('button[type="submit"]').disabled = true;
                if(loginErrorMessage){
                     loginErrorMessage.textContent = "Erreur de connexion temps réel.";
                     loginErrorMessage.classList.remove('hidden');
                }
            });
            console.log("Firebase listener attaché.");
        }
    }

    // Initial attach
    attachFirebaseListener();

    // Add form/button listeners (only once)
    if (loginForm && !loginForm._hasSubmitListener) {
         loginForm.addEventListener('submit', handleLogin);
         loginForm._hasSubmitListener = true;
         // Initially disable login button until first data load
         loginForm.querySelector('button[type="submit"]').disabled = true;
    } else if (!loginForm) {
         console.error("Login form not found!");
         alert("Erreur critique : Formulaire de connexion manquant.");
    }

    if(logoutButton && !logoutButton._hasClickListener) {
         logoutButton.addEventListener('click', handleLogout);
         logoutButton._hasClickListener = true;
    }

    // Event Listener for Global Search
    if (globalSearchInput && !globalSearchInput._hasInputListener) {
        globalSearchInput.addEventListener('input', filterTablesByDesignation);
        globalSearchInput._hasInputListener = true; // Prevent adding multiple listeners
    }

    // NEW: Add Event Listeners for Per-Table Search Inputs
    document.querySelectorAll('.table-search-container input[type="search"]').forEach(input => {
        if (!input._hasTableSearchListener) {
            input.addEventListener('input', () => filterSpecificTable(input));
            input._hasTableSearchListener = true;
        }
    });

    // Show login screen by default
    if (loginContainer) loginContainer.classList.remove('hidden');
    if (mainAppContainer) mainAppContainer.classList.add('hidden');

    // Set footer year
    const footerYearSpan = document.getElementById('footer-year');
    if (footerYearSpan) { footerYearSpan.textContent = new Date().getFullYear(); }

}); // End DOMContentLoaded