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
    const invoiceCounterRef = database.ref('gestionnaireSettings/invoiceCounter');
    const generatedInvoicesRef = database.ref('generatedInvoices'); // NEW: Firebase reference for generated invoices
    let firebaseListenerHandle = null;

    // --- Constants ---
    const ESTABLISHMENT_NAME = "ETS LA CHARITÉ MODESTE"; // MODIFIED: Changed name to ETS
    const COMPANY_INFO_PRINT = `TOUS TRAVAUX DE SECRETARIAT : Photocopie-Saisie, Tirage, Plastification-Vente Des<br> fournitures scolaires – Vente des ampoules électriques Etc.....<br> N°RCCM: RB / PK 0/A5519 /IFU 0201810420946<br> PARAKOU (Rép Du Bénin) - Tél: 61 71 36 92 / 64 41 58 95 `;
    const LOGO_PATH = 'logo.jpg';

    // --- Login Elements ---
    const loginContainer = document.getElementById('login-container');
    const loginForm = document.getElementById('login-form');
    const loginUsernameInput = document.getElementById('login-username');
    const loginPasswordInput = document.getElementById('login-password');
    const loginErrorMessage = document.getElementById('login-error-message');
    const loginButton = document.getElementById('login-button');
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
    const equipmentForm = document.getElementById('equipment-form');
    const pieceEnLigneForm = document.getElementById('piece-en-ligne-form');
    const wifiZoneForm = document.getElementById('wifi-zone-form');

    const showSupplySectionButton = document.getElementById('show-supply-section');
    const showSalesSectionButton = document.getElementById('show-sales-section');
    const showEmployeesSectionButton = document.getElementById('show-employees-section');
    const showLearnersSectionButton = document.getElementById('show-learners-section');
    const showMobileMoneySectionButton = document.getElementById('show-mobile-money-section');
    const showCreditorsSectionButton = document.getElementById('show-creditors-section');
    const showDebtSectionButton = document.getElementById('show-debt-section');
    const generateInvoiceButton = document.getElementById('generate-invoice-button');
    const showInvoiceHistorySectionButton = document.getElementById('show-invoice-history-section'); // NEW BUTTON
    const showReportSectionButton = document.getElementById('show-report-section');
    const showAdminSectionButton = document.getElementById('show-admin-section');
    const showEquipmentSectionButton = document.getElementById('show-equipment-section');
    const showPieceEnLigneSectionButton = document.getElementById('show-piece-en-ligne-section');
    const showWifiZoneSectionButton = document.getElementById('show-wifi-zone-section');

    const supplySection = document.getElementById('supply-section');
    const salesSection = document.getElementById('sales-section');
    const employeesSection = document.getElementById('employees-section');
    const learnersSection = document.getElementById('learners-section');
    const mobileMoneySection = document.getElementById('mobile-money-section');
    const creditorsSection = document.getElementById('creditors-section');
    const debtSection = document.getElementById('debt-section');
    const reportSection = document.getElementById('report-section');
    const invoiceGeneratorSection = document.getElementById('invoice-generator-section');
    const invoiceHistorySection = document.getElementById('invoice-history-section'); // NEW SECTION
    const adminSection = document.getElementById('admin-section');
    const equipmentSection = document.getElementById('equipment-section');
    const pieceEnLigneSection = document.getElementById('piece-en-ligne-section');
    const wifiZoneSection = document.getElementById('wifi-zone-section');
    const globalSearchInput = document.getElementById('global-search-input');

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
    const equipmentTable = document.getElementById('equipment-table')?.querySelector('tbody');
    const pieceEnLigneTable = document.getElementById('piece-en-ligne-table')?.querySelector('tbody');
    const wifiZoneTable = document.getElementById('wifi-zone-table')?.querySelector('tbody');
    const invoiceHistoryTable = document.getElementById('invoice-history-table')?.querySelector('tbody'); // NEW TABLE


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
    const showEquipmentDetailsButton = document.getElementById('show-equipment-details-button');
    const showPieceEnLigneDetailsButton = document.getElementById('show-piece-en-ligne-details-button');
    const showWifiZoneDetailsButton = document.getElementById('show-wifi-zone-details-button');


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
    const equipmentDetailsContainer = document.getElementById('equipment-details-container');
    const pieceEnLigneDetailsContainer = document.getElementById('piece-en-ligne-details-container');
    const wifiZoneDetailsContainer = document.getElementById('wifi-zone-details-container');
    const invoiceHistoryDetailsContainer = document.getElementById('invoice-history-section'); // NEW: For invoice history section itself


    // --- Boutons Print/Export ---
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
    const printEquipmentButton = document.getElementById('print-equipment');
    const printPieceEnLigneButton = document.getElementById('print-piece-en-ligne');
    const printWifiZoneButton = document.getElementById('print-wifi-zone');
    const printInvoiceHistoryButton = document.getElementById('print-invoice-history'); // NEW

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
    const exportEquipmentExcelButton = document.getElementById('export-equipment-excel');
    const exportPieceEnLigneExcelButton = document.getElementById('export-piece-en-ligne-excel');
    const exportWifiZoneExcelButton = document.getElementById('export-wifi-zone-excel');
    const exportInvoiceHistoryExcelButton = document.getElementById('export-invoice-history-excel'); // NEW

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
    const exportEquipmentPdfButton = document.getElementById('export-equipment-pdf');
    const exportPieceEnLignePdfButton = document.getElementById('export-piece-en-ligne-pdf');
    const exportWifiZonePdfButton = document.getElementById('export-wifi-zone-pdf');
    const exportInvoiceHistoryPdfButton = document.getElementById('export-invoice-history-pdf'); // NEW


    // --- Champs Formulaire ---
    const supplyDateInput = document.getElementById('supply-date');
    const supplyTypeSelect = document.getElementById('supply-type');
    const supplyDesignationInput = document.getElementById('supply-designation');
    const supplyQuantityInput = document.getElementById('supply-quantity');
    const supplyUnitPriceInput = document.getElementById('supply-unit-price');
    const supplyTotalAmountInput = document.getElementById('supply-total-amount');
    const supplyUserConnectedInput = document.getElementById('supply-user-connected');
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
    const permEmpReqDateInput = document.getElementById('perm-emp-req-date');
    const permEmpNameSelect = document.getElementById('perm-emp-name');
    const permEmpCategorySelect = document.getElementById('perm-emp-category');
    const permEmpDateInput = document.getElementById('perm-emp-date');
    const permEmpReasonTextarea = document.getElementById('perm-emp-reason');
    const permEmpUserConnectedInput = document.getElementById('perm-emp-user-connected');
    const permLrnReqDateInput = document.getElementById('perm-lrn-req-date');
    const permLrnNameSelect = document.getElementById('perm-lrn-name');
    const permLrnCategorySelect = document.getElementById('perm-lrn-category');
    const permLrnDateInput = document.getElementById('perm-lrn-date');
    const permLrnReasonTextarea = document.getElementById('perm-lrn-reason');
    const permLrnUserConnectedInput = document.getElementById('perm-lrn-user-connected');
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
    const mmFournisseurNomInput = document.getElementById('mm-fournisseur-nom');
    const mmFournisseurPrenomInput = document.getElementById('mm-fournisseur-prenom');
    const mmFournisseurContactInput = document.getElementById('mm-fournisseur-contact');
    const mmFournisseurMontantInput = document.getElementById('mm-fournisseur-montant');
    const mmFournisseurInteretInput = document.getElementById('mm-fournisseur-interet');
    const mmFournisseurVenduInput = document.getElementById('mm-fournisseur-vendu');
    const mmFournisseurUserConnectedInput = document.getElementById('mm-fournisseur-user-connected');
    const clientProfileNomInput = document.getElementById('client-profile-nom');
    const clientProfilePrenomInput = document.getElementById('client-profile-prenom');
    const clientProfileAdresseInput = document.getElementById('client-profile-adresse');
    const clientProfileContactInput = document.getElementById('client-profile-contact');
    const clientProfileStatutInput = document.getElementById('client-profile-statut');
    const clientUserConnectedInput = document.getElementById('client-user-connected');
    const creditorDateInput = document.getElementById('creditor-date');
    const creditorNameSelect = document.getElementById('creditor-name');
    const creditorUserConnectedInput = document.getElementById('creditor-user-connected');
    const creditorDesignationSelect = document.getElementById('creditor-designation'); // MODIFIED: Changed to select
    const creditorCustomDesignationInput = document.getElementById('creditor-custom-designation'); // NEW
    const creditorQuantityInput = document.getElementById('creditor-quantity');
    const creditorUnitPriceInput = document.getElementById('creditor-unit-price');
    const creditorTotalAmountDueInput = document.getElementById('creditor-total-amount-due');
    const creditorAmountPaidInput = document.getElementById('creditor-amount-paid');
    const creditorDueDateInput = document.getElementById('creditor-due-date');
    const creditorContactInput = document.getElementById('creditor-contact');

    // NEW: Creditor Summary Display Elements
    const selectedClientSummaryDiv = document.getElementById('selected-client-summary');
    const clientSummaryTotalDueSpan = document.getElementById('client-summary-total-due');
    const clientSummaryTotalPaidSpan = document.getElementById('client-summary-total-paid');
    const clientSummaryRemainingSpan = document.getElementById('client-summary-remaining');
    const clientSummaryDesignationsList = document.getElementById('client-summary-designations-list');


    const debtDateInput = document.getElementById('debt-date');
    const debtTypeSelect = document.getElementById('debt-type');
    const debtNameInput = document.getElementById('debt-name');
    const debtUserConnectedInput = document.getElementById('debt-user-connected');
    const debtDescriptionInput = document.getElementById('debt-description');
    const debtAmountInput = document.getElementById('debt-amount');
    const debtDueDateInput = document.getElementById('debt-due-date');
    const debtStatusSelect = document.getElementById('debt-status');
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
    const invoiceGenDateInput = document.getElementById('invoice-gen-date');
    const invoiceGenClientNameInput = document.getElementById('invoice-gen-client-name');
    const invoiceGenClientContactInput = document.getElementById('invoice-gen-client-contact');
    const invoiceGenNumberInput = document.getElementById('invoice-gen-number');
    const invoiceItemsContainer = document.getElementById('invoice-items-container');
    const addInvoiceItemButton = document.getElementById('add-invoice-item-button');
    const invoiceGenTotalAmountInput = document.getElementById('invoice-gen-total-amount');
    const invoiceGenTotalWordsInput = document.getElementById('invoice-gen-total-words');
    const previewPrintInvoiceButton = document.getElementById('preview-print-invoice-button');
    const exportInvoicePdfButton = document.getElementById('export-invoice-pdf-button');
    const saveUpdateInvoiceButton = document.getElementById('save-update-invoice-button'); // NEW BUTTON
    const adminUsernameInput = document.getElementById('admin-username');
    const adminPostInput = document.getElementById('admin-post');
    const adminPasswordInput = document.getElementById('admin-password');
    const adminStatusSelect = document.getElementById('admin-status');
    const adminOpUserConnectedInput = document.getElementById('admin-op-user-connected');
    const equipmentNameInput = document.getElementById('equipment-name');
    const equipmentQuantityInput = document.getElementById('equipment-quantity');
    const equipmentAssignedDateInput = document.getElementById('equipment-assigned-date');
    const equipmentUserConnectedInput = document.getElementById('equipment-user-connected');
    const equipmentAccessoriesInput = document.getElementById('equipment-accessories');
    const equipmentEmployeeNameSelect = document.getElementById('equipment-employee-name');
    const equipmentOtherInfoTextarea = document.getElementById('equipment-other-info');
    // NEW Piece en Ligne fields
    const pieceEnLigneDateInput = document.getElementById('piece-en-ligne-date');
    const pieceEnLigneDesignationSelect = document.getElementById('piece-en-ligne-designation');
    const pieceEnLigneUnitPriceInput = document.getElementById('piece-en-ligne-unit-price');
    const pieceEnLigneQuantityInput = document.getElementById('piece-en-ligne-quantity');
    const pieceEnLigneTotalAmountInput = document.getElementById('piece-en-ligne-total-amount');
    const pieceEnLigneUserConnectedInput = document.getElementById('piece-en-ligne-user-connected');
    // NEW WIFI Zone fields
    const wifiZoneDateInput = document.getElementById('wifi-zone-date');
    const wifiZoneDesignationSelect = document.getElementById('wifi-zone-designation');
    const wifiZoneUnitPriceInput = document.getElementById('wifi-zone-unit-price');
    const wifiZoneQuantityInput = document.getElementById('wifi-zone-quantity');
    const wifiZoneTotalAmountInput = document.getElementById('wifi-zone-total-amount');
    const wifiZoneUserConnectedInput = document.getElementById('wifi-zone-user-connected');


    // Hidden edit fields
    const supplyEditIndexInput = document.getElementById('supply-edit-index');
    const salesEditIndexInput = document.getElementById('sales-edit-index');
    const salesEditTypeInput = document.getElementById('sales-edit-type');
    const employeeEditIndexInput = document.getElementById('employee-edit-index');
    const learnerEditIndexInput = document.getElementById('learner-edit-index');
    const mobileMoneyEditIndexInput = document.getElementById('mobile-money-edit-index');
    const mmFournisseurEditKeyInput = document.getElementById('mm-fournisseur-edit-key');
    const clientProfileEditKeyInput = document.getElementById('client-profile-edit-key');
    const creditorEditIndexInput = document.getElementById('creditor-edit-index'); // NEW: Hidden field for editing transactions
    const debtEditIndexInput = document.getElementById('debt-edit-index');
    const adminEditKeyInput = document.getElementById('admin-edit-key');
    const equipmentEditIndexInput = document.getElementById('equipment-edit-index');
    const pieceEnLigneEditIndexInput = document.getElementById('piece-en-ligne-edit-index');
    const wifiZoneEditIndexInput = document.getElementById('wifi-zone-edit-index');
    const invoiceEditIdInput = document.getElementById('invoice-edit-id'); // NEW: Hidden field for editing invoices


    // Invoice Counter
    let invoiceItemIndex = 1; // Used for unique IDs for invoice item rows in the generator form
    let localInvoiceCounter = 1; // The counter stored in Firebase for new invoice numbers

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
    let equipmentData = [];
    let pieceEnLigneData = [];
    let wifiZoneData = [];
    let generatedInvoicesData = []; // NEW: Array to hold generated invoice objects


    // --- Login State ---
    let currentUser = null;

    // --- Utility Functions ---
    function formatAmount(amount) { const num = parseFloat(amount); return !isNaN(num) ? num.toFixed(2) : '0.00'; }
    function updateProductDesignationsForCategory(category) { let targetSelect; let sourceData = []; if (category === 'Papeterie') { targetSelect = saleDesignationSelect; sourceData = stockData.filter(item => item.type === 'Papeterie' && item.remainingQuantity > 0); } else if (category === 'Matériels électrique') { targetSelect = meDesignationSelect; sourceData = stockData.filter(item => item.type === 'Matériels électrique' && item.remainingQuantity > 0); } else { if (saleDesignationSelect) saleDesignationSelect.innerHTML = '<option value="">-- Choisir --</option>'; if (meDesignationSelect) meDesignationSelect.innerHTML = '<option value="">-- Choisir --</option>'; return; } if (!targetSelect) return; const currentValue = targetSelect.value; const designations = [...new Set(sourceData.map(item => item.designation))].sort((a, b) => (a || '').localeCompare(b || '')); targetSelect.innerHTML = '<option value="">-- Choisir --</option>' + designations.map(designation => `<option value="${designation}" ${designation === currentValue ? 'selected' : ''}>${designation}</option>`).join(''); if (!designations.includes(currentValue)) { targetSelect.selectedIndex = 0; } else { targetSelect.value = currentValue; } }
    function calculateTotalAmount(quantityInput, unitPriceInput, totalAmountInput) { if (!quantityInput || !unitPriceInput || !totalAmountInput) return; const quantity = parseFloat(quantityInput.value) || 0; const unitPrice = parseFloat(unitPriceInput.value) || 0; totalAmountInput.value = formatAmount(quantity * unitPrice); }
    function calculateCreditorTotalAmount() { if (creditorQuantityInput?.value && creditorUnitPriceInput?.value && creditorTotalAmountDueInput) { calculateTotalAmount(creditorQuantityInput, creditorUnitPriceInput, creditorTotalAmountDueInput); } else if (creditorTotalAmountDueInput && !creditorQuantityInput?.value && !creditorUnitPriceInput?.value) { /* Do nothing if no quantity/price and already calculated */ } } //
    function setTodaysDate() { const today = new Date().toISOString().split('T')[0]; const now = new Date(); const year = now.getFullYear(); const month = (now.getMonth() + 1).toString().padStart(2, '0'); ['sale-date', 'supply-date', 'mm-date', 'creditor-date', 'creditor-due-date', 'employee-hire-date', 'debt-date', 'debt-due-date', 'report-date', 'perm-emp-req-date', 'perm-lrn-req-date', 'invoice-gen-date', 'equipment-assigned-date', 'piece-en-ligne-date', 'wifi-zone-date'].forEach(id => { const element = document.getElementById(id); if (element && element.type === 'date' && !element.value) { element.value = today; } }); if (reportYearInput && !reportYearInput.value) reportYearInput.value = year; if(reportMonthInput && !reportMonthInput.value) reportMonthInput.value = `${year}-${month}`; if(reportWeekInput && !reportWeekInput.value){ try { const currentThursday = new Date(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate())); currentThursday.setUTCDate(currentThursday.getUTCDate() + 4 - (currentThursday.getUTCDay() || 7)); const yearStart = new Date(Date.UTC(currentThursday.getUTCFullYear(), 0, 1)); const weekNo = Math.ceil((((currentThursday - yearStart) / 86400000) + 1) / 7); const weekYear = currentThursday.getUTCFullYear(); reportWeekInput.value = `${weekYear}-W${weekNo.toString().padStart(2,'0')}`; } catch (dateError) { console.error("Erreur calcul semaine par défaut:", dateError); } } }
    function toggleVisibility(element) { //
        if (element) {
            element.classList.toggle('hidden');
            if (!element.classList.contains('hidden')) {
                element.scrollIntoView({ behavior: 'smooth', block: 'start' }); // Scroll to element if it becomes visible
            }
        }
    }
    function toggleSalesSubSectionVisibility(containerToShow) { const allSalesSubSections = [ salesDetailsContainer, materielElectriqueDetailsContainer, expensesDetailsContainer, othersDetailsContainer ]; allSalesSubSections.forEach(container => { if (container) { if (container === containerToShow && container.classList.contains('hidden')) { container.classList.remove('hidden'); } else if (container !== containerToShow) { container.classList.add('hidden'); } else if (container === containerToShow && !container.classList.contains('hidden')) { container.classList.add('hidden'); } } }); }
    function setSectionVisibility(sectionToShow, sectionsToHide) {
        if (!sectionToShow) return;
        sectionsToHide.forEach(section => { if(section) section.classList.add('hidden'); });
        sectionToShow.classList.remove('hidden');

        // Scroll to the top of the visible section
        sectionToShow.scrollIntoView({ behavior: 'smooth', block: 'start' });

        const nonToggleDetails = [ reportDetailsContainer, reportFilters, showReportDetailsButton, document.getElementById('invoice-print-area') ].filter(Boolean);
        nonToggleDetails.forEach(container => container.classList.add('hidden'));

        // Reset edit indices and button text when switching sections
        if (supplyEditIndexInput) supplyEditIndexInput.value = '';
        if (supplyForm) supplyForm.querySelector('button[type="submit"]').textContent = 'Ajouter Approvisionnement';

        if (salesEditIndexInput) salesEditIndexInput.value = '';
        if (salesEditTypeInput) salesEditTypeInput.value = '';
        if (salesForm) salesForm.querySelector('button[type="submit"]').textContent = 'Ajouter';

        if (employeeEditIndexInput) employeeEditIndexInput.value = '';
        if (employeeForm) employeeForm.querySelector('button[type="submit"]').textContent = 'Ajouter Employé';

        if (learnerEditIndexInput) learnerEditIndexInput.value = '';
        if (learnerForm) learnerForm.querySelector('button[type="submit"]').textContent = 'Ajouter Apprenant';

        if (mobileMoneyEditIndexInput) mobileMoneyEditIndexInput.value = '';
        if (mobileMoneyForm) mobileMoneyForm.querySelector('button[type="submit"]').textContent = 'Ajouter Point Journalier';

        if (mmFournisseurEditKeyInput) mmFournisseurEditKeyInput.value = '';
        if (mmFournisseurForm) mmFournisseurForm.querySelector('button[type="submit"]').textContent = 'Ajouter / Mettre à Jour Fournisseur';

        if (clientProfileEditKeyInput) clientProfileEditKeyInput.value = '';
        if (clientProfileForm) clientProfileForm.querySelector('button[type="submit"]').textContent = 'Ajouter / Mettre à Jour Profil';

        if (creditorEditIndexInput) creditorEditIndexInput.value = ''; // NEW: Reset creditor edit index
        if (creditorForm) creditorForm.querySelector('button[type="submit"]').textContent = 'Ajouter Paiement / Créer Crédit'; // NEW: Reset creditor button text

        if (debtEditIndexInput) debtEditIndexInput.value = '';
        if (debtForm) debtForm.querySelector('button[type="submit"]').textContent = 'Ajouter Dette/Prêt';

        if (adminEditKeyInput) adminEditKeyInput.value = '';
        if (adminForm) {
            adminForm.querySelector('button[type="submit"]').textContent = 'Ajouter / Mettre à Jour Utilisateur';
            adminPasswordInput.placeholder = "Entrer pour définir/modifier";
        }

        if (equipmentEditIndexInput) equipmentEditIndexInput.value = '';
        if (equipmentForm) equipmentForm.querySelector('button[type="submit"]').textContent = 'Ajouter Appareil Confié';

        if (pieceEnLigneEditIndexInput) pieceEnLigneEditIndexInput.value = '';
        if (pieceEnLigneForm) pieceEnLigneForm.querySelector('button[type="submit"]').textContent = 'Ajouter Pièce en Ligne';

        if (wifiZoneEditIndexInput) wifiZoneEditIndexInput.value = '';
        if (wifiZoneForm) wifiZoneForm.querySelector('button[type="submit"]').textContent = 'Ajouter Entrée WIFI';

        // When showing invoice section, initialize the form (this generates the next invoice number)
        if (invoiceGeneratorSection && sectionToShow === invoiceGeneratorSection) {
            initializeInvoiceForm();
        }
        // NEW: Clear invoice edit ID when navigating away from invoice generator or history
        if (invoiceEditIdInput && sectionToShow !== invoiceGeneratorSection && sectionToShow !== invoiceHistorySection) {
            invoiceEditIdInput.value = '';
        }
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
        Object.values(subForms).forEach(form => { if (form) form.style.display = 'none'; });
        const formToShow = subForms[type];
        if (formToShow) { formToShow.style.display = 'flex'; }
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

    // --- NEW: Helper to get Title ---
    function getPrintExportTitle(containerId) {
        const container = document.getElementById(containerId);
        const h3 = container?.querySelector('h3');
        if (containerId === 'report-details-container' && h3) {
            return h3.innerText;
        }
        return h3?.innerText || 'Détails';
    }

    // --- MODIFIED printSpecificTable ---
    function printSpecificTable(containerId) { //
        const containerToPrint = document.getElementById(containerId);
        if (!containerToPrint) {
            console.error("Conteneur à imprimer non trouvé:", containerId);
            alert("Erreur: Impossible de trouver le contenu à imprimer.");
            return;
        }

        const tableTitle = getPrintExportTitle(containerId);

        // Create temporary header
        const tempHeader = document.createElement('div');
        tempHeader.id = 'print-header-temp';
        tempHeader.innerHTML = `
            <img src="${LOGO_PATH}" alt="Logo" class="print-logo-temp">
            <div class="print-header-text">
                <h2>${ESTABLISHMENT_NAME}</h2>
                <h3>${tableTitle}</h3>
            </div>
            `;

        containerToPrint.prepend(tempHeader);

        document.body.classList.add('printing-active');
        containerToPrint.classList.add('show-in-print');

        const afterPrintHandler = () => {
            document.body.classList.remove('printing-active');
            containerToPrint.classList.remove('show-in-print');
            const headerToRemove = document.getElementById('print-header-temp');
            if (headerToRemove) {
                headerToRemove.remove();
            }
            window.removeEventListener('afterprint', afterPrintHandler);
            window.removeEventListener('unload', afterPrintHandler);
        };
        window.addEventListener('afterprint', afterPrintHandler);
        window.addEventListener('unload', afterPrintHandler);

        try {
            window.print();
            setTimeout(() => {
                if (document.body.classList.contains('printing-active')) {
                    afterPrintHandler();
                }
            }, 1500);
        } catch (e) {
            console.error("Erreur window.print():", e);
            alert("Erreur lors du lancement de l'impression.");
            afterPrintHandler();
        }
    }

    // --- Helper to increment and save invoice counter ---
    async function incrementAndSaveInvoiceCounter() { //
        const nextCounterValue = localInvoiceCounter + 1;
        try {
            await invoiceCounterRef.set(nextCounterValue);
            localInvoiceCounter = nextCounterValue;
            console.log("Compteur facture mis à jour à:", localInvoiceCounter);
            if (invoiceGeneratorSection && !invoiceGeneratorSection.classList.contains('hidden')) {
                 if(invoiceGenNumberInput) invoiceGenNumberInput.value = generateInvoiceNumber();
            }
        } catch (error) {
            console.error("Erreur sauvegarde compteur facture Firebase:", error);
            alert("Erreur sauvegarde du prochain numéro de facture. Veuillez vérifier la connexion.");
        }
    }

    // --- MODIFIED: printElement to handle invoice counter increment ---
    function printElement(elementId) { //
        const elementToPrint = document.getElementById(elementId);
        let hasVisibleContent = false;
        if (elementToPrint && elementToPrint.innerHTML) {
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = elementToPrint.innerHTML;
            if (tempDiv.querySelector('*')) {
                hasVisibleContent = true;
            }
        }
        if (!elementToPrint || !hasVisibleContent) {
            console.error("Print area empty or not found:", elementId);
            alert("Erreur: Contenu à imprimer vide ou introuvable (ID: " + elementId + "). Veuillez générer le contenu d'abord.");
            return;
        }

        const isInvoice = (elementId === 'invoice-print-area');

        document.body.classList.add('printing-invoice');
        elementToPrint.classList.add('show-in-print');
        elementToPrint.classList.remove('hidden');

        let printInitiated = false;

        const afterPrintHandler = () => {
            document.body.classList.remove('printing-invoice');
            elementToPrint.classList.remove('show-in-print');
            elementToPrint.classList.add('hidden');
            window.removeEventListener('afterprint', afterPrintHandler);
            window.removeEventListener('unload', afterPrintHandler);

            // Invoice counter is now handled by saveInvoiceToFirebase
            // if (isInvoice && printInitiated) {
            //      incrementAndSaveInvoiceCounter();
            // }
        };
        window.addEventListener('afterprint', afterPrintHandler);
        window.addEventListener('unload', afterPrintHandler);

        setTimeout(() => {
            try {
                window.print();
                printInitiated = true;
                setTimeout(() => {
                    if (document.body.classList.contains('printing-invoice')) {
                        afterPrintHandler();
                    }
                }, 1500);
            } catch (e) {
                console.error("Erreur window.print():", e);
                alert("Erreur lors du lancement de l'impression.");
                afterPrintHandler();
            }
        }, 100);
    }

    // --- MODIFIED EXCEL EXPORT FUNCTION ---
    function exportToExcel(tableId, fileName) { //
        try {
            const table = document.getElementById(tableId);
            if (!table) throw new Error(`Tableau ID '${tableId}' non trouvé.`);
            if (typeof XLSX === 'undefined') throw new Error("Librairie XLSX (SheetJS) non chargée.");

            const container = table.closest('.printable-content');
            const specificTitle = getPrintExportTitle(container?.id || tableId);

            const tableClone = table.cloneNode(true);
            const actionHeaderIndex = Array.from(tableClone.querySelectorAll('thead th')).findIndex(th => th.classList.contains('actions-header') || th.classList.contains('no-export'));
            if (actionHeaderIndex !== -1) {
                Array.from(tableClone.rows).forEach(row => {
                    if (row.cells.length > actionHeaderIndex) {
                        row.deleteCell(actionHeaderIndex);
                    }
                });
            }

            const worksheet = XLSX.utils.table_to_sheet(tableClone, { raw: true });

            const titleData = [
                [ESTABLISHMENT_NAME],
                [specificTitle],
                []
            ];

            XLSX.utils.sheet_add_aoa(worksheet, titleData, { origin: 'A1' });

            const range = XLSX.utils.decode_range(worksheet['!ref'] || 'A1');
            range.s.r = 0;
            if(range.e.r < 2) range.e.r = 2;
            worksheet['!ref'] = XLSX.utils.encode_range(range);

            const numCols = range.e.c;
            if (numCols > 0) {
                if (!worksheet['!merges']) worksheet['!merges'] = [];
                worksheet['!merges'].push({ s: { r: 0, c: 0 }, e: { r: 0, c: numCols } });
                worksheet['!merges'].push({ s: { r: 1, c: 0 }, e: { r: 1, c: numCols } });

                if(!worksheet['A1']) worksheet['A1'] = { t:'s', v: ESTABLISHMENT_NAME };
                worksheet['A1'].s = { font: { bold: true, sz: 14 }, alignment: { horizontal: "center" } };
                if(!worksheet['A2']) worksheet['A2'] = { t:'s', v: specificTitle };
                worksheet['A2'].s = { font: { bold: true, sz: 12 }, alignment: { horizontal: "center" } };
            }

            const columnWidths = [];
            const tableHeaderRowNum = 3;
            for (let C = range.s.c; C <= range.e.c; ++C) {
                let maxLen = 0;
                const headerAddr = {c: C, r: tableHeaderRowNum};
                const headerRef = XLSX.utils.encode_cell(headerAddr);
                if(worksheet[headerRef]) maxLen = String(worksheet[headerRef].v || '').length;

                for (let R = tableHeaderRowNum + 1; R <= range.e.r; ++R) {
                    const cellAddress = { c: C, r: R };
                    const cellRef = XLSX.utils.encode_cell(cellAddress);
                    if (!worksheet[cellRef]) continue;
                    const cellText = String(worksheet[cellRef].v ?? '');
                    if (cellText.length > maxLen) maxLen = cellText.length;
                }
                if (C === 0) {
                      maxLen = Math.max(maxLen, ESTABLISHMENT_NAME.length, specificTitle.length);
                 }
                columnWidths[C] = { wch: Math.max(12, maxLen + 4) };
            }
            if (columnWidths.length > 0) worksheet['!cols'] = columnWidths;


            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, "Données");
            XLSX.writeFile(workbook, fileName || "Export.xlsx");

        } catch (error) {
            console.error("Erreur export Excel:", error);
            alert(`Erreur lors de l'export Excel: ${error.message}`);
        }
    }

    // --- Function to load image and convert to Base64 ---
    async function getBase64Image(imgUrl) { //
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.crossOrigin = 'Anonymous';
            img.onload = () => {
                const canvas = document.createElement('canvas');
                canvas.width = img.naturalWidth;
                canvas.height = img.naturalHeight;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0);
                try {
                    const dataURL = canvas.toDataURL('image/jpeg');
                    resolve(dataURL);
                } catch (e) {
                     console.error("Error converting canvas to Data URL:", e);
                     reject("Erreur conversion image en Base64.");
                }
            };
            img.onerror = (e) => {
                console.error("Error loading image for PDF export:", e);
                reject(`Impossible de charger le logo depuis ${imgUrl}`);
            };
            img.src = imgUrl;
            setTimeout(() => reject(`Timeout chargement logo depuis ${imgUrl}`), 10000);
        });
    }


    // --- MODIFIED PDF EXPORT FUNCTION with Logo ---
    async function exportToPdf(tableId, fileName) { //
        try {
            if (typeof window.jspdf === 'undefined' || typeof window.jspdf.jsPDF === 'undefined' || typeof window.jspdf.jsPDF.API?.autoTable === 'undefined') {
                throw new Error("Librairies PDF (jsPDF, jsPDF-AutoTable) non chargées.");
            }

            const table = document.getElementById(tableId);
            if (!table) throw new Error(`Tableau ID '${tableId}' non trouvé.`);

            const container = table.closest('.printable-content');
            const specificTitle = getPrintExportTitle(container?.id || tableId);

            const { jsPDF } = window.jspdf;

            const allHeaders = Array.from(table.querySelectorAll('thead th'));
            const actionHeaderIndex = allHeaders.findIndex(th => th.classList.contains('actions-header') || th.classList.contains('no-export'));
            const colCount = allHeaders.length - (actionHeaderIndex > -1 ? 1 : 0);
            const orientation = colCount > 7 ? "landscape" : "portrait";

            const doc = new jsPDF({ orientation: orientation, unit: "pt", format: "a4" });
            const pageHeight = doc.internal.pageSize.height || doc.internal.pageSize.getHeight();
            const pageWidth = doc.internal.pageSize.width || doc.internal.pageSize.getWidth();
            const margin = 30;
            let currentY = margin;

            let logoDataUrl = null;
            try {
                 console.log("Tentative chargement logo pour PDF...");
                 logoDataUrl = await getBase64Image(LOGO_PATH);
                 console.log("Logo chargé avec succès.");
            } catch (error) {
                 console.warn("Impossible de charger/encoder le logo pour PDF:", error);
            }

            const logoHeight = 40;
            const logoWidth = 40;
            const logoX = margin;
            const textHeaderX = logoX + logoWidth + 10;
            const headerCenter = pageWidth / 2;
            if (logoDataUrl) {
                 doc.addImage(logoDataUrl, 'JPEG', logoX, currentY, logoWidth, logoHeight);
                 currentY += 5;
            }

            doc.setFontSize(14);
            doc.setFont(undefined, 'bold');
            doc.text(ESTABLISHMENT_NAME, headerCenter, currentY + (logoHeight / 2) - 6, { align: 'center' });

            doc.setFontSize(12);
            doc.setFont(undefined, 'normal');
            doc.text(specificTitle, headerCenter, currentY + (logoHeight / 2) + 10, { align: 'center' });

            currentY += logoHeight + 15;

            doc.autoTable({
                html: `#${tableId}`,
                startY: currentY,
                theme: 'grid',
                headStyles: { fillColor: [26, 58, 109], textColor: 255, fontStyle: 'bold', halign: 'center' }, // Corrected fillColor
                styles: { fontSize: orientation === "landscape" ? 8 : 9, cellPadding: 4, overflow: 'linebreak', lineWidth: 0.5, lineColor: [222, 226, 230] }, // Corrected lineColor
                alternateRowStyles: { fillColor: [248, 249, 250] }, // Corrected fillColor
                margin: { top: currentY, right: margin, bottom: 40, left: margin },
                tableWidth: 'auto',
                columns: allHeaders.map((_, index) => index).filter(index => index !== actionHeaderIndex),
                didParseCell: function(data) {
                    if (data.cell.section === 'body' && data.column.index !== undefined) {
                        let originalColIndex = -1; let currentExportedCol = -1;
                        for (let i = 0; i < allHeaders.length; i++) { if (i !== actionHeaderIndex) { currentExportedCol++; if (currentExportedCol === data.column.index) { originalColIndex = i; break; } } }
                        if (originalColIndex !== -1) {
                            const headerClasses = allHeaders[originalColIndex].classList;
                            if (['unit-price-col', 'salary-col', 'amount-col', 'total-cost-col', 'balance-col', 'credit-col', 'remaining-salary-col'].some(cls => headerClasses.contains(cls))) { data.cell.styles.halign = 'right'; }
                            else if (['quantity-col', 'supply-col', 'sold-col', 'remaining-col', 'age-col', 'interest-col', 'time-col'].some(cls => headerClasses.contains(cls))) { data.cell.styles.halign = 'center'; }
                            else { data.cell.styles.halign = 'left'; }
                            if (headerClasses.contains('user-col')) { data.cell.styles.fontStyle = 'italic'; data.cell.styles.fontSize = (data.cell.styles.fontSize || 9) * 0.9; data.cell.styles.textColor = [100, 100, 100]; } // Corrected textColor
                            if (['category-col', 'piece-designation-col', 'wifi-designation-col', 'invoice-number-col', 'invoice-client-col'].some(cls => headerClasses.contains(cls))) { data.cell.styles.halign = 'left'; } // NEW
                        }
                    }
                }
            });

            const pageCount = doc.internal.getNumberOfPages();
            doc.setFontSize(8);
            doc.setTextColor(100);
            for (let i = 1; i <= pageCount; i++) {
                doc.setPage(i);
                doc.text('Page ' + String(i) + '/' + String(pageCount), pageWidth - margin - 40, pageHeight - 20);
                doc.text(`Généré le: ${new Date().toLocaleDateString('fr-FR')}`, margin, pageHeight - 20);
            }

            doc.save(fileName || 'Export.pdf');

        } catch (error) {
            console.error("Erreur export PDF:", error);
            alert(`Erreur lors de l'export PDF: ${error.message}`);
        }
    }

    function getDateOfISOWeek(w, y) { try { const simple = new Date(Date.UTC(y, 0, 1 + (w - 1) * 7)); const dow = simple.getUTCDay(); const ISOweekStart = simple; ISOweekStart.setUTCDate(simple.getUTCDate() - dow + (dow === 0 ? -6 : 1)); return ISOweekStart; } catch (e) { console.error(`Error calculating start of week for ${y}-W${w}:`, e); return new Date(NaN); } }
    function populateEmployeeSelect(targetSelect) { if (!targetSelect || !employeesData) return; const currentVal = targetSelect.value; targetSelect.innerHTML = '<option value="">-- Choisir Employé --</option>'; const sortedEmployees = [...employeesData].sort((a, b) => (a.nom || '').localeCompare(b.nom || '')); sortedEmployees.forEach(emp => { const fullName = `${emp.nom || ''} ${emp.prenom || ''}`.trim(); if (fullName) { const option = document.createElement('option'); option.value = fullName; option.textContent = fullName; targetSelect.appendChild(option); } }); if (Array.from(targetSelect.options).some(opt => opt.value === currentVal)) { targetSelect.value = currentVal; } else { targetSelect.selectedIndex = 0; } }
    function populateLearnerSelectForPermission() { if (!permLrnNameSelect || !learnersData) return; const currentVal = permLrnNameSelect.value; permLrnNameSelect.innerHTML = '<option value="">-- Choisir Apprenant --</option>'; const sortedLearners = [...learnersData].sort((a, b) => (a.nom || '').localeCompare(b.nom || '')); sortedLearners.forEach(lrn => { const fullName = `${lrn.nom || ''} ${lrn.prenom || ''}`.trim(); if (fullName) { const option = document.createElement('option'); option.value = fullName; option.textContent = fullName; permLrnNameSelect.appendChild(option); } }); if (Array.from(permLrnNameSelect.options).some(opt => opt.value === currentVal)) { permLrnNameSelect.value = currentVal; } else { permLrnNameSelect.selectedIndex = 0; } }
    function generateInvoiceNumber() {
        const year = new Date().getFullYear();
        const number = localInvoiceCounter;
        return `FACT-${year}-${number.toString().padStart(5, '0')}`;
    }
    function numberToWordsFrench(num) { if (num === null || num === undefined || isNaN(num)) return ''; num = Math.abs(num); const belowTwenty = ["zéro", "un", "deux", "trois", "quatre", "cinq", "six", "sept", "huit", "neuf", "dix", "onze", "douze", "treize", "quatorze", "quinze", "seize", "dix-sept", "dix-huit", "dix-neuf"]; const tens = ["", "", "vingt", "trente", "quarante", "cinquante", "soixante", "soixante-dix", "quatre-vingt", "quatre-vingt-dix"]; const scales = ["", "mille", "million", "milliard", "billion"]; function convertChunk(n) { if (n === 0) return ''; if (n < 20) return belowTwenty[n]; if (n < 70) { let ten = Math.floor(n / 10); let unit = n % 10; if (unit === 0) return tens[ten]; if (unit === 1 && ten !== 8 && ten !== 9) return tens[ten] + "-et-" + belowTwenty[unit]; return tens[ten] + (unit ? "-" + belowTwenty[unit] : ""); } if (n < 80) { return "soixante" + (n === 71 ? "-et-" : "-") + belowTwenty[n - 60]; } if (n < 100) { if (n === 80) return tens[8] + "s"; if (n < 90) return tens[8] + "-" + belowTwenty[n - 80]; return tens[9] + "-" + belowTwenty[n - 90]; } let h = Math.floor(n / 100); let remainder = n % 100; let hWord = (h > 1 ? belowTwenty[h] + " " : "") + "cent"; if (h > 1 && remainder === 0) hWord += "s"; return hWord + (remainder === 0 ? "" : " " + convertChunk(remainder)); } if (num === 0) return "Zéro Francs CFA"; let word = ''; let i = 0; while (num > 0) { if (num % 1000 !== 0) { let chunk = num % 1000; let chunkWord = convertChunk(chunk); if (scales[i] === 'mille' && chunk === 1) { chunkWord = ''; } word = chunkWord + (scales[i] ? " " + scales[i] + (chunk > 1 && scales[i] !== 'mille' ? "s" : "") : "") + (word ? " " : "") + word; } num = Math.floor(num / 1000); i++; } if (i === 1 && word === "") word = "mille"; word = word.charAt(0).toUpperCase() + word.slice(1); return word.replace(/\s+/g, ' ').trim() + " Francs CFA"; }
    function updateConnectedUserFields() { const username = currentUser?.username || ''; const fields = document.querySelectorAll('.user-connected-field'); fields.forEach(field => { if (field instanceof HTMLInputElement) { field.value = username; } }); }

    /** Initializes the application UI - Called after login and on Firebase data update */
    function initializeAppUI() {
        if (localInvoiceCounter <= 1) {
            invoiceCounterRef.once('value').then(snapshot => {
                localInvoiceCounter = snapshot.val() || 1;
                console.log("Compteur facture initial chargé:", localInvoiceCounter);
                if (invoiceGeneratorSection && !invoiceGeneratorSection.classList.contains('hidden')) {
                    initializeInvoiceForm();
                }
            }).catch(error => {
                console.error("Erreur chargement compteur facture:", error);
                localInvoiceCounter = 1;
            });
        }


        setTodaysDate();
        updateStockTable();
        updateSupplyTable();
        updateSalesTable();
        updateMaterielElectriqueTable();
        updateExpensesTable();
        updateOthersTable();
        updateEmployeesTable();
        updateLearnersTable();
        populateEmployeeSelect(permEmpNameSelect);
        populateLearnerSelectForPermission();
        populateEmployeeSelect(equipmentEmployeeNameSelect);
        updateEmployeePermissionsTable();
        updateLearnerPermissionsTable();
        updateMobileMoneyTable();
        updateMmFournisseursTable();
        updateClientProfilesTable();
        populateClientSelect(); // IMPORTANT: This must be called after clientProfilesData is loaded
        updateCreditorsTable();
        updateDebtTable();
        updateEquipmentTable();
        updatePieceEnLigneTable();
        updateWifiZoneTable();
        updateAdminTable();
        updateInvoiceHistoryTable(); // NEW
        handleOperationTypeChange();

        if (!currentUser) {
            const allSections = [supplySection, salesSection, employeesSection, learnersSection, mobileMoneySection, creditorsSection, debtSection, reportSection, invoiceGeneratorSection, invoiceHistorySection, adminSection, equipmentSection, pieceEnLigneSection, wifiZoneSection].filter(Boolean); // MODIFIED
            allSections.forEach(section => { if(section) section.classList.add('hidden'); });
        }

        const nonToggleDetails = [ reportDetailsContainer, reportFilters, showReportDetailsButton, document.getElementById('invoice-print-area') ].filter(Boolean);
        nonToggleDetails.forEach(container => container.classList.add('hidden'));

        updateConnectedUserFields();

        applyRoleRestrictions();
        addDateSortListeners();

        if (currentUser) {
            if (userInfoUsernameSpan) userInfoUsernameSpan.textContent = currentUser.username;
            if (userInfoStatusSpan) userInfoStatusSpan.textContent = currentUser.status;
            checkAndShowPaymentAlert(); // Call the new payment alert function
            checkAndShowSubscriptionRenewalAlert(); // NEW: Call the subscription renewal alert
        } else {
             if (userInfoUsernameSpan) userInfoUsernameSpan.textContent = '';
             if (userInfoStatusSpan) userInfoStatusSpan.textContent = '';
        }

        filterTablesByDesignation();

        document.querySelectorAll('.table-search-container input[type="search"]').forEach(input => {
            filterSpecificTable(input);
        });
    }

    // --- Role-Based Restrictions (RBAC) ---
    function applyRoleRestrictions() { //
        const allSections = [supplySection, salesSection, employeesSection, learnersSection, mobileMoneySection, creditorsSection, debtSection, reportSection, invoiceGeneratorSection, invoiceHistorySection, adminSection, equipmentSection, pieceEnLigneSection, wifiZoneSection].filter(Boolean); // MODIFIED

        if (!currentUser) {
            document.querySelectorAll('.main-buttons button').forEach(el => el.style.display = 'none');
            allSections.forEach(section => { if(section) section.classList.add('hidden'); });
            document.querySelectorAll('form button[type="submit"]').forEach(btn => btn.disabled = true);
            document.querySelectorAll('.actions-cell .action-btn').forEach(btn => btn.disabled = true);
             if (addInvoiceItemButton) addInvoiceItemButton.disabled = true;
             if (previewPrintInvoiceButton) previewPrintInvoiceButton.disabled = true;
             if (exportInvoicePdfButton) exportInvoicePdfButton.disabled = true;
             if (saveUpdateInvoiceButton) saveUpdateInvoiceButton.disabled = true; // NEW
             if (generateReportButton) generateReportButton.disabled = true;
            return;
        }

        const status = currentUser.status;

        const isAdmin = status === 'Administrateur';
        const isEditor = status === 'Editeur';
        const isLecteur = status === 'Lecteur';
        const isRéseau = status === 'Réseau'; // NEW ROLE

        const allNavButtons = document.querySelectorAll('.main-buttons button');
        const allSubmitButtons = document.querySelectorAll('form button[type="submit"]');
        const allActionButtons = document.querySelectorAll('.actions-cell .action-btn');
        const reportPrintExportBtns = document.querySelectorAll('#report-details-container .button-group button');
        const allEditButtons = document.querySelectorAll('.actions-cell .edit-btn');
        const allDeleteButtons = document.querySelectorAll('.actions-cell .delete-btn');
        const allPayButtons = document.querySelectorAll('.actions-cell .pay-btn');
        const allPermissionButtons = document.querySelectorAll('#employee-permissions-table .action-btn, #learner-permissions-table .action-btn');
        const allInvoicePrintButtons = document.querySelectorAll('.actions-cell .invoice-btn');
        const allPrintExportButtons = document.querySelectorAll('.printable-content .button-group .print-export-btn');

        // By default, hide all and disable all
        allNavButtons.forEach(btn => btn.style.display = 'none');
        allSections.forEach(section => { if(section) section.classList.add('hidden'); }); // Ensure all sections are hidden initially
        allSubmitButtons.forEach(btn => btn.disabled = true);
        allActionButtons.forEach(btn => btn.disabled = true);
        if (addInvoiceItemButton) addInvoiceItemButton.disabled = true;
        if (previewPrintInvoiceButton) previewPrintInvoiceButton.disabled = true;
        if (exportInvoicePdfButton) exportInvoicePdfButton.disabled = true;
        if (saveUpdateInvoiceButton) saveUpdateInvoiceButton.disabled = true; // NEW
        if (generateReportButton) generateReportButton.disabled = true;
        reportPrintExportBtns.forEach(btn => btn.disabled = true);
        allPrintExportButtons.forEach(btn => btn.disabled = true);


        if (isAdmin) {
            allNavButtons.forEach(btn => btn.style.display = '');
            allSubmitButtons.forEach(btn => btn.disabled = false);
            updateAllTablesForPermissions(); // This enables/disables table actions based on current user's role

            if (addInvoiceItemButton) addInvoiceItemButton.disabled = false;
            if (previewPrintInvoiceButton) previewPrintInvoiceButton.disabled = false;
            if (exportInvoicePdfButton) exportInvoicePdfButton.disabled = false;
            if (saveUpdateInvoiceButton) saveUpdateInvoiceButton.disabled = false; // NEW
            document.querySelectorAll('.remove-invoice-item-btn').forEach(btn => btn.disabled = false);

            if (generateReportButton) generateReportButton.disabled = false;
            reportPrintExportBtns.forEach(btn => btn.disabled = false);
            allInvoicePrintButtons.forEach(btn => btn.disabled = false);
            allPrintExportButtons.forEach(btn => btn.disabled = false);

        } else if (isEditor) {
            // Sections visible to Editor
            if (showSupplySectionButton) showSupplySectionButton.style.display = '';
            if (showSalesSectionButton) showSalesSectionButton.style.display = '';
            // if (showEmployeesSectionButton) showEmployeesSectionButton.style.display = ''; // Hidden for Editor
            // if (showLearnersSectionButton) showLearnersSectionButton.style.display = ''; // Hidden for Editor
            // if (showMobileMoneySectionButton) showMobileMoneySectionButton.style.display = ''; // Hidden for Editor
            if (showCreditorsSectionButton) showCreditorsSectionButton.style.display = '';
            // if (showDebtSectionButton) showDebtSectionButton.style.display = ''; // Hidden for Editor
            if (showEquipmentSectionButton) showEquipmentSectionButton.style.display = '';
            if (showPieceEnLigneSectionButton) showPieceEnLigneSectionButton.style.display = ''; // MODIFIED: Visible for Editor
            // if (showWifiZoneSectionButton) showWifiZoneSectionButton.style.display = ''; // NEW: Hidden for Editor
            if (generateInvoiceButton) generateInvoiceButton.style.display = '';
            if (showInvoiceHistorySectionButton) showInvoiceHistorySectionButton.style.display = ''; // NEW: Visible for Editor
            // if (showReportSectionButton) showReportSectionButton.style.display = ''; // Hidden for Editor
            // if (showAdminSectionButton) showAdminSectionButton.style.display = ''; // Hidden for Editor


            // Enable/Disable Forms and Buttons for Editor
            if (supplyForm) supplyForm.querySelector('button[type="submit"]').disabled = false;
            if (salesForm) salesForm.querySelector('button[type="submit"]').disabled = false;
            // if (employeeForm) employeeForm.querySelector('button[type="submit"]').disabled = false; // Disabled
            // if (learnerForm) learnerForm.querySelector('button[type="submit"]').disabled = false; // Disabled
            if (clientProfileForm) clientProfileForm.querySelector('button[type="submit"]').disabled = false;
            if (creditorForm) creditorForm.querySelector('button[type="submit"]').disabled = false;
            if (equipmentForm) equipmentForm.querySelector('button[type="submit"]').disabled = false;
            // if (permissionEmployeeForm) permissionEmployeeForm.querySelector('button[type="submit"]').disabled = false; // Disabled
            // if (permissionLearnerForm) permissionLearnerForm.querySelector('button[type="submit"]').disabled = false; // Disabled
            if (pieceEnLigneForm) pieceEnLigneForm.querySelector('button[type="submit"]').disabled = false; // MODIFIED: Enabled for Editor
            // if (wifiZoneForm) wifiZoneForm.querySelector('button[type="submit"]').disabled = true; // NEW: Disabled for Editor


            if (mobileMoneyForm) mobileMoneyForm.querySelector('button[type="submit"]').disabled = true;
            if (mmFournisseurForm) mmFournisseurForm.querySelector('button[type="submit"]').disabled = true;
            if (debtForm) debtForm.querySelector('button[type="submit"]').disabled = true;
            if (adminForm) adminForm.querySelector('button[type="submit"]').disabled = true;
            // if (pieceEnLigneForm) pieceEnLigneForm.querySelector('button[type="submit"]').disabled = true; // NEW
            if (wifiZoneForm) wifiZoneForm.querySelector('button[type="submit"]').disabled = true; // NEW


            if (addInvoiceItemButton) addInvoiceItemButton.disabled = false;
            document.querySelectorAll('.remove-invoice-item-btn').forEach(btn => btn.disabled = false);
            if (previewPrintInvoiceButton) previewPrintInvoiceButton.disabled = false;
            if (exportInvoicePdfButton) exportInvoicePdfButton.disabled = false;
            if (saveUpdateInvoiceButton) saveUpdateInvoiceButton.disabled = false; // NEW

            if (generateReportButton) generateReportButton.disabled = true;
            reportPrintExportBtns.forEach(btn => btn.disabled = true);

            allInvoicePrintButtons.forEach(btn => btn.disabled = false);

            // Enable print/export for allowed sections
            document.querySelectorAll('#supply-list-container .print-export-btn').forEach(btn => btn.disabled = false);
            document.querySelectorAll('#stock-details-container .print-export-btn').forEach(btn => btn.disabled = false);
            document.querySelectorAll('#sales-details-container .print-export-btn').forEach(btn => btn.disabled = false);
            document.querySelectorAll('#materiel-electrique-details-container .print-export-btn').forEach(btn => btn.disabled = false);
            document.querySelectorAll('#expenses-details-container .print-export-btn').forEach(btn => btn.disabled = false);
            document.querySelectorAll('#others-details-container .print-export-btn').forEach(btn => btn.disabled = false);
            // document.querySelectorAll('#employee-permissions-container .print-export-btn').forEach(btn => btn.disabled = false); // Disabled
            // document.querySelectorAll('#employees-details-container .print-export-btn').forEach(btn => btn.disabled = false); // Disabled
            // document.querySelectorAll('#learner-permissions-container .print-export-btn').forEach(btn => btn.disabled = false); // Disabled
            // document.querySelectorAll('#learners-details-container .print-export-btn').forEach(btn => btn.disabled = false); // Disabled
            document.querySelectorAll('#client-profiles-container .print-export-btn').forEach(btn => btn.disabled = false);
            document.querySelectorAll('#creditors-details-container .print-export-btn').forEach(btn => btn.disabled = false);
            document.querySelectorAll('#equipment-details-container .print-export-btn').forEach(btn => btn.disabled = false);
            document.querySelectorAll('#piece-en-ligne-details-container .print-export-btn').forEach(btn => btn.disabled = false); // MODIFIED: Enabled for Editor
            document.querySelectorAll('#invoice-history-section .print-export-btn').forEach(btn => btn.disabled = false); // NEW: Enabled for Editor
            // document.querySelectorAll('#wifi-zone-details-container .print-export-btn').forEach(btn => btn.disabled = false); // NEW: Disabled for Editor

            updateAllTablesForPermissions(); // Re-render tables with correct action button states
            // Explicitly disable edit/delete/pay/permission status for editor (can only add new entries)
            allEditButtons.forEach(btn => btn.disabled = true);
            allDeleteButtons.forEach(btn => btn.disabled = true);
            allPayButtons.forEach(btn => btn.disabled = true);
            allPermissionButtons.forEach(btn => btn.disabled = true);

            // Enable edit/delete for piece-en-ligne for Editor
            document.querySelectorAll('#piece-en-ligne-table .edit-btn').forEach(btn => btn.disabled = false);
            document.querySelectorAll('#piece-en-ligne-table .delete-btn').forEach(btn => btn.disabled = false);

            // Enable edit/delete for invoice history for Editor
            document.querySelectorAll('#invoice-history-table .edit-btn').forEach(btn => btn.disabled = false); // NEW
            document.querySelectorAll('#invoice-history-table .delete-btn').forEach(btn => btn.disabled = false); // NEW


        } else if (isRéseau) { // NEW ROLE 'Réseau'
            // Only Mobile Money and WIFI Zone visible
            if (showMobileMoneySectionButton) showMobileMoneySectionButton.style.display = '';
            if (showWifiZoneSectionButton) showWifiZoneSectionButton.style.display = '';

            // Enable Forms and Buttons for Réseau
            if (mobileMoneyForm) mobileMoneyForm.querySelector('button[type="submit"]').disabled = false;
            if (mmFournisseurForm) mmFournisseurForm.querySelector('button[type="submit"]').disabled = false;
            if (wifiZoneForm) wifiZoneForm.querySelector('button[type="submit"]').disabled = false;

            // Enable print/export for allowed sections
            document.querySelectorAll('#mobile-money-details-container .print-export-btn').forEach(btn => btn.disabled = false);
            document.querySelectorAll('#mm-fournisseurs-details-container .print-export-btn').forEach(btn => btn.disabled = false);
            document.querySelectorAll('#wifi-zone-details-container .print-export-btn').forEach(btn => btn.disabled = false);

            updateAllTablesForPermissions(); // Re-render tables with correct action button states
            // Réseau users can only add/edit their specific sections, but not delete or modify others.
            // All edit/delete/pay/permission buttons are disabled by default, only MM and Wifi need to be enabled for Réseau
            // For simplicity, Réseau is treated like an Editor for MM/Wifi, but restricted more on actions.
            allEditButtons.forEach(btn => btn.disabled = true);
            allDeleteButtons.forEach(btn => btn.disabled = true);
            allPayButtons.forEach(btn => btn.disabled = true);
            allPermissionButtons.forEach(btn => btn.disabled = true);

            // Enable edit/delete for Mobile Money and Wifi Zone for Réseau
            document.querySelectorAll('#mobile-money-table .edit-btn').forEach(btn => btn.disabled = false);
            document.querySelectorAll('#mobile-money-table .delete-btn').forEach(btn => btn.disabled = false);
            document.querySelectorAll('#mm-fournisseurs-table .edit-btn').forEach(btn => btn.disabled = false);
            document.querySelectorAll('#mm-fournisseurs-table .delete-btn').forEach(btn => btn.disabled = false);
            document.querySelectorAll('#wifi-zone-table .edit-btn').forEach(btn => btn.disabled = false);
            document.querySelectorAll('#wifi-zone-table .delete-btn').forEach(btn => btn.disabled = false);

        } else if (isLecteur) {
            if (showReportSectionButton) showReportSectionButton.style.display = '';
            if (showInvoiceHistorySectionButton) showInvoiceHistorySectionButton.style.display = ''; // NEW: Visible for Lecteur

            if (generateReportButton) generateReportButton.disabled = false;

            reportPrintExportBtns.forEach(btn => btn.disabled = true);

            allInvoicePrintButtons.forEach(btn => btn.disabled = true);
            if (exportInvoicePdfButton) exportInvoicePdfButton.disabled = true;
            if (saveUpdateInvoiceButton) saveUpdateInvoiceButton.disabled = true; // NEW

            // Enable print/export for allowed sections
            document.querySelectorAll('#report-details-container .print-export-btn').forEach(btn => btn.disabled = false);
            document.querySelectorAll('#invoice-history-section .print-export-btn').forEach(btn => btn.disabled = false); // NEW: Enabled for Lecteur

            updateAllTablesForPermissions();
        }

        // After setting specific displays, ensure sections that are not allowed are truly hidden
        allNavButtons.forEach(btn => {
            let sectionId;
            if (btn.id === 'generate-invoice-button') {
                sectionId = 'invoice-generator-section';
            } else if (btn.id === 'show-invoice-history-section') { // NEW
                sectionId = 'invoice-history-section';
            } else {
                sectionId = btn.id.replace('show-', '').replace('-button', '') + '-section';
            }

            const sectionElement = document.getElementById(sectionId);
            if (btn.style.display === 'none' && sectionElement && !sectionElement.classList.contains('hidden')) {
                 let shouldBeVisible = false;
                 allNavButtons.forEach(otherBtn => {
                     if (otherBtn.style.display !== 'none') {
                         let otherSectionId;
                         if (otherBtn.id === 'generate-invoice-button') otherSectionId = 'invoice-generator-section';
                         else if (otherBtn.id === 'show-invoice-history-section') otherSectionId = 'invoice-history-section'; // NEW
                         else otherSectionId = otherBtn.id.replace('show-', '').replace('-button', '') + '-section';
                         if (otherSectionId === sectionId) {
                             shouldBeVisible = true;
                         }
                     }
                 });
                 if (!shouldBeVisible) {
                    sectionElement.classList.add('hidden');
                 }
            }
        });
    }


    // Helper to re-run table updates, needed after permissions change or data load
    function updateAllTablesForPermissions() {
        updateSupplyTable(); updateSalesTable(); updateMaterielElectriqueTable(); updateExpensesTable();
        updateOthersTable(); updateEmployeesTable(); updateLearnersTable(); updateMobileMoneyTable();
        updateMmFournisseursTable(); updateClientProfilesTable(); updateCreditorsTable(); updateDebtTable();
        updateEmployeePermissionsTable(); updateLearnerPermissionsTable();
        updateEquipmentTable();
        updatePieceEnLigneTable();
        updateWifiZoneTable();
        updateAdminTable();
        updateInvoiceHistoryTable(); // NEW
    }

    /** Handles data updates from Firebase */
    function handleFirebaseDataUpdate(snapshot) {
        console.log("Réception des données de Firebase...");
        try {
            const dbData = snapshot.val() || {};
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
            adminData = getData('adminData');
            equipmentData = getData('equipmentData');
            pieceEnLigneData = getData('pieceEnLigneData');
            wifiZoneData = getData('wifiZoneData');
            generatedInvoicesData = getData('generatedInvoices'); // NEW


            if (currentUser) {
                initializeAppUI();
            } else {
                if (loginButton && Array.isArray(adminData) && adminData.length > 0) {
                     loginButton.disabled = false;
                     console.log("Login button enabled (data loaded, not logged in).")
                } else if(loginButton) {
                     console.log("Login button remains disabled (no admin data or already logged in?).");
                     if(loginErrorMessage) {
                           loginErrorMessage.textContent = "Aucun utilisateur admin trouvé. Connexion impossible.";
                           loginErrorMessage.classList.remove('hidden');
                     }
                }
            }

        } catch (error) {
            console.error("Erreur lors du traitement des données Firebase:", error);
            alert("Erreur lors de la mise à jour des données. L'affichage peut être incorrect.");
            if (loginButton) loginButton.disabled = true;
        }
    }


    // --- Table Update Functions ---
    function updateSupplyTable(dataToDisplay = supplyData) {
        if (!supplyTable) return;
        supplyTable.innerHTML = '';
        const isAdmin = currentUser && currentUser.status === 'Administrateur';
        // const isEditor = currentUser && currentUser.status === 'Editeur'; // Editor cannot edit/delete supply
        dataToDisplay.forEach((supply) => {
            const originalIndex = supplyData.findIndex(item => item === supply);
            const row = supplyTable.insertRow();
            row.dataset.index = originalIndex;
            row.insertCell().textContent = supply.date || '-'; row.cells[row.cells.length-1].classList.add('date-col');
            row.insertCell().textContent = supply.type || '-'; row.cells[row.cells.length-1].classList.add('type-col');
            const designationCellSupply = row.insertCell(); designationCellSupply.textContent = supply.designation || '-'; designationCellSupply.classList.add('designation-col');
            const quantityCell = row.insertCell(); quantityCell.textContent = supply.quantity || '-'; quantityCell.classList.add('quantity-col');
            const priceCell = row.insertCell(); priceCell.textContent = formatAmount(supply.unitPrice); priceCell.classList.add('unit-price-col');
            const totalCell = row.insertCell(); totalCell.textContent = formatAmount(supply.totalAmount); totalCell.classList.add('amount-col');
            const userCell = row.insertCell(); userCell.textContent = supply.recordedBy || '-'; userCell.classList.add('user-col');
            const actionCell = row.insertCell(); actionCell.classList.add('actions-cell', 'no-print', 'no-export');
            actionCell.innerHTML = `
                <button class="action-btn edit-btn" aria-label="Modifier Approvisionnement" title="Modifier" onclick="editSupply(${originalIndex})" ${originalIndex === -1 || !isAdmin ? 'disabled' : ''}>✏️</button>
                <button class="action-btn delete-btn" aria-label="Supprimer Approvisionnement" title="Supprimer" onclick="deleteSupply(${originalIndex})" ${originalIndex === -1 || !isAdmin ? 'disabled' : ''}>❌</button>
            `;
        });
    }
    function updateSalesTable(dataToDisplay = salesData) {
        if (!salesTable) return;
        salesTable.innerHTML = '';
        const isAdmin = currentUser && currentUser.status === 'Administrateur';
        // const isEditor = currentUser && currentUser.status === 'Editeur'; //
        dataToDisplay.forEach((sale) => {
            const originalIndex = salesData.findIndex(item => item === sale);
            const row = salesTable.insertRow();
            row.dataset.index = originalIndex;
            row.insertCell().textContent = sale.date || '-'; row.cells[row.cells.length-1].classList.add('date-col');
            const designationCellSales = row.insertCell(); designationCellSales.textContent = sale.designation || '-'; designationCellSales.classList.add('designation-col');
            const quantityCell = row.insertCell(); quantityCell.textContent = sale.quantity || '-'; quantityCell.classList.add('quantity-col');
            const priceCell = row.insertCell(); priceCell.textContent = formatAmount(sale.unitPrice); priceCell.classList.add('unit-price-col');
            const totalCell = row.insertCell(); totalCell.textContent = formatAmount(sale.totalAmount); totalCell.classList.add('amount-col');
            const userCell = row.insertCell(); userCell.textContent = sale.recordedBy || '-'; userCell.classList.add('user-col');
            const actionCell = row.insertCell(); actionCell.classList.add('actions-cell', 'no-print', 'no-export');
            actionCell.innerHTML = `
                <button class="action-btn edit-btn" aria-label="Modifier Vente Papeterie" title="Modifier" onclick="editSaleMisc('Papeterie', ${originalIndex})" ${originalIndex === -1 || !isAdmin ? 'disabled' : ''}>✏️</button>
                <button class="action-btn delete-btn" aria-label="Supprimer Vente Papeterie" title="Supprimer" onclick="deleteSale(${originalIndex})" ${originalIndex === -1 || !isAdmin ? 'disabled' : ''}>❌</button>
            `;
        });
    }
    function updateMaterielElectriqueTable(dataToDisplay = materielElectriqueData) {
        if (!materielElectriqueTable) return;
        materielElectriqueTable.innerHTML = '';
        const isAdmin = currentUser && currentUser.status === 'Administrateur';
        // const isEditor = currentUser && currentUser.status === 'Editeur'; //
        dataToDisplay.forEach((sale) => {
            const originalIndex = materielElectriqueData.findIndex(item => item === sale);
            const row = materielElectriqueTable.insertRow();
            row.dataset.index = originalIndex;
            row.insertCell().textContent = sale.date || '-'; row.cells[row.cells.length-1].classList.add('date-col');
            const designationCellME = row.insertCell(); designationCellME.textContent = sale.designation || '-'; designationCellME.classList.add('designation-col');
            const quantityCell = row.insertCell(); quantityCell.textContent = sale.quantity || '-'; quantityCell.classList.add('quantity-col');
            const priceCell = row.insertCell(); priceCell.textContent = formatAmount(sale.unitPrice); priceCell.classList.add('unit-price-col');
            const totalCell = row.insertCell(); totalCell.textContent = formatAmount(sale.totalAmount); totalCell.classList.add('amount-col');
            const userCell = row.insertCell(); userCell.textContent = sale.recordedBy || '-'; userCell.classList.add('user-col');
            const actionCell = row.insertCell(); actionCell.classList.add('actions-cell', 'no-print', 'no-export');
            actionCell.innerHTML = `
                <button class="action-btn edit-btn" aria-label="Modifier Vente Mat. Elec." title="Modifier" onclick="editSaleMisc('MatElec', ${originalIndex})" ${originalIndex === -1 || !isAdmin ? 'disabled' : ''}>✏️</button>
                <button class="action-btn delete-btn" aria-label="Supprimer Vente Mat. Elec." title="Supprimer" onclick="deleteMaterielElectriqueSale(${originalIndex})" ${originalIndex === -1 || !isAdmin ? 'disabled' : ''}>❌</button>
            `;
        });
    }
    function updateExpensesTable(dataToDisplay = expensesData) {
        if (!expensesTable) return;
        expensesTable.innerHTML = '';
        const isAdmin = currentUser && currentUser.status === 'Administrateur';
        // const isEditor = currentUser && currentUser.status === 'Editeur'; //
        dataToDisplay.forEach((expense) => {
            const originalIndex = expensesData.findIndex(item => item === expense);
            const row = expensesTable.insertRow();
            row.dataset.index = originalIndex;
            row.insertCell().textContent = expense.date || '-'; row.cells[row.cells.length-1].classList.add('date-col');
            const reasonCell = row.insertCell(); reasonCell.textContent = expense.reason || '-'; reasonCell.classList.add('reason-col');
            const quantityCell = row.insertCell(); quantityCell.textContent = expense.quantity ?? '-'; quantityCell.classList.add('quantity-col');
            const amountCell = row.insertCell(); amountCell.textContent = formatAmount(expense.amount); amountCell.classList.add('amount-col');
            const userCell = row.insertCell(); userCell.textContent = expense.recordedBy || '-'; userCell.classList.add('user-col');
            const actionCell = row.insertCell(); actionCell.classList.add('actions-cell', 'no-print', 'no-export');
            actionCell.innerHTML = `
                <button class="action-btn edit-btn" aria-label="Modifier Dépense" title="Modifier" onclick="editSaleMisc('Depenses', ${originalIndex})" ${originalIndex === -1 || !isAdmin ? 'disabled' : ''}>✏️</button>
                <button class="action-btn delete-btn" aria-label="Supprimer Dépense" title="Supprimer" onclick="deleteExpense(${originalIndex})" ${originalIndex === -1 || !isAdmin ? 'disabled' : ''}>❌</button>
            `;
        });
    }
    function updateOthersTable(dataToDisplay = othersData) {
        if (!othersTable) return;
        othersTable.innerHTML = '';
        const isAdmin = currentUser && currentUser.status === 'Administrateur';
        // const isEditor = currentUser && currentUser.status === 'Editeur'; //
        dataToDisplay.forEach((other) => {
            const originalIndex = othersData.findIndex(item => item === other);
            const row = othersTable.insertRow();
            row.dataset.index = originalIndex;
            row.insertCell().textContent = other.date || '-'; row.cells[row.cells.length-1].classList.add('date-col');
            const designationCellOthers = row.insertCell(); designationCellOthers.textContent = other.designation || '-'; designationCellOthers.classList.add('designation-col');
            const quantityCell = row.insertCell(); quantityCell.textContent = other.quantity ?? '-'; quantityCell.classList.add('quantity-col');
            const totalCell = row.insertCell(); totalCell.textContent = formatAmount(other.totalAmount); totalCell.classList.add('amount-col');
            const userCell = row.insertCell(); userCell.textContent = other.recordedBy || '-'; userCell.classList.add('user-col');
            const actionCell = row.insertCell(); actionCell.classList.add('actions-cell', 'no-print', 'no-export');
            actionCell.innerHTML = `
                <button class="action-btn edit-btn" aria-label="Modifier Opération Diverse" title="Modifier" onclick="editSaleMisc('Divers', ${originalIndex})" ${originalIndex === -1 || !isAdmin ? 'disabled' : ''}>✏️</button>
                <button class="action-btn delete-btn" aria-label="Supprimer Opération Diverse" title="Supprimer" onclick="deleteOther(${originalIndex})" ${originalIndex === -1 || !isAdmin ? 'disabled' : ''}>❌</button>
            `;
        });
    }
    function calculateStock(supply, papeterieSales, meSales) { let stockMap = {}; supply.forEach(item => { const key = item.designation?.trim(); if (!key || (item.type !== 'Papeterie' && item.type !== 'Matériels électrique')) return; const quantity = parseFloat(item.quantity) || 0; if (quantity <= 0) return; const itemKey = `${item.type}__${key}`; if (!stockMap[itemKey]) { stockMap[itemKey] = { designation: key, type: item.type, supplyQuantity: 0, soldQuantity: 0, remainingQuantity: 0, date: item.date }; } stockMap[itemKey].supplyQuantity += quantity; stockMap[itemKey].remainingQuantity += quantity; if (!stockMap[itemKey].date || (item.date && new Date(item.date) > new Date(stockMap[itemKey].date))) { stockMap[itemKey].date = item.date; } }); const allStockableSales = [...papeterieSales, ...meSales]; allStockableSales.forEach(item => { const key = item.designation?.trim(); if (!key) return; const quantity = parseFloat(item.quantity) || 0; if (quantity <= 0) return; let itemKey = null; if(item.type === 'Papeterie') itemKey = `Papeterie__${key}`; else if(item.type === 'Matériels électrique') itemKey = `Matériels électrique__${key}`; else if (papeterieSales.includes(item)) itemKey = `Papeterie__${key}`; else if (meSales.includes(item)) itemKey = `Matériels électrique__${key}`; if (itemKey && stockMap[itemKey]) { stockMap[itemKey].soldQuantity += quantity; stockMap[itemKey].remainingQuantity -= quantity; if (!stockMap[itemKey].date || (item.date && new Date(item.date) > new Date(stockMap[itemKey].date))) { stockMap[itemKey].date = item.date; } if (Math.abs(stockMap[itemKey].remainingQuantity) < 0.001) { stockMap[itemKey].remainingQuantity = 0; } } else if (itemKey) { console.warn(`Stock Calc: Vente de '${key}' (${itemKey.split('__')[0]}) sans approvisionnement correspondant.`); const saleType = itemKey.split('__')[0]; stockMap[itemKey] = { designation: key, type: saleType, supplyQuantity: 0, soldQuantity: quantity, remainingQuantity: -quantity, date: item.date }; } else { console.warn(`Stock Calc: Vente ignorée car type inconnu pour ${key}`); } }); return Object.values(stockMap); }
    function updateStockTable() { if (!stockTable) return; stockData = calculateStock(supplyData, salesData, materielElectriqueData); const sortedStockData = [...stockData].sort((a, b) => (a.designation || '').localeCompare(b.designation || '')); stockTable.innerHTML = ''; sortedStockData.forEach(stock => { const row = stockTable.insertRow(); row.insertCell().textContent = stock.type || '-'; row.cells[row.cells.length-1].classList.add('type-col'); row.insertCell().textContent = stock.date || '-'; row.cells[row.cells.length-1].classList.add('date-col'); const designationCellStock = row.insertCell(); designationCellStock.textContent = stock.designation || '-'; designationCellStock.classList.add('designation-col'); const supplyQtyCell = row.insertCell(); supplyQtyCell.textContent = stock.supplyQuantity || 0; supplyQtyCell.classList.add('supply-col'); const soldQtyCell = row.insertCell(); soldQtyCell.textContent = stock.soldQuantity || 0; soldQtyCell.classList.add('sold-col'); const remainingQtyCell = row.insertCell(); remainingQtyCell.textContent = stock.remainingQuantity || 0; remainingQtyCell.classList.add('remaining-col'); row.classList.remove('danger', 'partiel'); const remaining = stock.remainingQuantity || 0; if (remaining <= 0) { row.classList.add('danger'); } else if (remaining < 5) { row.classList.add('partiel'); } }); updateProductDesignationsForCategory('Papeterie'); updateProductDesignationsForCategory('Matériels électrique'); }
    function updateEmployeesTable(dataToDisplay = employeesData) {
        if (!employeesTable) return;
        employeesTable.innerHTML = '';
        const isAdmin = currentUser && currentUser.status === 'Administrateur';
        // const isEditor = currentUser && currentUser.status === 'Editeur'; //
        const canEdit = isAdmin; // Only Admin can edit employee records
        const canPay = isAdmin; // Only Admin can record salary payments
        const canDelete = isAdmin; // Only Admin can delete employee records

        dataToDisplay.forEach((employee) => {
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
            const paidAmount = employee.paidAmount || 0;
            const remainingSalary = salary - paidAmount;
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
            const actionCell = row.insertCell(); actionCell.classList.add('actions-cell', 'no-print', 'no-export');
            actionCell.innerHTML = `
                <button class="action-btn edit-btn" aria-label="Modifier Employé" title="Modifier" onclick="editEmployee(${originalIndex})" ${originalIndex === -1 || !canEdit ? 'disabled' : ''}>✏️</button>
                <button class="action-btn pay-btn" aria-label="Enregistrer Paiement Salaire" title="Payer" onclick="recordSalaryPayment(${originalIndex})" ${originalIndex === -1 || !canPay ? 'disabled' : ''}>💲</button>
                <button class="action-btn delete-btn" aria-label="Supprimer Employé" title="Supprimer" onclick="deleteEmployee(${originalIndex})" ${originalIndex === -1 || !canDelete ? 'disabled' : ''}>❌</button>
            `;
        });
    }
    function updateLearnersTable(dataToDisplay = learnersData) {
        if (!learnersTable) return;
        learnersTable.innerHTML = '';
        const isAdmin = currentUser && currentUser.status === 'Administrateur';
        // const isEditor = currentUser && currentUser.status === 'Editeur'; //
        const canEdit = isAdmin; // Only Admin can edit learner records
        const canPay = isAdmin; // Only Admin can record tranche payments
        const canDelete = isAdmin; // Only Admin can delete learner records
        dataToDisplay.forEach((learner) => {
            const originalIndex = learnersData.findIndex(l => l === learner);
            const row = learnersTable.insertRow();
            row.dataset.index = originalIndex;
            row.insertCell().textContent = learner.nom || '-'; row.cells[row.cells.length - 1].classList.add('name-col');
            row.insertCell().textContent = learner.prenom || '-'; row.cells[row.cells.length - 1].classList.add('name-col');
            row.insertCell().textContent = learner.age || '-'; row.cells[row.cells.length - 1].classList.add('age-col');
            row.insertCell().textContent = learner.adresse || '-';
            row.insertCell().textContent = learner.lieuResidence || '-';
            row.insertCell().textContent = learner.niveauEtudes || '-';
            row.insertCell().textContent = learner.situationMatrimoniale || '-';
            row.insertCell().textContent = `${learner.pereNom || ''} ${learner.perePrenom || ''}`.trim() || '-';
            row.insertCell().textContent = `${learner.mereNom || ''} ${lrn.merePrenom || ''}`.trim() || '-';
            row.insertCell().textContent = learner.filiere || '-'; row.cells[row.cells.length - 1].classList.add('filiere-col');
            row.insertCell().textContent = learner.dureeFormation || '-';
            let cellDocs = row.insertCell(); cellDocs.textContent = formatAmount(learner.fraisDocuments); cellDocs.classList.add('amount-col');
            let cellT1 = row.insertCell(); cellT1.textContent = formatAmount(learner.tranche1); cellT1.classList.add('amount-col');
            let cellT2 = row.insertCell(); cellT2.textContent = formatAmount(learner.tranche2); cellT2.classList.add('amount-col');
            let cellT3 = row.insertCell(); cellT3.textContent = formatAmount(learner.tranche3); cellT3.classList.add('amount-col');
            let cellT4 = row.insertCell(); cellT4.textContent = formatAmount(learner.tranche4); cellT4.classList.add('amount-col');
            row.insertCell().textContent = `${learner.garantNom || ''} ${learner.garantPrenom || ''}`.trim() || '-';
            row.insertCell().textContent = learner.garantTelephone || '-';
            row.insertCell().textContent = learner.garantAdresse || '-';
            const actionCell = row.insertCell(); actionCell.classList.add('actions-cell', 'no-print', 'no-export');
            actionCell.innerHTML = `
                 <button class="action-btn edit-btn" aria-label="Modifier Apprenant" title="Modifier" onclick="editLearner(${originalIndex})" ${originalIndex === -1 || !canEdit ? 'disabled' : ''}>✏️</button>
                 <button class="action-btn pay-btn" aria-label="Enregistrer Paiement Tranche" title="Payer Tranche" onclick="recordTranchePayment(${originalIndex})" ${originalIndex === -1 || !canPay ? 'disabled' : ''}>💲</button>
                 <button class="action-btn delete-btn" aria-label="Supprimer Apprenant" title="Supprimer" onclick="deleteLearner(${originalIndex})" ${originalIndex === -1 || !canDelete ? 'disabled' : ''}>❌</button>
             `;
        });
    }
    function updateMobileMoneyTable(dataToDisplay = mobileMoneyData) {
        if (!mobileMoneyTable) return;
        mobileMoneyTable.innerHTML = '';
        const isAdmin = currentUser && currentUser.status === 'Administrateur';
        const isRéseau = currentUser && currentUser.status === 'Réseau'; //
        const canEdit = isAdmin || isRéseau; // Admin or Réseau can edit MM
        const canDelete = isAdmin; // Only Admin can delete MM
        dataToDisplay.forEach((transaction) => {
            const originalIndex = mobileMoneyData.findIndex(item => item === transaction );
            const row = mobileMoneyTable.insertRow();
            row.dataset.index = originalIndex;
            const balanceMoov = transaction.balanceMoov || 0, balanceMTN = transaction.balanceMTN || 0, balanceCelttis = transaction.balanceCelttis || 0, balanceCash = transaction.balanceCash || 0;
            const creditMoov = transaction.creditMoov || 0, creditMTN = transaction.creditMTN || 0, creditCelttis = transaction.creditCelttis || 0;
            const perteTransfert = transaction.perteTransfert || 0;
            const perteCredit = transaction.perteCredit || 0;
            const totalBalance = balanceMoov + balanceMTN + balanceCelttis + balanceCash;
            const totalCredit = creditMoov + creditMTN + creditCelttis;
            row.insertCell().textContent = transaction.date || '-'; row.cells[row.cells.length-1].classList.add('date-col');
            row.insertCell().textContent = transaction.agent || '-'; row.cells[row.cells.length-1].classList.add('agent-col');
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
            const actionCell = row.insertCell(); actionCell.classList.add('actions-cell', 'no-print', 'no-export');
            actionCell.innerHTML = `
                <button class="action-btn edit-btn" aria-label="Modifier Point MM" title="Modifier" onclick="editMobileMoney(${originalIndex})" ${originalIndex === -1 || !canEdit ? 'disabled' : ''}>✏️</button>
                <button class="action-btn delete-btn" aria-label="Supprimer Point MM" title="Supprimer" onclick="deleteMobileMoney(${originalIndex})" ${originalIndex === -1 || !isAdmin ? 'disabled' : ''}>❌</button>
            `;
        });
    }
    function updateMmFournisseursTable(dataToDisplay = mmFournisseursData) { //
        if (!mmFournisseursTable) return;
        mmFournisseursTable.innerHTML = '';
        const sortedFournisseurs = [...dataToDisplay].sort((a, b) => { const nc = (a.nom || '').localeCompare(b.nom || ''); return nc !== 0 ? nc : (a.prenom || '').localeCompare(b.prenom || ''); });
        const isAdmin = currentUser && currentUser.status === 'Administrateur';
        const isRéseau = currentUser && currentUser.status === 'Réseau'; //
        const canEdit = isAdmin || isRéseau; // Admin or Réseau can edit MM suppliers
        const canDelete = isAdmin; // Only Admin can delete MM suppliers

        sortedFournisseurs.forEach(f => {
            const montantFourni = f.montantFourni || 0;
            const creditVendu = f.creditVendu || 0;
            const creditRestant = montantFourni - creditVendu;
            const row = mmFournisseursTable.insertRow();
            const key = `${f.nom}_${f.prenom}`;
            row.dataset.key = key;
            row.insertCell().textContent = f.nom || '-'; row.cells[row.cells.length-1].classList.add('name-col');
            row.insertCell().textContent = f.prenom || '-'; row.cells[row.cells.length-1].classList.add('name-col');
            row.insertCell().textContent = f.contact || '-'; row.cells[row.cells.length-1].classList.add('contact-col');
            let cellMF = row.insertCell(); cellMF.textContent = formatAmount(montantFourni); cellMF.classList.add('amount-col');
            let cellI = row.insertCell(); cellI.textContent = (f.interet !== null && f.interet !== undefined) ? `${f.interet}%` : '-'; cellI.classList.add('interest-col');
            let cellCV = row.insertCell(); cellCV.textContent = formatAmount(creditVendu); cellCV.classList.add('amount-col');
            let cellCR = row.insertCell(); cellCR.textContent = formatAmount(creditRestant); cellCR.classList.add('amount-col');
            cellCR.style.fontWeight = 'bold';
            row.classList.remove('solde', 'danger');
            if (creditRestant <= 0.005) { row.classList.add('solde'); }
            else { row.classList.add('danger'); }
            const actionCell = row.insertCell(); actionCell.classList.add('actions-cell', 'no-print', 'no-export');
            const safeNom = (f.nom || '').replace(/'/g, "\\'");
            const safePrenom = (f.prenom || '').replace(/'/g, "\\'");
            actionCell.innerHTML = `
                <button class="action-btn edit-btn" aria-label="Modifier Fournisseur MM" title="Modifier" onclick="editMmFournisseur('${safeNom}', '${safePrenom}')" ${!canEdit ? 'disabled' : ''}>✏️</button>
                <button class="action-btn delete-btn" aria-label="Supprimer Fournisseur MM" title="Supprimer" onclick="deleteMmFournisseur('${safeNom}', '${safePrenom}')" ${!canDelete ? 'disabled' : ''}>❌</button>
            `;
        });
    }
    function updateClientProfilesTable(dataToDisplay = clientProfilesData) { //
        if (!clientProfilesTable) return;
        clientProfilesTable.innerHTML = '';
        const sortedProfiles = [...dataToDisplay].sort((a, b) => { const nc = (a.nom || '').localeCompare(b.nom || ''); return nc !== 0 ? nc : (a.prenom || '').localeCompare(b.prenom || ''); });
        const isAdmin = currentUser && currentUser.status === 'Administrateur';
        // const isEditor = currentUser && currentUser.status === 'Editeur'; //
        const canEdit = isAdmin; // Only Admin can edit client profiles
        const canDelete = isAdmin; // Only Admin can delete client profiles

        sortedProfiles.forEach(p => {
            const key = `${p.nom}_${p.prenom}`;
            const row = clientProfilesTable.insertRow();
            row.dataset.key = key;
            row.insertCell().textContent = p.nom || '-'; row.cells[row.cells.length-1].classList.add('name-col');
            row.insertCell().textContent = p.prenom || '-'; row.cells[row.cells.length-1].classList.add('name-col');
            row.insertCell().textContent = p.adresse || '-';
            row.insertCell().textContent = p.contact || '-'; row.cells[row.cells.length-1].classList.add('contact-col');
            row.insertCell().textContent = p.statut || '-'; row.cells[row.cells.length-1].classList.add('status-col');
            const actionCell = row.insertCell(); actionCell.classList.add('actions-cell', 'no-print', 'no-export');
            const safeNom = (p.nom || '').replace(/'/g, "\\'");
            const safePrenom = (p.prenom || '').replace(/'/g, "\\'");
            actionCell.innerHTML = `
                <button class="action-btn edit-btn" aria-label="Modifier Profil Client" title="Modifier" onclick="editClientProfile('${safeNom}', '${safePrenom}')" ${!canEdit ? 'disabled' : ''}>✏️</button>
                <button class="action-btn delete-btn" aria-label="Supprimer Profil Client" title="Supprimer" onclick="deleteClientProfile('${safeNom}', '${safePrenom}')" ${!canDelete ? 'disabled' : ''}>❌</button>
            `;
        });
    }

    // MODIFIED: populateClientSelect function
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
        // Trigger change to update other fields
        creditorNameSelect.dispatchEvent(new Event('change'));
    }

    // NEW: Function to populate creditor designation dropdown and summary
    function updateCreditorFormForClient() {
        if (!creditorNameSelect || !creditorDesignationSelect || !creditorQuantityInput || !creditorUnitPriceInput || !creditorTotalAmountDueInput || !creditorAmountPaidInput || !creditorDueDateInput || !creditorContactInput || !selectedClientSummaryDiv) return;

        const selectedClientFullName = creditorNameSelect.value;
        // const clientHasOutstandingCredit = creditorsData.some(c => c.name === selectedClientFullName && (c.totalAmountDue - c.amountPaidTotal > 0.005)); // Not directly used here

        // Update Contact field directly from selected client's profile
        const selectedOption = creditorNameSelect.options[creditorNameSelect.selectedIndex];
        creditorContactInput.value = selectedOption?.dataset?.contact || '';

        // Reset fields and hide custom designation input
        creditorDesignationSelect.innerHTML = '<option value="">-- Choisir ou Saisir --</option>';
        creditorCustomDesignationInput.classList.add('hidden');
        creditorCustomDesignationInput.value = '';
        creditorQuantityInput.value = '';
        creditorUnitPriceInput.value = '';
        creditorTotalAmountDueInput.value = '';
        creditorDueDateInput.value = '';
        creditorAmountPaidInput.value = '';
        creditorQuantityInput.readOnly = false;
        creditorUnitPriceInput.readOnly = false;
        creditorTotalAmountDueInput.readOnly = false;
        creditorDueDateInput.readOnly = false;

        if (selectedClientFullName === "") {
            selectedClientSummaryDiv.style.display = 'none';
            return;
        }

        selectedClientSummaryDiv.style.display = 'block';

        const clientCredits = creditorsData.filter(c => c.name === selectedClientFullName);
        let totalDueForClient = 0;
        let totalPaidForClient = 0;
        let outstandingDesignations = [];

        clientCredits.forEach(c => {
            const remaining = (c.totalAmountDue || 0) - (c.amountPaidTotal || 0);
            totalDueForClient += (c.totalAmountDue || 0);
            totalPaidForClient += (c.amountPaidTotal || 0);
            if (remaining > 0.005) {
                outstandingDesignations.push({
                    designation: c.designation,
                    remaining: remaining,
                    originalIndex: creditorsData.findIndex(item => item === c),
                    quantity: c.quantity,
                    unitPrice: c.unitPrice,
                    totalAmountDue: c.totalAmountDue,
                    dueDate: c.dueDate
                });
                const option = document.createElement('option');
                option.value = c.designation;
                option.textContent = `${c.designation} (Reste: ${formatAmount(remaining)})`;
                creditorDesignationSelect.appendChild(option);
            }
        });

        creditorDesignationSelect.innerHTML += '<option value="Autre">Autre (nouvelle transaction)</option>';

        clientSummaryTotalDueSpan.textContent = formatAmount(totalDueForClient) + ' FCFA';
        clientSummaryTotalPaidSpan.textContent = formatAmount(totalPaidForClient) + ' FCFA';
        const clientRemaining = totalDueForClient - totalPaidForClient;
        clientSummaryRemainingSpan.textContent = formatAmount(clientRemaining) + ' FCFA';
        clientSummaryRemainingSpan.style.color = clientRemaining > 0.005 ? 'var(--color-danger)' : 'var(--color-success)';

        if (outstandingDesignations.length > 0) {
            clientSummaryDesignationsList.innerHTML = '<strong>Articles en cours :</strong><br>' +
                outstandingDesignations.map(item => `- ${item.designation} (Reste: ${formatAmount(item.remaining)})`).join('<br>');
        } else {
            clientSummaryDesignationsList.textContent = 'Aucun crédit en cours.';
        }

        // Auto-fill logic if only one outstanding item AND not currently in edit mode for a specific transaction
        if (outstandingDesignations.length === 1 && !creditorEditIndexInput.value) { // Ensure not in client profile edit mode
            const singleOutstanding = outstandingDesignations[0];
            // No need to find originalCredit, it's in singleOutstanding
            creditorDesignationSelect.value = singleOutstanding.designation;
            creditorQuantityInput.value = singleOutstanding.quantity || '';
            creditorUnitPriceInput.value = singleOutstanding.unitPrice || '';
            creditorTotalAmountDueInput.value = formatAmount(singleOutstanding.totalAmountDue);
            creditorDueDateInput.value = singleOutstanding.dueDate || '';
            creditorAmountPaidInput.value = formatAmount(singleOutstanding.remaining); // Pre-fill with remaining amount

            // Make fields read-only as it's an existing item
            creditorQuantityInput.readOnly = true;
            creditorUnitPriceInput.readOnly = true;
            creditorTotalAmountDueInput.readOnly = true;
            creditorDueDateInput.readOnly = true;
        } else {
            // Default to "Autre" if multiple outstanding or none
            creditorDesignationSelect.value = "Autre";
            creditorCustomDesignationInput.classList.remove('hidden');
        }
    }


    // MODIFIED: creditorDesignationSelect change listener
    if(creditorDesignationSelect && !creditorDesignationSelect._hasChangeListener) {
        creditorDesignationSelect.addEventListener('change', function() {
            const selectedDesignation = this.value;
            if (selectedDesignation === "Autre") {
                creditorCustomDesignationInput.classList.remove('hidden');
                creditorCustomDesignationInput.focus();
                // Clear fields and make them editable for a new transaction
                creditorQuantityInput.value = '';
                creditorUnitPriceInput.value = '';
                creditorTotalAmountDueInput.value = '';
                creditorDueDateInput.value = '';
                creditorAmountPaidInput.value = ''; // Don't pre-fill for new
                creditorQuantityInput.readOnly = false;
                creditorUnitPriceInput.readOnly = false;
                creditorTotalAmountDueInput.readOnly = false;
                creditorDueDateInput.readOnly = false;
            } else {
                creditorCustomDesignationInput.classList.add('hidden');
                creditorCustomDesignationInput.value = '';
                // Fill fields with existing credit data
                const selectedClientFullName = creditorNameSelect.value;
                const existingCredit = creditorsData.find(c => c.name === selectedClientFullName && c.designation === selectedDesignation && (c.totalAmountDue - c.amountPaidTotal > 0.005));

                if (existingCredit) {
                    creditorQuantityInput.value = existingCredit.quantity || '';
                    creditorUnitPriceInput.value = existingCredit.unitPrice || '';
                    creditorTotalAmountDueInput.value = formatAmount(existingCredit.totalAmountDue);
                    creditorDueDateInput.value = existingCredit.dueDate || '';
                    creditorAmountPaidInput.value = formatAmount((existingCredit.totalAmountDue || 0) - (existingCredit.amountPaidTotal || 0)); // Pre-fill with remaining
                    // Make fields read-only for existing items
                    creditorQuantityInput.readOnly = true;
                    creditorUnitPriceInput.readOnly = true;
                    creditorTotalAmountDueInput.readOnly = true;
                    creditorDueDateInput.readOnly = true;
                }
            }
        });
        creditorDesignationSelect._hasChangeListener = true;
    }


    function updateCreditorsTable(dataToDisplay = creditorsData) { //
        if (!creditorsTable) return;
        creditorsTable.innerHTML = '';
        const isAdmin = currentUser && currentUser.status === 'Administrateur';
        const isEditor = currentUser && currentUser.status === 'Editeur'; //
            const canEdit = isAdmin || isEditor; // NEW: Admin or Editor can edit transactions
            const canDelete = isAdmin; // Only Admin can delete
            const canPrintInvoice = isAdmin || isEditor; // Admin or Editor can print invoices

            dataToDisplay.forEach((creditor) => {
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
                const designationCellCred = row.insertCell(); designationCellCred.textContent = creditor.designation || '-'; designationCellCred.classList.add('designation-col');
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
                if (isSolde) { row.classList.add('solde'); } else if (amountPaid > 0) { row.classList.add('partiel'); }
                const actionCell = row.insertCell(); actionCell.classList.add('actions-cell', 'no-print', 'no-export');
                actionCell.innerHTML = `
                    <button class="action-btn edit-btn" aria-label="Modifier Transaction Crédit" title="Modifier Transaction" onclick="editCreditor(${originalIndex})" ${originalIndex === -1 || !canEdit ? 'disabled' : ''}>✏️</button>
                    <button class="action-btn invoice-btn" aria-label="Imprimer Relevé Crédit" title="Imprimer Relevé" onclick="printCreditReceipt(${originalIndex})" ${originalIndex === -1 || !canPrintInvoice ? 'disabled' : ''}>🧾</button>
                    <button class="action-btn delete-btn" aria-label="Supprimer Transaction Crédit" title="Supprimer Transaction" onclick="deleteCreditor(${originalIndex})" ${originalIndex === -1 || !canDelete ? 'disabled' : ''}>❌</button>
                `;
            });
        }
    function updateDebtTable(dataToDisplay = debtData) {
        if (!debtTable) return;
        debtTable.innerHTML = '';
        const isAdmin = currentUser && currentUser.status === 'Administrateur';
        // const isEditor = currentUser && currentUser.status === 'Editeur'; //
        const canEdit = isAdmin;
        const canDelete = isAdmin;
        dataToDisplay.forEach((debt) => {
            const originalIndex = debtData.findIndex(item => item === debt);
            const row = debtTable.insertRow();
            row.dataset.index = originalIndex;
            row.insertCell().textContent = debt.date || '-'; row.cells[row.cells.length-1].classList.add('date-col');
            row.insertCell().textContent = debt.type || '-'; row.cells[row.cells.length-1].classList.add('type-col');
            row.insertCell().textContent = debt.name || '-'; row.cells[row.cells.length-1].classList.add('name-col');
            const descriptionCell = row.insertCell(); descriptionCell.textContent = debt.description || '-'; descriptionCell.classList.add('description-col');
            const amountCell = row.insertCell(); amountCell.textContent = formatAmount(debt.amount); amountCell.classList.add('amount-col');
            row.insertCell().textContent = debt.dueDate || '-'; row.cells[row.cells.length-1].classList.add('date-col');
            row.insertCell().textContent = debt.status || '-'; row.cells[row.cells.length-1].classList.add('status-col');
            const userCell = row.insertCell(); userCell.textContent = debt.recordedBy || '-'; userCell.classList.add('user-col');
            row.classList.remove('solde', 'partiel');
            if (debt.status === 'Remboursé / Récupéré') { row.classList.add('solde'); }
            else if (debt.status === 'Partiellement Remboursé / Récupéré') { row.classList.add('partiel'); }
            else if (debt.status === 'Annulé') { row.style.textDecoration = 'line-through'; row.style.color = '#888'; }
            const actionCell = row.insertCell(); actionCell.classList.add('actions-cell', 'no-print', 'no-export');
            actionCell.innerHTML = `
                <button class="action-btn edit-btn" aria-label="Modifier Dette/Prêt" title="Modifier" onclick="editDebt(${originalIndex})" ${originalIndex === -1 || !canEdit ? 'disabled' : ''}>✏️</button>
                <button class="action-btn delete-btn" aria-label="Supprimer Dette/Prêt" title="Supprimer" onclick="deleteDebt(${originalIndex})" ${originalIndex === -1 || !canDelete ? 'disabled' : ''}>❌</button>
            `;
        });
    }
    function updateEmployeePermissionsTable(dataToDisplay = employeePermissionsData) {
        if (!employeePermissionsTable) return;
        employeePermissionsTable.innerHTML = '';
        const isAdmin = currentUser && currentUser.status === 'Administrateur';
        // const isEditor = currentUser && currentUser.status === 'Editeur'; //
        const canUpdateStatus = isAdmin; // Only Admin can update status
        const canDelete = isAdmin; // Only Admin can delete
        dataToDisplay.forEach((perm) => {
            const originalIndex = employeePermissionsData.findIndex(p => p === perm);
            const row = employeePermissionsTable.insertRow();
            row.dataset.index = originalIndex;
            row.insertCell().textContent = perm.requestDate || '-'; row.cells[row.cells.length-1].classList.add('date-col');
            row.insertCell().textContent = perm.name || '-'; row.cells[row.cells.length-1].classList.add('name-col');
            row.insertCell().textContent = perm.category || '-'; row.cells[row.cells.length-1].classList.add('category-col');
            row.insertCell().textContent = perm.permissionDateOrPeriod || '-';
            const reasonCell = row.insertCell(); reasonCell.textContent = perm.reason || '-'; reasonCell.classList.add('reason-col');
            const statusCell = row.insertCell(); statusCell.textContent = perm.status || 'En attente'; statusCell.classList.add('status-col');
            const userCell = row.insertCell(); userCell.textContent = perm.statusUpdatedBy ? `${perm.status} par ${perm.statusUpdatedBy} (${perm.statusUpdateDate || '?'})` : perm.recordedBy || '-'; userCell.classList.add('user-col');
            row.classList.remove('solde', 'partiel', 'danger'); statusCell.style.fontWeight = 'bold';
            switch (perm.status) { case 'Accordé': row.classList.add('solde'); break; case 'Refusé': row.classList.add('danger'); break; default: row.classList.add('partiel'); break; }
            const actionCell = row.insertCell(); actionCell.classList.add('actions-cell', 'no-print', 'no-export');
            actionCell.innerHTML = `
                <button class="action-btn pay-btn" aria-label="Accorder Permission" title="Accorder" onclick="updatePermissionStatus('employee', ${originalIndex}, 'Accordé')" ${originalIndex === -1 || perm.status === 'Accordé' || !canUpdateStatus ? 'disabled' : ''}>✔️</button>
                <button class="action-btn delete-btn" aria-label="Refuser Permission" title="Refuser" onclick="updatePermissionStatus('employee', ${originalIndex}, 'Refusé')" ${originalIndex === -1 || perm.status === 'Refusé' || !canUpdateStatus ? 'disabled' : ''}>❌</button>
                <button class="action-btn delete-btn" style="color: var(--color-secondary);" aria-label="Supprimer Demande" title="Supprimer" onclick="deletePermission('employee', ${originalIndex})" ${originalIndex === -1 || !canDelete ? 'disabled' : ''}>🗑️</button>
            `;
        });
    }
    function updateLearnerPermissionsTable(dataToDisplay = learnerPermissionsData) {
        if (!learnerPermissionsTable) return;
        learnerPermissionsTable.innerHTML = '';
        const isAdmin = currentUser && currentUser.status === 'Administrateur';
        // const isEditor = currentUser && currentUser.status === 'Editeur'; //
        const canUpdateStatus = isAdmin; // Only Admin can update status
        const canDelete = isAdmin; // Only Admin can delete
        dataToDisplay.forEach((perm) => {
            const originalIndex = learnerPermissionsData.findIndex(p => p === perm);
            const row = learnerPermissionsTable.insertRow();
            row.dataset.index = originalIndex;
            row.insertCell().textContent = perm.requestDate || '-'; row.cells[row.cells.length-1].classList.add('date-col');
            row.insertCell().textContent = perm.name || '-'; row.cells[row.cells.length-1].classList.add('name-col');
            row.insertCell().textContent = perm.category || '-'; row.cells[row.cells.length-1].classList.add('category-col');
            row.insertCell().textContent = perm.permissionDateOrPeriod || '-';
            const reasonCell = row.insertCell(); reasonCell.textContent = perm.reason || '-'; reasonCell.classList.add('reason-col');
            const statusCell = row.insertCell(); statusCell.textContent = perm.status || 'En attente'; statusCell.classList.add('status-col');
            const userCell = row.insertCell(); userCell.textContent = perm.statusUpdatedBy ? `${perm.status} par ${perm.statusUpdatedBy} (${perm.statusUpdateDate || '?'})` : perm.recordedBy || '-'; userCell.classList.add('user-col');
            row.classList.remove('solde', 'partiel', 'danger'); statusCell.style.fontWeight = 'bold';
            switch (perm.status) { case 'Accordé': row.classList.add('solde'); break; case 'Refusé': row.classList.add('danger'); break; default: row.classList.add('partiel'); break; }
            const actionCell = row.insertCell(); actionCell.classList.add('actions-cell', 'no-print', 'no-export');
            actionCell.innerHTML = `
                <button class="action-btn pay-btn" aria-label="Accorder Permission" title="Accorder" onclick="updatePermissionStatus('learner', ${originalIndex}, 'Accordé')" ${originalIndex === -1 || perm.status === 'Accordé' || !canUpdateStatus ? 'disabled' : ''}>✔️</button>
                <button class="action-btn delete-btn" aria-label="Refuser Permission" title="Refuser" onclick="updatePermissionStatus('learner', ${originalIndex}, 'Refusé')" ${originalIndex === -1 || perm.status === 'Refusé' || !canUpdateStatus ? 'disabled' : ''}>❌</button>
                <button class="action-btn delete-btn" style="color: var(--color-secondary);" aria-label="Supprimer Demande" title="Supprimer" onclick="deletePermission('learner', ${originalIndex})" ${originalIndex === -1 || !canDelete ? 'disabled' : ''}>🗑️</button>
            `;
        });
    }
    function updateAdminTable() { //
        if (!adminTable) return;
        adminTable.innerHTML = '';
        const sortedAdminData = [...adminData].sort((a, b) => (a.username || '').localeCompare(b.username || ''));
        const isAdmin = currentUser && currentUser.status === 'Administrateur';
        sortedAdminData.forEach(user => {
            const row = adminTable.insertRow();
            row.dataset.key = user.username;
            row.insertCell().textContent = user.username || '-'; row.cells[row.cells.length-1].classList.add('name-col');
            row.insertCell().textContent = user.post || '-'; row.cells[row.cells.length-1].classList.add('post-col');
            const statusCell = row.insertCell(); statusCell.textContent = user.status || '-'; statusCell.classList.add('status-col');
            statusCell.style.fontWeight = 'bold';
            switch(user.status) {
                case 'Administrateur': statusCell.style.color = 'var(--color-danger)'; break;
                case 'Editeur': statusCell.style.color = 'var(--color-primary)'; break;
                case 'Lecteur': statusCell.style.color = 'var(--color-success)'; break;
                case 'Réseau': statusCell.style.color = 'var(--color-network)'; break; // NEW: Color for Réseau status
                default: statusCell.style.color = 'var(--color-secondary-dark)';
            }
            const actionCell = row.insertCell(); actionCell.classList.add('actions-cell', 'no-print', 'no-export');
            const safeUsername = (user.username || '').replace(/'/g, "\\'");
            const isSelf = currentUser && currentUser.username === safeUsername;
            const isLastAdmin = user.status === 'Administrateur' && adminData.filter(u => u.status === 'Administrateur').length <= 1;
            actionCell.innerHTML = `
                <button class="action-btn edit-btn" aria-label="Modifier Utilisateur" title="Modifier" onclick="editAdminUser('${safeUsername}')" ${!isAdmin || isSelf ? 'disabled' : ''}>✏️</button>
                <button class="action-btn delete-btn" aria-label="Supprimer Utilisateur" title="Supprimer" onclick="deleteAdminUser('${safeUsername}')" ${!isAdmin || isSelf || isLastAdmin ? 'disabled' : ''}>❌</button>
            `;
        });
    }
    function updateEquipmentTable(dataToDisplay = equipmentData) { //
        if (!equipmentTable) return;
        equipmentTable.innerHTML = '';
        const isAdmin = currentUser && currentUser.status === 'Administrateur';
        // const isEditor = currentUser && currentUser.status === 'Editeur'; //
        const canEdit = isAdmin;
        const canDelete = isAdmin;
        dataToDisplay.forEach((item) => {
            const originalIndex = equipmentData.findIndex(eq => eq === item);
            const row = equipmentTable.insertRow();
            row.dataset.index = originalIndex;
            row.insertCell().textContent = item.assignedDate || '-'; row.cells[row.cells.length-1].classList.add('date-col');
            const nameCell = row.insertCell(); nameCell.textContent = item.name || '-'; nameCell.classList.add('equipment-name-col');
            const qtyCell = row.insertCell(); qtyCell.textContent = item.quantity || '-'; qtyCell.classList.add('quantity-col');
            row.insertCell().textContent = item.accessories || '-';
            const empCell = row.insertCell(); empCell.textContent = item.employeeName || '-'; empCell.classList.add('employee-name-col');
            row.insertCell().textContent = item.otherInfo || '-';
            const userCell = row.insertCell(); userCell.textContent = item.recordedBy || '-'; userCell.classList.add('user-col');
            const actionCell = row.insertCell(); actionCell.classList.add('actions-cell', 'no-print', 'no-export');
            actionCell.innerHTML = `
                <button class="action-btn edit-btn" aria-label="Modifier Appareil Confié" title="Modifier" onclick="editEquipment(${originalIndex})" ${originalIndex === -1 || !canEdit ? 'disabled' : ''}>✏️</button>
                <button class="action-btn delete-btn" aria-label="Supprimer Appareil Confié" title="Supprimer" onclick="deleteEquipment(${originalIndex})" ${originalIndex === -1 || !canDelete ? 'disabled' : ''}>❌</button>
            `;
        });
    }
    function updatePieceEnLigneTable(dataToDisplay = pieceEnLigneData) { //
        if (!pieceEnLigneTable) return;
        pieceEnLigneTable.innerHTML = '';
        const isAdmin = currentUser && currentUser.status === 'Administrateur';
        const isEditor = currentUser && currentUser.status === 'Editeur'; // MODIFIED: Editor can access piece en ligne
        const canEdit = isAdmin || isEditor;
        const canDelete = isAdmin || isEditor; // MODIFIED: Editor can delete piece en ligne
        dataToDisplay.forEach((piece) => {
            const originalIndex = pieceEnLigneData.findIndex(item => item === piece);
            const row = pieceEnLigneTable.insertRow();
            row.dataset.index = originalIndex;
            row.insertCell().textContent = piece.date || '-'; row.cells[row.cells.length-1].classList.add('date-col');
            const designationCell = row.insertCell(); designationCell.textContent = piece.designation || '-'; designationCell.classList.add('piece-designation-col');
            const unitPriceCell = row.insertCell(); unitPriceCell.textContent = formatAmount(piece.unitPrice); unitPriceCell.classList.add('unit-price-col');
            const quantityCell = row.insertCell(); quantityCell.textContent = piece.quantity || '-'; quantityCell.classList.add('quantity-col');
            const totalAmountCell = row.insertCell(); totalAmountCell.textContent = formatAmount(piece.totalAmount); totalAmountCell.classList.add('amount-col');
            const userCell = row.insertCell(); userCell.textContent = piece.recordedBy || '-'; userCell.classList.add('user-col');
            const actionCell = row.insertCell(); actionCell.classList.add('actions-cell', 'no-print', 'no-export');
            actionCell.innerHTML = `
                <button class="action-btn edit-btn" aria-label="Modifier Pièce en Ligne" title="Modifier" onclick="editPieceEnLigne(${originalIndex})" ${originalIndex === -1 || !canEdit ? 'disabled' : ''}>✏️</button>
                <button class="action-btn delete-btn" aria-label="Supprimer Pièce en Ligne" title="Supprimer" onclick="deletePieceEnLigne(${originalIndex})" ${originalIndex === -1 || !canDelete ? 'disabled' : ''}>❌</button>
            `;
        });
    }
    function updateWifiZoneTable(dataToDisplay = wifiZoneData) { //
        if (!wifiZoneTable) return;
        wifiZoneTable.innerHTML = '';
        const isAdmin = currentUser && currentUser.status === 'Administrateur';
        const isRéseau = currentUser && currentUser.status === 'Réseau'; //
        const canEdit = isAdmin || isRéseau; // Admin or Réseau can edit MM
        const canDelete = isAdmin || isRéseau; // MODIFIED: Réseau can delete Wifi Zone
        dataToDisplay.forEach((wifi) => {
            const originalIndex = wifiZoneData.findIndex(item => item === wifi);
            const row = wifiZoneTable.insertRow();
            row.dataset.index = originalIndex;
            row.insertCell().textContent = wifi.date || '-'; row.cells[row.cells.length-1].classList.add('date-col');
            const designationCell = row.insertCell(); designationCell.textContent = wifi.designation || '-'; designationCell.classList.add('wifi-designation-col');
            const unitPriceCell = row.insertCell(); unitPriceCell.textContent = formatAmount(wifi.unitPrice); unitPriceCell.classList.add('unit-price-col');
            const quantityCell = row.insertCell(); quantityCell.textContent = wifi.quantity || '-'; quantityCell.classList.add('quantity-col');
            const totalAmountCell = row.insertCell(); totalAmountCell.textContent = formatAmount(wifi.totalAmount); totalAmountCell.classList.add('amount-col');
            const userCell = row.insertCell(); userCell.textContent = wifi.recordedBy || '-'; userCell.classList.add('user-col');
            const actionCell = row.insertCell(); actionCell.classList.add('actions-cell', 'no-print', 'no-export');
            actionCell.innerHTML = `
                <button class="action-btn edit-btn" aria-label="Modifier Entrée WIFI" title="Modifier" onclick="editWifiZone(${originalIndex})" ${originalIndex === -1 || !canEdit ? 'disabled' : ''}>✏️</button>
                <button class="action-btn delete-btn" aria-label="Supprimer Entrée WIFI" title="Supprimer" onclick="deleteWifiZone(${originalIndex})" ${originalIndex === -1 || !canDelete ? 'disabled' : ''}>❌</button>
            `;
        });
    }

    // NEW: Update Invoice History Table
    function updateInvoiceHistoryTable(dataToDisplay = generatedInvoicesData) {
        if (!invoiceHistoryTable) return;
        invoiceHistoryTable.innerHTML = '';
        const isAdmin = currentUser && currentUser.status === 'Administrateur';
        const isEditor = currentUser && currentUser.status === 'Editeur';
        const canEdit = isAdmin || isEditor;
        const canDelete = isAdmin || isEditor;

        // Sort invoices by date, newest first
        const sortedInvoices = [...dataToDisplay].sort((a, b) => {
            const dateA = new Date(a.date);
            const dateB = new Date(b.date);
            return dateB.getTime() - dateA.getTime();
        });

        sortedInvoices.forEach(invoice => {
            // Find the original index to allow proper deletion/modification later
            // Firebase uses unique keys, so 'id' is the direct reference
            const row = invoiceHistoryTable.insertRow();
            row.dataset.invoiceId = invoice.id;

            row.insertCell().textContent = invoice.date || '-'; row.cells[row.cells.length-1].classList.add('date-col');
            row.insertCell().textContent = invoice.number || '-'; row.cells[row.cells.length-1].classList.add('invoice-number-col');
            row.insertCell().textContent = invoice.clientName || '-'; row.cells[row.cells.length-1].classList.add('invoice-client-col');
            row.insertCell().textContent = formatAmount(invoice.totalAmount); row.cells[row.cells.length-1].classList.add('amount-col');
            row.insertCell().textContent = invoice.generatedBy || '-'; row.cells[row.cells.length-1].classList.add('user-col');

            const actionCell = row.insertCell();
            actionCell.classList.add('actions-cell', 'no-print', 'no-export');
            actionCell.innerHTML = `
                <button class="action-btn edit-btn" aria-label="Modifier Facture" title="Modifier Facture" onclick="editInvoice('${invoice.id}')" ${!canEdit ? 'disabled' : ''}>✏️</button>
                <button class="action-btn delete-btn" aria-label="Supprimer Facture" title="Supprimer Facture" onclick="deleteInvoice('${invoice.id}')" ${!canDelete ? 'disabled' : ''}>❌</button>
            `;
        });
    }


    // --- NEW: Per-Table Search Filtering Function ---
    function filterSpecificTable(inputElement) { if (!inputElement) return; const searchTerm = inputElement.value.toLowerCase().trim(); const tableId = inputElement.dataset.tableId; const columnClasses = (inputElement.dataset.columnClass || '').split(',').map(c => c.trim()).filter(c => c); const table = document.getElementById(tableId); const tbody = table?.querySelector('tbody'); if (!tbody || columnClasses.length === 0) { return; } const rows = tbody.querySelectorAll('tr'); rows.forEach(row => { let matchFound = false; if (searchTerm === '') { matchFound = true; } else { for (const colClass of columnClasses) { const cells = row.querySelectorAll(`td.${colClass}`); for (const cell of cells) { if (cell && cell.textContent.toLowerCase().includes(searchTerm)) { matchFound = true; break; } } if (matchFound) break; } } row.style.display = matchFound ? '' : 'none'; }); }
    // --- Search Filtering Function (Global) ---
    function filterTablesByDesignation() { if (!globalSearchInput) return; const searchTerm = globalSearchInput.value.toLowerCase().trim(); const tablesToFilter = [ { tbody: supplyTable, columnClass: 'designation-col' }, { tbody: stockTable, columnClass: 'designation-col' }, { tbody: salesTable, columnClass: 'designation-col' }, { tbody: materielElectriqueTable, columnClass: 'designation-col' }, { tbody: expensesTable, columnClass: 'reason-col' }, { tbody: othersTable, columnClass: 'designation-col' }, { tbody: creditorsTable, columnClass: 'designation-col' }, { tbody: debtTable, columnClass: 'description-col' }, { tbody: equipmentTable, columnClass: 'equipment-name-col' }, { tbody: pieceEnLigneTable, columnClass: 'piece-designation-col' }, { tbody: wifiZoneTable, columnClass: 'wifi-designation-col' }, { tbody: invoiceHistoryTable, columnClass: 'invoice-number-col,invoice-client-col' } ]; // MODIFIED
 tablesToFilter.forEach(config => { if (!config.tbody) { return; } const rows = config.tbody.querySelectorAll('tr'); rows.forEach(row => { const cell = row.querySelector(`td.${config.columnClass}`); if (cell) { const cellText = cell.textContent.toLowerCase(); if (searchTerm === '' || cellText.includes(searchTerm)) { row.style.display = ''; } else { row.style.display = 'none'; } } }); }); }

    // --- Form Submit Handlers ---
    if (supplyForm) supplyForm.addEventListener('submit', function (event) { //
        event.preventDefault();
        const isEditor = currentUser && currentUser.status === 'Editeur';
        const isAdmin = currentUser && currentUser.status === 'Administrateur';
        const editIndex = supplyEditIndexInput ? parseInt(supplyEditIndexInput.value, 10) : -1;
        const isEditing = editIndex > -1;

        if (!currentUser || (!isAdmin && !isEditor)) {
            alert("Accès Refusé: Permissions insuffisantes."); return;
        }
        if (isEditing && !isAdmin) { // Only Admin can edit
            alert("Accès Refusé: Seuls les administrateurs peuvent modifier."); return;
        }

        if (!supplyDateInput || !supplyTypeSelect || !supplyDesignationInput || !supplyQuantityInput || !supplyUnitPriceInput || !supplyTotalAmountInput) { alert("Erreur interne: Champs appro. manquants."); return; }
        const date = supplyDateInput.value; const type = supplyTypeSelect.value; const designation = supplyDesignationInput.value.trim();
        const quantity = parseFloat(supplyQuantityInput.value); const unitPrice = parseFloat(supplyUnitPriceInput.value); const totalAmount = parseFloat(supplyTotalAmountInput.value);
        if (!date || !type || !designation || isNaN(quantity) || quantity <= 0 || isNaN(unitPrice) || unitPrice < 0 || isNaN(totalAmount)) { alert("Veuillez remplir correctement tous les champs d'approvisionnement."); return; }
        const isStockableType = (type === 'Papeterie' || type === 'Matériels électrique');
        let originalStockableStatus = false; let requiresStockUpdate = false; let originalDataBackup = null;
        if (isStockableType) { const conflictingItem = supplyData.find((item, index) => item.designation === designation && (item.type === 'Papeterie' || item.type === 'Matériels électrique') && item.type !== type && index !== editIndex); if (conflictingItem) { alert(`Attention : Désignation "${designation}" existe déjà pour le type stockable "${conflictingItem.type}". Veuillez utiliser une désignation unique ou vérifier le type.`); return; } }
        const newData = { date, type, designation, quantity, unitPrice, totalAmount };
        let tempLocalData = [...supplyData];

        if (isEditing) {
            if (editIndex >= supplyData.length) { alert("Erreur : index de modification invalide."); return; }
            originalDataBackup = JSON.parse(JSON.stringify(supplyData[editIndex]));
            newData.recordedBy = originalDataBackup.recordedBy;
            newData.lastModifiedBy = currentUser?.username || 'N/A';
            newData.lastModifiedDate = new Date().toISOString();
            tempLocalData[editIndex] = newData;
        } else {
            newData.recordedBy = currentUser?.username || 'N/A';
            tempLocalData.push(newData);
        }

        saveDataToFirebase('supplyData', tempLocalData)
            .then(() => {
                const action = isEditing ? 'mis à jour' : 'ajouté';
                alert(`Approvisionnement ${action}.`);
                supplyForm.reset();
                setTodaysDate();
                updateConnectedUserFields();
                if (supplyEditIndexInput) supplyEditIndexInput.value = '';
                supplyForm.querySelector('button[type="submit"]').textContent = 'Ajouter Approvisionnement';
                supplySection?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            })
            .catch(error => { /* Error handled by saveDataToFirebase */ });
    });

    if (salesForm) salesForm.addEventListener('submit', function (event) { //
        event.preventDefault();
        const editIndex = salesEditIndexInput ? parseInt(salesEditIndexInput.value, 10) : -1;
        const editType = salesEditTypeInput?.value || '';
        const isEditing = editIndex > -1 && editType;
        const isAdmin = currentUser && currentUser.status === 'Administrateur';
        const isEditor = currentUser && currentUser.status === 'Editeur';

        if (!currentUser || (!isAdmin && !isEditor)) {
            alert("Accès Refusé: Permissions insuffisantes."); return;
        }
        if (isEditing && !isAdmin) { // Only Admin can edit
            alert("Accès Refusé: Seuls les administrateurs peuvent modifier."); return;
        }

        if (!saleDateInput?.value) { alert("La date est requise."); return; }
        const date = saleDateInput.value; const operationType = operationTypeSelect.value; const recordedBy = currentUser?.username || 'N/A'; let needsStockUpdate = false; let dataArray, storageKey, originalDataBackup = null; let tempLocalData = null;
        try {
            let itemData = { date };
            if (operationType === 'Papeterie') { dataArray = salesData; storageKey = 'salesData'; }
            else if (operationType === 'Matériels électrique') { dataArray = materielElectriqueData; storageKey = 'materielElectriqueData'; }
            else if (operationType === 'Dépenses') { dataArray = expensesData; storageKey = 'expensesData'; }
            else if (operationType === 'Divers') { dataArray = othersData; storageKey = 'othersData'; }
            else { throw new Error("Type d'opération inconnu."); }

            if (isEditing) {
                if (editType !== operationType) { throw new Error("Modification impossible: Le type d'opération ne peut pas être changé. Supprimez et recréz l'entrée."); }
                if (editIndex >= dataArray.length) { throw new Error("Erreur interne: Index de modification invalide."); }
                originalDataBackup = JSON.parse(JSON.stringify(dataArray[editIndex]));
            }

            if (operationType === 'Papeterie' || operationType === 'Matériels électrique') {
                needsStockUpdate = true;
                const designationSelect = (operationType === 'Papeterie') ? saleDesignationSelect : meDesignationSelect;
                const quantityInput = (operationType === 'Papeterie') ? saleQuantityInput : meQuantityInput;
                const unitPriceInput = (operationType === 'Papeterie') ? saleUnitPriceInput : meUnitPriceInput;
                const totalAmountInput = (operationType === 'Papeterie') ? saleTotalAmountInput : meTotalAmountInput;
                itemData.type = operationType;
                itemData.designation = designationSelect.value; if (!itemData.designation) throw new Error("Sélectionnez une désignation.");
                itemData.quantity = parseFloat(quantityInput.value) || 0; if (itemData.quantity <= 0) throw new Error("Quantité > 0 requise.");
                itemData.unitPrice = parseFloat(unitPriceInput.value) || 0; if (itemData.unitPrice < 0) throw new Error("Prix unitaire >= 0 requis.");
                itemData.totalAmount = parseFloat(totalAmountInput.value) || (itemData.quantity * itemData.unitPrice);
                const stockChange = isEditing ? itemData.quantity - originalDataBackup.quantity : itemData.quantity;
                if (stockChange !== 0) {
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
                itemData.type = 'Divers';
                itemData.designation = otherDesignationInput.value.trim(); if (!itemData.designation) throw new Error("Désignation/Motif requis pour Divers.");
                itemData.quantity = otherQuantityInput.value ? (parseFloat(otherQuantityInput.value) || null) : null;
                itemData.totalAmount = parseFloat(otherTotalAmountInput.value); if (isNaN(itemData.totalAmount) || itemData.totalAmount <= 0) throw new Error("Montant Total Divers > 0 requis.");
            }

            tempLocalData = [...dataArray];
            if (isEditing) {
                itemData.recordedBy = originalDataBackup.recordedBy;
                itemData.lastModifiedBy = recordedBy;
                itemData.lastModifiedDate = new Date().toISOString();
                tempLocalData[editIndex] = { ...originalDataBackup, ...itemData };
            } else {
                itemData.recordedBy = recordedBy;
                tempLocalData.push(itemData);
            }

            if (!storageKey) throw new Error("Erreur interne: Clé de sauvegarde indéterminée.");

            saveDataToFirebase(storageKey, tempLocalData)
                .then(() => {
                    const action = isEditing ? 'mise à jour' : 'ajoutée';
                    alert(`Opération ${action}.`);
                    salesForm.reset();
                    setTodaysDate();
                    handleOperationTypeChange();
                    updateConnectedUserFields();
                    if (salesEditIndexInput) salesEditIndexInput.value = '';
                    if (salesEditTypeInput) salesEditTypeInput.value = '';
                    salesForm.querySelector('button[type="submit"]').textContent = 'Ajouter';
                    salesSection?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                })
                .catch(error => { /* Error handled by saveDataToFirebase */ });
        } catch (error) {
            alert(`Erreur ajout/modification opération: ${error.message}`);
        }
    });

    if (employeeForm) employeeForm.addEventListener('submit', function (event) { //
        event.preventDefault();
        if (!currentUser || !(currentUser.status === 'Administrateur' || currentUser.status === 'Editeur')) { // Added 'Editeur' for permission to add but not edit/delete
            alert("Accès Refusé: Permissions insuffisantes."); return;
        }
        const editIndex = employeeEditIndexInput ? parseInt(employeeEditIndexInput.value, 10) : -1;
        const isEditing = editIndex > -1;
        if (isEditing && currentUser.status !== 'Administrateur') { // Only Admin can edit
             alert("Accès Refusé: Seuls les administrateurs peuvent modifier."); return;
        }
        if (!employeeNomInput) { alert("Erreur interne: Champ nom employé manquant."); return; } const nom = employeeNomInput.value.trim(); if (!nom) { alert("Nom employé requis."); return; } const salaryValue = employeeSalaryInput ? parseFloat(employeeSalaryInput.value) : null; const paidAmountValue = employeePaidAmountInput ? parseFloat(employeePaidAmountInput.value) : 0; if (salaryValue !== null && (isNaN(salaryValue) || salaryValue < 0)) { alert("Le salaire doit être un nombre positif ou vide."); return; } if (isNaN(paidAmountValue) || paidAmountValue < 0) { alert("Montant payé doit être un nombre positif ou zéro."); return; } const employeeDataObj = { nom, prenom: employeePrenomInput?.value.trim() || '', statut: employeeRoleInput?.value.trim() || '', adresse: employeeAdresseInput?.value.trim() || '', telephone: employeeTelephoneInput?.value.trim() || '', lieuResidence: employeeLieuResidenceInput?.value.trim() || '', joursTravail: employeeJoursTravailInput?.value.trim() || '', heureArrivee: employeeHeureArriveeInput?.value || '', heureDepart: employeeHeureDepartInput?.value || '', salary: salaryValue, paidAmount: paidAmountValue, hireDate: employeeHireDateInput?.value || '', contactPersonNom: employeeContactPersonNomInput?.value.trim() || '', contactPersonPrenom: employeeContactPersonPrenomInput?.value.trim() || '', contactPersonAdresse: employeeContactPersonAdresseInput?.value.trim() || '', contactPersonTelephone: employeeContactPersonTelephoneInput?.value.trim() || '', contactPersonLieuResidence: employeeContactPersonLieuResidenceInput?.value.trim() || '' }; let originalDataBackup = null; let tempLocalData = [...employeesData]; if (isEditing) { if (editIndex >= tempLocalData.length) { alert("Erreur: Index employé invalide."); return; } originalDataBackup = JSON.parse(JSON.stringify(tempLocalData[editIndex])); employeeDataObj.paymentHistory = originalDataBackup.paymentHistory || []; employeeDataObj.recordedBy = originalDataBackup.recordedBy; employeeDataObj.lastModifiedBy = currentUser?.username || 'N/A'; employeeDataObj.lastModifiedDate = new Date().toISOString(); tempLocalData[editIndex] = employeeDataObj; } else { employeeDataObj.recordedBy = currentUser?.username || 'N/A'; tempLocalData.push(employeeDataObj); }
        saveDataToFirebase('employeesData', tempLocalData)
            .then(() => {
                const action = isEditing ? 'mis à jour' : 'ajouté';
                alert(`Employé ${action}.`);
                employeeForm.reset();
                setTodaysDate();
                updateConnectedUserFields();
                if (employeeEditIndexInput) employeeEditIndexInput.value = '';
                employeeForm.querySelector('button[type="submit"]').textContent = 'Ajouter Employé';
                employeesSection?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            })
            .catch(error => { /* Error handled */ });
    });
    if (learnerForm) learnerForm.addEventListener('submit', function (event) { //
        event.preventDefault();
        if (!currentUser || !(currentUser.status === 'Administrateur' || currentUser.status === 'Editeur')) { // Added 'Editeur' for permission to add but not edit/delete
            alert("Accès Refusé: Permissions insuffisantes."); return;
        }
        const editIndex = learnerEditIndexInput ? parseInt(learnerEditIndexInput.value, 10) : -1;
        const isEditing = editIndex > -1;
         if (isEditing && currentUser.status !== 'Administrateur') { // Only Admin can edit
             alert("Accès Refusé: Seuls les administrateurs peuvent modifier."); return;
         }
        if (!learnerNomInput || !learnerFiliereInput) { alert("Erreur interne: Champs apprenant manquants."); return; } const nom = learnerNomInput.value.trim(); const filiere = learnerFiliereInput.value.trim(); if (!nom || !filiere) { alert("Nom et filière requis."); return; } const ageValue = learnerAgeInput ? parseInt(learnerAgeInput.value) : null; const fraisDocsValue = learnerFraisDocumentsInput ? parseFloat(learnerFraisDocumentsInput.value) : 0; const tranche1Value = learnerTranche1Input ? parseFloat(learnerTranche1Input.value) : 0; const tranche2Value = learnerTranche2Input ? parseFloat(learnerTranche2Input.value) : 0; const tranche3Value = learnerTranche3Input ? parseFloat(learnerTranche3Input.value) : 0; const tranche4Value = learnerTranche4Input ? parseFloat(learnerTranche4Input.value) : 0; if (ageValue !== null && (isNaN(ageValue) || ageValue < 0)) { alert("L'âge doit être un nombre positif."); return; } if (isNaN(fraisDocsValue) || fraisDocsValue < 0 || isNaN(tranche1Value) || tranche1Value < 0 || isNaN(tranche2Value) || tranche2Value < 0 || isNaN(tranche3Value) || tranche3Value < 0 || isNaN(tranche4Value) || tranche4Value < 0) { alert("Frais et montants des tranches doivent être des nombres positifs ou zéro."); return; } const learnerDataObj = { nom, prenom: learnerPrenomInput?.value.trim() || '', age: ageValue, adresse: learnerAdresseInput?.value.trim() || '', lieuResidence: learnerLieuResidenceInput?.value.trim() || '', niveauEtudes: learnerNiveauEtudesInput?.value.trim() || '', situationMatrimoniale: learnerSituationMatrimonialeSelect?.value || '', pereNom: learnerPereNomInput?.value.trim() || '', perePrenom: learnerPerePrenomInput?.value.trim() || '', mereNom: learnerMereNomInput?.value.trim() || '', merePrenom: learnerMerePrenomInput?.value.trim() || '', filiere, dureeFormation: learnerDureeFormationInput?.value.trim() || '', fraisDocuments: fraisDocsValue, tranche1: tranche1Value, tranche2: tranche2Value, tranche3: tranche3Value, tranche4: tranche4Value, garantNom: learnerGarantNomInput?.value.trim() || '', garantPrenom: learnerGarantPrenomInput?.value.trim() || '', garantTelephone: learnerGarantTelephoneInput?.value.trim() || '', garantAdresse: learnerGarantAdresseInput?.value.trim() || '' }; let originalDataBackup = null; let tempLocalData = [...learnersData]; if (isEditing) { if (editIndex >= tempLocalData.length) { alert("Erreur: Index apprenant invalide."); return; } originalDataBackup = JSON.parse(JSON.stringify(tempLocalData[editIndex])); learnerDataObj.paymentHistory = originalDataBackup.paymentHistory || []; learnerDataObj.recordedBy = originalDataBackup.recordedBy; learnerDataObj.lastModifiedBy = currentUser?.username || 'N/A'; learnerDataObj.lastModifiedDate = new Date().toISOString(); tempLocalData[editIndex] = learnerDataObj; } else { learnerDataObj.recordedBy = currentUser?.username || 'N/A'; tempLocalData.push(learnerDataObj); }
        saveDataToFirebase('learnersData', tempLocalData)
            .then(() => {
                const action = isEditing ? 'mis à jour' : 'ajouté';
                alert(`Apprenant ${action}.`);
                learnerForm.reset();
                updateConnectedUserFields();
                setTodaysDate();
                if (learnerEditIndexInput) learnerEditIndexInput.value = '';
                learnerForm.querySelector('button[type="submit"]').textContent = 'Ajouter Apprenant';
                learnersSection?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            })
            .catch(error => { /* Error handled */ });
    });
    if (mobileMoneyForm) mobileMoneyForm.addEventListener('submit', function (event) { //
        event.preventDefault();
        if (!currentUser || !(currentUser.status === 'Administrateur' || currentUser.status === 'Réseau')) { // Admin or Réseau can manage
            alert("Accès Refusé: Seuls les administrateurs ou Réseau peuvent gérer le Mobile Money."); return;
        }
        const editIndex = mobileMoneyEditIndexInput ? parseInt(mobileMoneyEditIndexInput.value, 10) : -1; const isEditing = editIndex > -1;
        if (isEditing && currentUser.status !== 'Administrateur' && currentUser.status !== 'Réseau') { // Only Admin or Réseau can edit
             alert("Accès Refusé: Seuls les administrateurs ou Réseau peuvent modifier."); return;
        }
        if (!mmDateInput || !mmAgentInput) { alert("Erreur interne: Champs Point MM manquants."); return; } const date = mmDateInput.value; const agent = mmAgentInput.value.trim(); if (!date || !agent) { alert("Date et Agent requis pour Point MM."); return; } const balanceMoov = parseFloat(mmBalanceMoovInput?.value) || 0; const balanceMTN = parseFloat(mmBalanceMtnInput?.value) || 0; const balanceCelttis = parseFloat(mmBalanceCelttisInput?.value) || 0; const balanceCash = parseFloat(mmBalanceCashInput?.value) || 0; const creditMoov = parseFloat(mmCreditMoovInput?.value) || 0; const creditMTN = parseFloat(mmCreditMtnInput?.value) || 0; const creditCelttis = parseFloat(mmCreditCelttisInput?.value) || 0; const perteTransfert = parseFloat(mmPerteTransfertInput?.value) || 0; const perteCredit = parseFloat(mmPerteCreditInput?.value) || 0; if (balanceMoov < 0 || balanceMTN < 0 || balanceCelttis < 0 || balanceCash < 0 || creditMoov < 0 || creditMTN < 0 || creditCelttis < 0 || perteTransfert < 0 || perteCredit < 0) { alert("Soldes, crédits, et pertes MM ne peuvent pas être négatifs."); return; } const transactionData = { date, agent, balanceMoov, balanceMTN, balanceCelttis, balanceCash, creditMoov, creditMTN, creditCelttis, perteTransfert, perteCredit }; let originalDataBackup = null; let tempLocalData = [...mobileMoneyData]; if (isEditing) { if (editIndex >= tempLocalData.length) { alert("Erreur: Index Point MM invalide."); return; } const existingEntryIndex = tempLocalData.findIndex((item, idx) => item.date === date && item.agent === agent && idx !== editIndex); if (existingEntryIndex > -1) { alert(`Modification impossible : un autre point existe déjà pour ${agent} à la date ${date}.`); return; } originalDataBackup = JSON.parse(JSON.stringify(tempLocalData[editIndex])); transactionData.recordedBy = originalDataBackup.recordedBy; transactionData.lastModifiedBy = currentUser?.username || 'N/A'; transactionData.lastModifiedDate = new Date().toISOString(); tempLocalData[editIndex] = transactionData; } else { const existingEntryIndex = tempLocalData.findIndex(item => item.date === date && item.agent === agent); if (existingEntryIndex > -1) { alert(`Ajout impossible : point existe déjà pour ${agent} à la date ${date}. Modifiez l'entrée existante.`); return; } transactionData.recordedBy = currentUser?.username || 'N/A'; tempLocalData.push(transactionData); }
        saveDataToFirebase('mobileMoneyData', tempLocalData)
            .then(() => {
                const action = isEditing ? 'mis à jour' : 'ajouté';
                alert(`Point Mobile Money ${action}.`);
                mobileMoneyForm.reset();
                setTodaysDate();
                updateConnectedUserFields();
                if (mobileMoneyEditIndexInput) mobileMoneyEditIndexInput.value = '';
                mobileMoneyForm.querySelector('button[type="submit"]').textContent = 'Ajouter Point Journalier';
                mobileMoneySection?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            })
            .catch(error => { /* Error handled */ });
    });
    if (mmFournisseurForm) mmFournisseurForm.addEventListener('submit', function (event) { //
        event.preventDefault();
        if (!currentUser || !(currentUser.status === 'Administrateur' || currentUser.status === 'Réseau')) { // Admin or Réseau can manage
            alert("Accès Refusé: Seuls les administrateurs ou Réseau peuvent gérer les fournisseurs MM."); return;
        }
        const editKey = mmFournisseurEditKeyInput?.value || ''; const isEditing = !!editKey;
        if (isEditing && currentUser.status !== 'Administrateur' && currentUser.status !== 'Réseau') { // Only Admin or Réseau can edit
             alert("Accès Refusé: Seuls les administrateurs ou Réseau peuvent modifier."); return;
        }
        const nom = mmFournisseurNomInput?.value.trim(); const prenom = mmFournisseurPrenomInput?.value.trim(); const contact = mmFournisseurContactInput?.value.trim(); const montantFourni = parseFloat(mmFournisseurMontantInput?.value); const interet = parseFloat(mmFournisseurInteretInput?.value); const creditVendu = parseFloat(mmFournisseurVenduInput?.value) || 0; if (!nom) { alert("Nom fournisseur MM requis."); return; } if (isNaN(montantFourni) || montantFourni < 0) { alert("Montant Fourni doit être un nombre positif."); return; } if (creditVendu < 0) { alert("Crédit Vendu ne peut être négatif."); return; } if (!isNaN(interet) && interet < 0) { alert("Intérêt ne peut être négatif."); return; } const fournisseurDataObj = { nom, prenom, contact, montantFourni, interet: !isNaN(interet) ? interet : null, creditVendu }; let existingIndex = -1; let isNameChangeDuringEdit = false; let originalDataBackup = null; let tempLocalData = [...mmFournisseursData]; if (isEditing) { const [editNom, editPrenom] = editKey.split('_'); existingIndex = tempLocalData.findIndex(f => f.nom === editNom && f.prenom === editPrenom); if (existingIndex > -1) { originalDataBackup = JSON.parse(JSON.stringify(tempLocalData[existingIndex])); if (nom !== editNom || prenom !== editPrenom) { isNameChangeDuringEdit = true; } fournisseurDataObj.recordedBy = originalDataBackup.recordedBy; fournisseurDataObj.lastModifiedBy = currentUser?.username || 'N/A'; fournisseurDataObj.lastModifiedDate = new Date().toISOString(); tempLocalData[existingIndex] = fournisseurDataObj; } else { alert("Erreur: Fournisseur à modifier non trouvé."); return; } } else { existingIndex = tempLocalData.findIndex(f => f.nom === nom && f.prenom === prenom); if (existingIndex > -1) { alert(`Fournisseur ${nom} ${prenom} existe déjà. Modifiez via le tableau.`); return; } fournisseurDataObj.recordedBy = currentUser?.username || 'N/A'; } if (isNameChangeDuringEdit) { const duplicateCheck = tempLocalData.findIndex(f => f.nom === nom && f.prenom === prenom); if (duplicateCheck > -1) { alert(`Impossible de renommer : le fournisseur ${nom} ${prenom} existe déjà.`); const [origN, origP] = editKey.split('_'); mmFournisseurNomInput.value = origN; mmFournisseurPrenomInput.value = origP; return; } tempLocalData.splice(existingIndex, 1); tempLocalData.push(fournisseurDataObj); } else if (isEditing) { tempLocalData[existingIndex] = fournisseurDataObj; } else { tempLocalData.push(fournisseurDataObj); }
        saveDataToFirebase('mmFournisseursData', tempLocalData)
            .then(() => {
                const action = isEditing ? (isNameChangeDuringEdit ? 'renommé/mis à jour' : 'mis à jour') : 'ajouté';
                alert(`Fournisseur ${nom} ${prenom} ${action}.`);
                mmFournisseurForm.reset();
                updateConnectedUserFields();
                setTodaysDate();
                if (mmFournisseurEditKeyInput) mmFournisseurEditKeyInput.value = '';
                mmFournisseurForm.querySelector('button[type="submit"]').textContent = 'Ajouter / Mettre à Jour Fournisseur';
                mobileMoneySection?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            })
            .catch(error => { /* Error handled */ });
    });
    if (clientProfileForm) clientProfileForm.addEventListener('submit', function (event) { //
        event.preventDefault();
        if (!currentUser || !(currentUser.status === 'Administrateur' || currentUser.status === 'Editeur')) {
            alert("Accès Refusé: Permissions insuffisantes."); return;
        }
        const editKey = clientProfileEditKeyInput?.value || '';
        const isEditing = !!editKey;
         if (isEditing && currentUser.status !== 'Administrateur') { // Only Admin can edit
             alert("Accès Refusé: Seuls les administrateurs peuvent modifier."); return;
         }
        const nom = clientProfileNomInput?.value.trim(); const prenom = clientProfilePrenomInput?.value.trim(); const adresse = clientProfileAdresseInput?.value.trim(); const contact = clientProfileContactInput?.value.trim(); const statut = clientProfileStatutInput?.value.trim(); if (!nom) { alert("Nom client requis pour profil."); return; } const profileDataObj = { nom, prenom, adresse, contact, statut }; const newFullName = `${nom} ${prenom}`.trim(); let existingIndex = -1; let isNameChangeDuringEdit = false; let originalFullName = ''; let originalProfileBackup = null; let tempProfilesData = [...clientProfilesData]; let tempCreditorsData = [...creditorsData]; let creditorsNeedUpdate = false; if (isEditing) { const [editNom, editPrenom] = editKey.split('_'); originalFullName = `${editNom} ${editPrenom}`.trim(); existingIndex = tempProfilesData.findIndex(p => p.nom === editNom && p.prenom === editPrenom); if (existingIndex > -1) { originalProfileBackup = JSON.parse(JSON.stringify(tempProfilesData[existingIndex])); if (newFullName !== originalFullName) { isNameChangeDuringEdit = true; } profileDataObj.recordedBy = originalProfileBackup.recordedBy; profileDataObj.lastModifiedBy = currentUser?.username || 'N/A'; profileDataObj.lastModifiedDate = new Date().toISOString(); tempProfilesData[existingIndex] = profileDataObj; } else { alert("Erreur: Profil à modifier non trouvé."); return; } } else { existingIndex = tempProfilesData.findIndex(p => p.nom === nom && p.prenom === prenom); if (existingIndex > -1) { alert(`Profil ${nom} ${prenom} existe déjà. Modifiez via le tableau.`); return; } profileDataObj.recordedBy = currentUser?.username || 'N/A'; } if (isNameChangeDuringEdit) { const duplicateCheck = tempProfilesData.findIndex(p => p.nom === nom && p.prenom === prenom); if (duplicateCheck > -1) { alert(`Impossible de renommer : le profil ${nom} ${prenom} existe déjà.`); const [origN, origP] = editKey.split('_'); clientProfileNomInput.value = origN; clientProfilePrenomInput.value = origP; return; } tempCreditorsData.forEach((cred, index) => { if (cred.name === originalFullName) { tempCreditorsData[index].name = newFullName; creditorsNeedUpdate = true; } }); tempProfilesData.splice(existingIndex, 1); tempProfilesData.push(profileDataObj); } else if (isEditing) { tempProfilesData[existingIndex] = profileDataObj; } else { tempProfilesData.push(profileDataObj); } const savePromises = [saveDataToFirebase('clientProfilesData', tempProfilesData)]; if (creditorsNeedUpdate) { savePromises.push(saveDataToFirebase('creditorsData', tempCreditorsData)); }
        Promise.all(savePromises)
            .then(() => {
                const action = isEditing ? (isNameChangeDuringEdit ? 'renommé' : 'mis à jour') : 'ajouté';
                alert(`Profil client ${nom} ${prenom} ${action}.${creditorsNeedUpdate ? ' Transactions crédit associées mises à jour.' : ''}`);
                clientProfileForm.reset();
                updateConnectedUserFields();
                setTodaysDate();
                if (clientProfileEditKeyInput) clientProfileEditKeyInput.value = '';
                clientProfileForm.querySelector('button[type="submit"]').textContent = 'Ajouter / Mettre à Jour Profil';
                creditorsSection?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            })
            .catch(error => { /* Error handled */ });
    });

    // MODIFIED: Creditor Form Submit
    if (creditorForm) creditorForm.addEventListener('submit', function (event) { //
        event.preventDefault();
         if (!currentUser || !(currentUser.status === 'Administrateur' || currentUser.status === 'Editeur')) {
            alert("Accès Refusé: Permissions insuffisantes."); return;
        }
        if (!creditorDateInput || !creditorNameSelect || !creditorAmountPaidInput) { alert("Erreur interne: Champs Transaction Crédit manquants."); return; }
        
        const date = creditorDateInput.value;
        const name = creditorNameSelect.value;
        const designationSource = creditorDesignationSelect.value; // Can be an existing item or "Autre"
        const customDesignation = creditorCustomDesignationInput.value.trim();
        let designation;

        if (designationSource === "Autre") {
            if (!customDesignation) { alert("Veuillez saisir la nouvelle désignation."); return; }
            designation = customDesignation;
        } else if (!designationSource) {
            alert("Veuillez choisir une désignation ou 'Autre' pour une nouvelle."); return;
        } else {
            designation = designationSource;
        }

        const quantity = creditorQuantityInput?.value ? (parseFloat(creditorQuantityInput.value) || null) : null;
        const unitPrice = creditorUnitPriceInput?.value ? (parseFloat(creditorUnitPriceInput.value) || null) : null;
        const totalAmountDueEntered = parseFloat(creditorTotalAmountDueInput.value);
        const amountPaidNow = parseFloat(creditorAmountPaidInput.value);
        const dueDate = creditorDueDateInput?.value || '';
        const recordedBy = currentUser?.username || 'N/A';

        if (!date || !name || !designation) { alert("Date, Client et Désignation requis."); return; }
        if (isNaN(amountPaidNow) || amountPaidNow < 0) { alert("Montant Payé doit être un nombre positif ou zéro."); return; }

        let tempLocalData = [...creditorsData];
        let dataChanged = false;

        // Check if we are editing an existing transaction or adding a new payment/transaction
        const editIndex = creditorEditIndexInput ? parseInt(creditorEditIndexInput.value, 10) : -1;
        const isEditingTransaction = editIndex > -1;

        if (isEditingTransaction) {
            // Logic for editing an existing transaction (full record modification)
            if (!isAdmin) { alert("Accès Refusé: Seuls les administrateurs peuvent modifier une transaction de crédit."); return; } // Only Admin can fully edit transaction
            if (editIndex >= tempLocalData.length) { alert("Erreur: Index de transaction crédit invalide."); return; }
            const originalTransaction = JSON.parse(JSON.stringify(tempLocalData[editIndex]));

            // If changing designation, ensure it doesn't conflict with another active one
            if (designation !== originalTransaction.designation) {
                const existingConflict = tempLocalData.some((c, idx) =>
                    idx !== editIndex && c.name === name && c.designation === designation &&
                    ((c.totalAmountDue || 0) - (c.amountPaidTotal || 0) > 0.005)
                );
                if (existingConflict) {
                    alert(`Impossible de renommer: la désignation "${designation}" existe déjà pour un crédit en cours pour ce client.`);
                    return;
                }
            }

            // Update all fields of the existing transaction
            tempLocalData[editIndex] = {
                ...originalTransaction, // Keep history and recordedBy etc.
                date: date,
                name: name,
                designation: designation,
                quantity: quantity,
                unitPrice: unitPrice,
                totalAmountDue: totalAmountDueEntered, // Direct update of totalAmountDue when editing the transaction
                amountPaidTotal: amountPaidNow, // Update the total paid amount for the edited transaction
                dueDate: dueDate || null,
                lastModifiedBy: recordedBy,
                lastModifiedDate: new Date().toISOString()
            };

            alert(`Transaction crédit pour ${name} - "${designation}" mise à jour.`);
            dataChanged = true;

        } else {
            // Logic for adding a payment or creating a new credit
            const existingOutstandingCreditorIndex = creditorsData.findIndex(c => c.name === name && c.designation === designation && ((c.totalAmountDue || 0) - (c.amountPaidTotal || 0) > 0.005) );

            if (existingOutstandingCreditorIndex > -1) {
                // Paying for an existing outstanding credit
                const existingCreditorInCopy = tempLocalData[existingOutstandingCreditorIndex];
                if (!existingCreditorInCopy) throw new Error("Incohérence interne: crédit non trouvé dans la copie locale.");

                const currentRemaining = (existingCreditorInCopy.totalAmountDue || 0) - (existingCreditorInCopy.amountPaidTotal || 0);

                // User should not manually set totalAmountDue when paying an existing item
                if (!isNaN(totalAmountDueEntered) && totalAmountDueEntered > 0 && Math.abs(totalAmountDueEntered - existingCreditorInCopy.totalAmountDue) > 0.01) {
                    // console.warn(`Montant Total Dû entré (${formatAmount(totalAmountDueEntered)}) ignoré pour paiement car un crédit existant est sélectionné.`);
                    // This is just a payment, not an edit of the original total due amount.
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

            } else {
                // Creating a new credit transaction
                if (designationSource !== "Autre" && !confirm(`La désignation "${designation}" n'a pas de crédit en cours pour ce client. Voulez-vous créer une NOUVELLE transaction de crédit avec cette désignation ?`)) {
                    return;
                }

                let finalTotalDue;
                if ((isNaN(totalAmountDueEntered) || totalAmountDueEntered <= 0) && quantity !== null && unitPrice !== null && quantity > 0 && unitPrice >= 0) {
                    finalTotalDue = quantity * unitPrice;
                    if (finalTotalDue <= 0) throw new Error("Montant Total Dû calculé doit être > 0.");
                    creditorTotalAmountDueInput.value = formatAmount(finalTotalDue); // Update display
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

                const newCreditor = {
                    date, name, designation, quantity, unitPrice,
                    totalAmountDue: finalTotalDue,
                    amountPaidTotal: amountPaidNow,
                    lastPaymentDate: date,
                    dueDate: dueDate || null,
                    recordedBy: recordedBy,
                    paymentHistory: [{ date, amount: amountPaidNow, recordedBy }]
                };
                tempLocalData.push(newCreditor);
                alert(`Nouveau crédit créé (préparation sauvegarde) pour ${name} - "${designation}".\nDû: ${formatAmount(finalTotalDue)}, Payé: ${formatAmount(amountPaidNow)}, Restant: ${formatAmount(finalTotalDue - amountPaidNow)}`);
                dataChanged = true;
            }
        }

        if (dataChanged) {
            saveDataToFirebase('creditorsData', tempLocalData)
                .then(() => {
                    console.log('Creditor data saved to Firebase.');
                    creditorForm.reset();
                    updateCreditorFormForClient(); // Repopulate to reflect new totals/outstanding
                    setTodaysDate();
                    updateConnectedUserFields();
                    if (creditorEditIndexInput) creditorEditIndexInput.value = ''; // Clear edit index
                    creditorForm.querySelector('button[type="submit"]').textContent = 'Ajouter Paiement / Créer Crédit'; // Reset button text
                    creditorsSection?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                })
                .catch(error => { /* Error handled */ });
        }
    });

    if (debtForm) debtForm.addEventListener('submit', function (event) { //
        event.preventDefault();
        if (!currentUser || currentUser.status !== 'Administrateur') {
            alert("Accès Refusé: Seuls les administrateurs peuvent gérer les dettes/prêts."); return;
        }
        const editIndex = debtEditIndexInput ? parseInt(debtEditIndexInput.value, 10) : -1; const isEditing = editIndex > -1;
        if (!debtDateInput || !debtTypeSelect || !debtNameInput || !debtDescriptionInput || !debtAmountInput || !debtStatusSelect) { alert("Erreur interne: Champs Dette/Prêt manquants."); return; } const date = debtDateInput.value; const type = debtTypeSelect.value; const name = debtNameInput.value.trim(); const description = debtDescriptionInput.value.trim(); const amount = parseFloat(debtAmountInput.value); const dueDate = debtDueDateInput?.value || ''; const status = debtStatusSelect.value; if (!date || !type || !name || !description || isNaN(amount) || amount <= 0 || !status) { alert("Veuillez remplir correctement tous les champs Dette/Prêt (Montant doit être > 0)."); return; } const debtItemData = { date, type, name, description, amount, dueDate, status }; let originalDataBackup = null; let tempLocalData = [...debtData]; if (isEditing) { if (editIndex >= tempLocalData.length) { alert("Erreur: Index Dette/Prêt invalide."); return; } originalDataBackup = JSON.parse(JSON.stringify(tempLocalData[editIndex])); debtItemData.recordedBy = originalDataBackup.recordedBy; debtItemData.lastModifiedBy = currentUser?.username || 'N/A'; debtItemData.lastModifiedDate = new Date().toISOString(); tempLocalData[editIndex] = debtItemData; } else { const isDuplicate = tempLocalData.some(d => d.date === date && d.type === type && d.name === name && d.description === description && d.amount === amount); if (isDuplicate) { if (!confirm("Une entrée très similaire existe déjà. Voulez-vous l'ajouter quand même ?")) { return; } } debtItemData.recordedBy = currentUser?.username || 'N/A'; tempLocalData.push(debtItemData); }
        saveDataToFirebase('debtData', tempLocalData)
            .then(() => {
                const action = isEditing ? 'mise à jour' : 'ajoutée';
                alert(`Dette/Prêt ${action}.`);
                debtForm.reset();
                setTodaysDate();
                updateConnectedUserFields();
                if (debtEditIndexInput) debtEditIndexInput.value = '';
                debtForm.querySelector('button[type="submit"]').textContent = 'Ajouter Dette/Prêt';
                debtSection?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            })
            .catch(error => { /* Error handled */ });
    });

    if (permissionEmployeeForm) permissionEmployeeForm.addEventListener('submit', function (event) { //
        event.preventDefault();
         if (!currentUser || !(currentUser.status === 'Administrateur' || currentUser.status === 'Editeur')) { // Added 'Editeur' for permission to add but not edit/delete
            alert("Accès Refusé: Permissions insuffisantes."); return;
        }
        const requestDate = permEmpReqDateInput?.value;
        const name = permEmpNameSelect?.value;
        const category = permEmpCategorySelect?.value;
        const permissionDateOrPeriod = permEmpDateInput?.value.trim();
        const reason = permEmpReasonTextarea?.value.trim();
        if (!requestDate || !name || !category || !permissionDateOrPeriod || !reason) {
            alert("Veuillez remplir tous les champs pour la demande (y compris la catégorie).");
            return;
        }
        const newPermission = {
            requestDate,
            name,
            category,
            permissionDateOrPeriod,
            reason,
            status: 'En attente',
            recordedBy: currentUser?.username || 'N/A'
        };
        let tempLocalData = [...employeePermissionsData];
        tempLocalData.push(newPermission);
        saveDataToFirebase('employeePermissionsData', tempLocalData)
            .then(() => {
                alert(`Demande de permission (${category}) ajoutée pour ${name}.`);
                permissionEmployeeForm.reset();
                setTodaysDate();
                updateConnectedUserFields();
                employeesSection?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            })
            .catch(error => { /* Error handled */ });
    });
    if (permissionLearnerForm) permissionLearnerForm.addEventListener('submit', function (event) { //
        event.preventDefault();
         if (!currentUser || !(currentUser.status === 'Administrateur' || currentUser.status === 'Editeur')) { // Added 'Editeur' for permission to add but not edit/delete
            alert("Accès Refusé: Permissions insuffisantes."); return;
        }
        const requestDate = permLrnReqDateInput?.value;
        const name = permLrnNameSelect?.value;
        const category = permLrnCategorySelect?.value;
        const permissionDateOrPeriod = permLrnDateInput?.value.trim();
        const reason = permLrnReasonTextarea?.value.trim();
        if (!requestDate || !name || !category || !permissionDateOrPeriod || !reason) {
            alert("Veuillez remplir tous les champs pour la demande (y compris la catégorie).");
            return;
        }
        const newPermission = {
            requestDate,
            name,
            category,
            permissionDateOrPeriod,
            reason,
            status: 'En attente',
            recordedBy: currentUser?.username || 'N/A'
        };
        let tempLocalData = [...learnerPermissionsData];
        tempLocalData.push(newPermission);
        saveDataToFirebase('learnerPermissionsData', tempLocalData)
            .then(() => {
                alert(`Demande de permission (${category}) ajoutée pour ${name}.`);
                permissionLearnerForm.reset();
                setTodaysDate();
                updateConnectedUserFields();
                learnersSection?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            })
            .catch(error => { /* Error handled */ });
    });

    if (adminForm) adminForm.addEventListener('submit', function (event) { //
        event.preventDefault();
        if (!currentUser || currentUser.status !== 'Administrateur') {
            alert("Accès Refusé: Seuls les administrateurs peuvent gérer les utilisateurs."); return;
        }
        const editKey = adminEditKeyInput?.value || ''; const isEditing = !!editKey; const username = adminUsernameInput?.value.trim(); const post = adminPostInput?.value.trim(); const password = adminPasswordInput?.value; const status = adminStatusSelect?.value; const operatedBy = currentUser?.username || 'N/A'; if (!username) { alert("Le nom d'utilisateur est requis."); adminUsernameInput?.focus(); return; } if (!status) { alert("Le statut est requis."); adminStatusSelect?.focus(); return; } let passwordToSave = undefined; let existingPassword = null; const editingUserIndex = isEditing ? adminData.findIndex(u => u.username === editKey) : -1; if (isEditing && editingUserIndex > -1) { existingPassword = adminData[editingUserIndex].password; } if (password) { passwordToSave = password; console.warn(`SECURITY RISK: Saving/Updating password directly for user '${username}'. Use Firebase Auth.`); } else if (isEditing) { passwordToSave = existingPassword; } else if (!isEditing && !password) { alert("Le mot de passe est requis pour un nouvel utilisateur."); adminPasswordInput?.focus(); return; } const userData = { username, post: post || '', status, ...(passwordToSave !== undefined && { password: passwordToSave }), lastModifiedBy: operatedBy, lastModifiedDate: new Date().toISOString() }; const potentialDuplicateIndex = adminData.findIndex(u => u.username === username); let originalDataBackup = null; if (isEditing && editingUserIndex > -1) { originalDataBackup = JSON.parse(JSON.stringify(adminData[editingUserIndex])); } let tempLocalData = [...adminData]; let actionAlert = ''; if (isEditing && editKey === username) { if (editingUserIndex > -1) { userData.recordedBy = originalDataBackup.recordedBy; tempLocalData[editingUserIndex] = { ...originalDataBackup, ...userData }; actionAlert = `Utilisateur '${username}' mis à jour.`; } else { alert(`Erreur : Utilisateur à modifier ('${editKey}') non trouvé.`); return; } } else if (isEditing && editKey !== username) { if (potentialDuplicateIndex > -1) { alert(`Erreur : Le nouveau nom d'utilisateur '${username}' existe déjà.`); adminUsernameInput.value = editKey; adminUsernameInput.focus(); return; } if (editingUserIndex > -1) { userData.recordedBy = originalDataBackup.recordedBy; tempLocalData.splice(editingUserIndex, 1); tempLocalData.push(userData); actionAlert = `Utilisateur renommé de '${editKey}' en '${username}' et mis à jour.`; } else { alert(`Erreur : Utilisateur à modifier ('${editKey}') non trouvé.`); return; } } else { if (potentialDuplicateIndex > -1) { alert(`Erreur : Le nom d'utilisateur '${username}' existe déjà.`); adminUsernameInput.focus(); return; } userData.recordedBy = operatedBy; tempLocalData.push(userData); actionAlert = `Utilisateur '${username}' ajouté.`; }
        saveDataToFirebase('adminData', tempLocalData)
            .then(() => {
                alert(actionAlert);
                adminForm.reset();
                updateConnectedUserFields();
                setTodaysDate();
                if (adminEditKeyInput) adminEditKeyInput.value = '';
                adminPasswordInput.placeholder = "Entrer pour définir/modifier";
                adminForm.querySelector('button[type="submit"]').textContent = 'Ajouter / Mettre à Jour Utilisateur';
                adminSection?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            })
            .catch(error => { /* Error handled */ });
    });
    if (equipmentForm) equipmentForm.addEventListener('submit', function (event) { //
        event.preventDefault();
         if (!currentUser || !(currentUser.status === 'Administrateur' || currentUser.status === 'Editeur')) {
            alert("Accès Refusé: Permissions insuffisantes."); return;
        }
        const editIndex = equipmentEditIndexInput ? parseInt(equipmentEditIndexInput.value, 10) : -1;
        const isEditing = editIndex > -1;
        if (isEditing && currentUser.status !== 'Administrateur') { // Only Admin can edit
             alert("Accès Refusé: Seuls les administrateurs peuvent modifier."); return;
         }
        const name = equipmentNameInput?.value.trim(); const quantity = parseInt(equipmentQuantityInput?.value); const assignedDate = equipmentAssignedDateInput?.value; const accessories = equipmentAccessoriesInput?.value.trim(); const employeeName = equipmentEmployeeNameSelect?.value; const otherInfo = equipmentOtherInfoTextarea?.value.trim(); if (!name || !quantity || quantity < 1 || !assignedDate || !employeeName) { alert("Veuillez remplir correctement tous les champs requis (Nom Appareil, Nombre > 0, Date Attribution, Employé)."); return; } const equipmentItemData = { name, quantity, assignedDate, accessories: accessories || '', employeeName, otherInfo: otherInfo || '' }; let originalDataBackup = null; let tempLocalData = [...equipmentData]; if (isEditing) { if (editIndex >= tempLocalData.length) { alert("Erreur: Index appareil invalide."); return; } originalDataBackup = JSON.parse(JSON.stringify(tempLocalData[editIndex])); equipmentItemData.recordedBy = originalDataBackup.recordedBy; equipmentItemData.lastModifiedBy = currentUser?.username || 'N/A'; equipmentItemData.lastModifiedDate = new Date().toISOString(); tempLocalData[editIndex] = equipmentItemData; } else { equipmentItemData.recordedBy = currentUser?.username || 'N/A'; tempLocalData.push(equipmentItemData); }
        saveDataToFirebase('equipmentData', tempLocalData)
            .then(() => {
                const action = isEditing ? 'mis à jour' : 'ajouté';
                alert(`Appareil/outil confié ${action}.`);
                equipmentForm.reset();
                setTodaysDate();
                updateConnectedUserFields();
                populateEmployeeSelect(equipmentEmployeeNameSelect);
                if (equipmentEditIndexInput) equipmentEditIndexInput.value = '';
                equipmentForm.querySelector('button[type="submit"]').textContent = 'Ajouter Appareil Confié';
                equipmentSection?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            })
            .catch(error => { /* Error handled */ });
    });

    if (pieceEnLigneForm) pieceEnLigneForm.addEventListener('submit', function (event) { //
        event.preventDefault();
        // MODIFIED: Editor can submit this form
        if (!currentUser || !(currentUser.status === 'Administrateur' || currentUser.status === 'Editeur')) {
            alert("Accès Refusé: Permissions insuffisantes."); return;
        }
        const editIndex = pieceEnLigneEditIndexInput ? parseInt(pieceEnLigneEditIndexInput.value, 10) : -1;
        const isEditing = editIndex > -1;
        // MODIFIED: Editor can edit this section
        if (isEditing && !(currentUser.status === 'Administrateur' || currentUser.status === 'Editeur')) {
            alert("Accès Refusé: Seuls les administrateurs ou éditeurs peuvent modifier."); return;
        }

        if (!pieceEnLigneDateInput || !pieceEnLigneDesignationSelect || !pieceEnLigneUnitPriceInput || !pieceEnLigneQuantityInput || !pieceEnLigneTotalAmountInput) {
            alert("Erreur interne: Champs Pièce en Ligne manquants."); return;
        }
        const date = pieceEnLigneDateInput.value;
        const designation = pieceEnLigneDesignationSelect.value;
        const unitPrice = parseFloat(pieceEnLigneUnitPriceInput.value);
        const quantity = parseInt(pieceEnLigneQuantityInput.value);
        const totalAmount = parseFloat(pieceEnLigneTotalAmountInput.value);

        if (!date || !designation || isNaN(unitPrice) || unitPrice < 0 || isNaN(quantity) || quantity < 1 || isNaN(totalAmount)) {
            alert("Veuillez remplir correctement tous les champs de Pièce en Ligne."); return;
        }

        const newData = { date, designation, unitPrice, quantity, totalAmount };
        let tempLocalData = [...pieceEnLigneData];

        if (isEditing) {
            if (editIndex >= pieceEnLigneData.length) { alert("Erreur : index de modification invalide."); return; }
            const originalDataBackup = JSON.parse(JSON.stringify(pieceEnLigneData[editIndex]));
            newData.recordedBy = originalDataBackup.recordedBy;
            newData.lastModifiedBy = currentUser?.username || 'N/A';
            newData.lastModifiedDate = new Date().toISOString();
            tempLocalData[editIndex] = newData;
        } else {
            newData.recordedBy = currentUser?.username || 'N/A';
            tempLocalData.push(newData);
        }

        saveDataToFirebase('pieceEnLigneData', tempLocalData)
            .then(() => {
                const action = isEditing ? 'mise à jour' : 'ajoutée';
                alert(`Pièce en Ligne ${action}.`);
                pieceEnLigneForm.reset();
                setTodaysDate();
                updateConnectedUserFields();
                if (pieceEnLigneEditIndexInput) pieceEnLigneEditIndexInput.value = '';
                pieceEnLigneForm.querySelector('button[type="submit"]').textContent = 'Ajouter Pièce en Ligne';
                pieceEnLigneSection?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            })
            .catch(error => { /* Error handled by saveDataToFirebase */ });
    });

    if (wifiZoneForm) wifiZoneForm.addEventListener('submit', function (event) { //
        event.preventDefault();
        if (!currentUser || !(currentUser.status === 'Administrateur' || currentUser.status === 'Réseau')) { // Admin or Réseau can manage
            alert("Accès Refusé: Permissions insuffisantes."); return;
        }
        const editIndex = wifiZoneEditIndexInput ? parseInt(wifiZoneEditIndexInput.value, 10) : -1;
        const isEditing = editIndex > -1;
        if (isEditing && !(currentUser.status === 'Administrateur' || currentUser.status === 'Réseau')) { // Only Admin or Réseau can edit
            alert("Accès Refusé: Seuls les administrateurs ou Réseau peuvent modifier."); return;
        }

        if (!wifiZoneDateInput || !wifiZoneDesignationSelect || !wifiZoneUnitPriceInput || !wifiZoneQuantityInput || !wifiZoneTotalAmountInput) {
            alert("Erreur interne: Champs WIFI ZONE manquants."); return;
        }
        const date = wifiZoneDateInput.value;
        const designation = wifiZoneDesignationSelect.value;
        const unitPrice = parseFloat(wifiZoneUnitPriceInput.value);
        const quantity = parseInt(wifiZoneQuantityInput.value);
        const totalAmount = parseFloat(wifiZoneTotalAmountInput.value);

        if (!date || !designation || isNaN(unitPrice) || unitPrice < 0 || isNaN(quantity) || quantity < 1 || isNaN(totalAmount)) {
            alert("Veuillez remplir correctement tous les champs WIFI ZONE."); return;
        }

        const newData = { date, designation, unitPrice, quantity, totalAmount };
        let tempLocalData = [...wifiZoneData];

        if (isEditing) {
            if (editIndex >= wifiZoneData.length) { alert("Erreur : index de modification invalide."); return; }
            const originalDataBackup = JSON.parse(JSON.stringify(wifiZoneData[editIndex]));
            newData.recordedBy = originalDataBackup.recordedBy;
            newData.lastModifiedBy = currentUser?.username || 'N/A';
            newData.lastModifiedDate = new Date().toISOString();
            tempLocalData[editIndex] = newData;
        } else {
            newData.recordedBy = currentUser?.username || 'N/A';
            tempLocalData.push(newData);
        }

        saveDataToFirebase('wifiZoneData', tempLocalData)
            .then(() => {
                const action = isEditing ? 'mise à jour' : 'ajoutée';
                alert(`Entrée WIFI ZONE ${action}.`);
                wifiZoneForm.reset();
                setTodaysDate();
                updateConnectedUserFields();
                if (wifiZoneEditIndexInput) wifiZoneEditIndexInput.value = '';
                wifiZoneForm.querySelector('button[type="submit"]').textContent = 'Ajouter Entrée WIFI';
                wifiZoneSection?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            })
            .catch(error => { /* Error handled by saveDataToFirebase */ });
    });


    // --- Event Listeners for Show/Hide Details ---
    const addToggleListener = (button, container) => { if(button && container) { if (!button._hasToggleListener) { button.addEventListener('click', () => toggleVisibility(container)); button._hasToggleListener = true; } } };
    addToggleListener(showSupplyListButton, supplyListContainer); addToggleListener(showStockDetailsButton, stockDetailsContainer); addToggleListener(showEmployeesDetailsButton, employeesDetailsContainer); addToggleListener(showLearnersDetailsButton, learnersDetailsContainer); addToggleListener(showMobileMoneyDetailsButton, mobileMoneyDetailsContainer); addToggleListener(showMmFournisseursDetailsButton, mmFournisseursDetailsContainer); addToggleListener(showClientProfilesButton, clientProfilesContainer); addToggleListener(showCreditorsDetailsButton, creditorsDetailsContainer); addToggleListener(showDebtDetailsButton, debtDetailsContainer); addToggleListener(showReportDetailsButton, reportDetailsContainer); addToggleListener(showEmployeePermissionsButton, employeePermissionsContainer); addToggleListener(showLearnerPermissionsButton, learnerPermissionsContainer); addToggleListener(showAdminUsersButton, adminUsersContainer); addToggleListener(showEquipmentDetailsButton, equipmentDetailsContainer);
    addToggleListener(showPieceEnLigneDetailsButton, pieceEnLigneDetailsContainer);
    addToggleListener(showWifiZoneDetailsButton, wifiZoneDetailsContainer);
    // NEW: Invoice History
    addToggleListener(document.getElementById('show-invoice-history-list-button'), invoiceHistoryDetailsContainer); // Assuming a separate button for invoice history list itself
    document.addEventListener('DOMContentLoaded', () => { // Initial setup for invoice history button
        const showInvoiceHistorySectionButton = document.getElementById('show-invoice-history-section');
        if (showInvoiceHistorySectionButton && invoiceHistorySection) {
            showInvoiceHistorySectionButton.addEventListener('click', () => {
                setSectionVisibility(invoiceHistorySection, allMainSections.filter(s => s !== invoiceHistorySection));
                updateInvoiceHistoryTable(); // Make sure the table is updated when the section is shown
            });
        }
    });


    const addSalesToggleListener = (button, container) => { if(button && container) { if (!button._hasSalesToggleListener) { button.addEventListener('click', () => toggleSalesSubSectionVisibility(container)); button._hasSalesToggleListener = true; } } };
    addSalesToggleListener(showSalesDetailsButton, salesDetailsContainer); addSalesToggleListener(showMaterielElectriqueDetailsButton, materielElectriqueDetailsContainer); addSalesToggleListener(showExpensesDetailsButton, expensesDetailsContainer); addSalesToggleListener(showOthersDetailsButton, othersDetailsContainer);

    // --- Event Listeners for Main Section Visibility ---
    const allMainSections = [supplySection, salesSection, employeesSection, learnersSection, mobileMoneySection, creditorsSection, debtSection, reportSection, invoiceGeneratorSection, invoiceHistorySection, adminSection, equipmentSection, pieceEnLigneSection, wifiZoneSection].filter(Boolean); // MODIFIED
    const addSectionToggleListener = (button, sectionToShow) => { if (button) { if (!button._hasSectionToggleListener) { button.addEventListener('click', () => { if (button.style.display === 'none') { console.warn(`Tentative d'accès à une section non autorisée (${sectionToShow?.id}) via un bouton caché.`); return; } setSectionVisibility(sectionToShow, allMainSections.filter(s => s !== sectionToShow)); }); button._hasSectionToggleListener = true; } } };
    addSectionToggleListener(showSupplySectionButton, supplySection); addSectionToggleListener(showSalesSectionButton, salesSection); addSectionToggleListener(showEmployeesSectionButton, employeesSection); addSectionToggleListener(showLearnersSectionButton, learnersSection); addSectionToggleListener(showMobileMoneySectionButton, mobileMoneySection); addSectionToggleListener(showCreditorsSectionButton, creditorsSection); addSectionToggleListener(showDebtSectionButton, debtSection); addSectionToggleListener(showAdminSectionButton, adminSection); addSectionToggleListener(showReportSectionButton, reportSection); addSectionToggleListener(generateInvoiceButton, invoiceGeneratorSection); addSectionToggleListener(showEquipmentSectionButton, equipmentSection);
    addSectionToggleListener(showPieceEnLigneSectionButton, pieceEnLigneSection);
    addSectionToggleListener(showWifiZoneSectionButton, wifiZoneSection);
    addSectionToggleListener(showInvoiceHistorySectionButton, invoiceHistorySection); // NEW

    // --- Event Listeners for Auto Calculations ---
    const addCalculationListener = (input, func) => { if (input && !input._hasCalcListener) { input.addEventListener('input', func); input._hasCalcListener = true; } };
    addCalculationListener(supplyQuantityInput, () => calculateTotalAmount(supplyQuantityInput, supplyUnitPriceInput, supplyTotalAmountInput)); addCalculationListener(supplyUnitPriceInput, () => calculateTotalAmount(supplyQuantityInput, supplyUnitPriceInput, supplyTotalAmountInput)); addCalculationListener(saleQuantityInput, () => calculateTotalAmount(saleQuantityInput, saleUnitPriceInput, saleTotalAmountInput)); addCalculationListener(saleUnitPriceInput, () => calculateTotalAmount(saleQuantityInput, saleUnitPriceInput, saleTotalAmountInput)); addCalculationListener(meQuantityInput, () => calculateTotalAmount(meQuantityInput, meUnitPriceInput, meTotalAmountInput)); addCalculationListener(meUnitPriceInput, () => calculateTotalAmount(meQuantityInput, meUnitPriceInput, meTotalAmountInput));
    // MODIFIED: Re-add for initial calculation if "Autre" selected
    addCalculationListener(creditorQuantityInput, () => {
        if (creditorDesignationSelect.value === 'Autre') {
            calculateCreditorTotalAmount();
        }
    });
    addCalculationListener(creditorUnitPriceInput, () => {
        if (creditorDesignationSelect.value === 'Autre') {
            calculateCreditorTotalAmount();
        }
    });

    addCalculationListener(pieceEnLigneQuantityInput, () => calculateTotalAmount(pieceEnLigneQuantityInput, pieceEnLigneUnitPriceInput, pieceEnLigneTotalAmountInput));
    addCalculationListener(pieceEnLigneUnitPriceInput, () => calculateTotalAmount(pieceEnLigneQuantityInput, pieceEnLigneUnitPriceInput, pieceEnLigneTotalAmountInput));
    addCalculationListener(wifiZoneQuantityInput, () => calculateTotalAmount(wifiZoneQuantityInput, wifiZoneUnitPriceInput, wifiZoneTotalAmountInput));
    addCalculationListener(wifiZoneUnitPriceInput, () => calculateTotalAmount(wifiZoneQuantityInput, wifiZoneUnitPriceInput, wifiZoneTotalAmountInput));

    if(operationTypeSelect && !operationTypeSelect._hasChangeListener) { operationTypeSelect.addEventListener('change', handleOperationTypeChange); operationTypeSelect._hasChangeListener = true; }
    
    // MODIFIED: Creditor Name Select Listener
    if(creditorNameSelect && !creditorNameSelect._hasChangeListener) {
        creditorNameSelect.addEventListener('change', function() {
            updateCreditorFormForClient();
        });
        creditorNameSelect._hasChangeListener = true;
    }
    // MODIFIED: Creditor Quantity/UnitPrice/TotalAmountDue listener for new transaction calculation
    if (creditorQuantityInput && !creditorQuantityInput._hasCalcListener) {
        creditorQuantityInput.addEventListener('input', () => {
            if (creditorDesignationSelect.value === 'Autre') {
                calculateCreditorTotalAmount();
            }
        });
        creditorQuantityInput._hasCalcListener = true;
    }
    if (creditorUnitPriceInput && !creditorUnitPriceInput._hasCalcListener) {
        creditorUnitPriceInput.addEventListener('input', () => {
            if (creditorDesignationSelect.value === 'Autre') {
                calculateCreditorTotalAmount();
            }
        });
        creditorUnitPriceInput._hasCalcListener = true;
    }
    if (creditorTotalAmountDueInput && !creditorTotalAmountDueInput._hasCalcListener) {
        creditorTotalAmountDueInput.addEventListener('input', () => {
            // If user manually enters Total Due, don't auto-calculate from Qty/Price
            if (creditorTotalAmountDueInput.value) {
                creditorQuantityInput.readOnly = true;
                creditorUnitPriceInput.readOnly = true;
            } else {
                creditorQuantityInput.readOnly = false;
                creditorUnitPriceInput.readOnly = false;
            }
        });
        creditorTotalAmountDueInput._hasCalcListener = true;
    }


    // --- Multi-Item Invoice Calculation & Item Management ---
    function calculateInvoiceTotal() { if (!invoiceItemsContainer || !invoiceGenTotalAmountInput || !invoiceGenTotalWordsInput) return; let grandTotal = 0; const itemRows = invoiceItemsContainer.querySelectorAll('.invoice-item-row'); itemRows.forEach(row => { const quantityInput = row.querySelector('.item-quantity'); const unitPriceInput = row.querySelector('.item-unit-price'); const quantity = parseFloat(quantityInput?.value) || 0; const unitPrice = parseFloat(unitPriceInput?.value) || 0; grandTotal += quantity * unitPrice; }); invoiceGenTotalAmountInput.value = formatAmount(grandTotal); invoiceGenTotalWordsInput.value = numberToWordsFrench(grandTotal); }
    function addInvoiceItemRow(designation = '', quantity = '', unitPrice = '') { // MODIFIED: Add parameters for pre-filling
        if (!currentUser || !(currentUser.status === 'Administrateur' || currentUser.status === 'Editeur')) return;
        if (!invoiceItemsContainer) return;
        const newRow = document.createElement('div');
        newRow.classList.add('form-row', 'invoice-item-row');
        const currentIndex = invoiceItemIndex++; // Ensure unique ID even when editing
        newRow.innerHTML = `
            <div style="flex-basis: 40%;">
                <label for="invoice-gen-designation-${currentIndex}">Désignation:</label>
                <input type="text" id="invoice-gen-designation-${currentIndex}" class="item-designation" value="${designation}" required>
            </div>
            <div>
                <label for="invoice-gen-quantity-${currentIndex}">Quantité:</label>
                <input type="number" id="invoice-gen-quantity-${currentIndex}" class="item-quantity" min="0" step="any" value="${quantity}" required>
            </div>
            <div>
                <label for="invoice-gen-unit-price-${currentIndex}">Prix Unitaire:</label>
                <input type="number" id="invoice-gen-unit-price-${currentIndex}" class="item-unit-price" min="0" step="any" value="${unitPrice}" required>
            </div>
            <div style="display: flex; align-items: flex-end;">
                <button type="button" class="action-btn delete-btn remove-invoice-item-btn" title="Supprimer Ligne" style="margin-bottom: 2px;">❌</button>
            </div>`;
        invoiceItemsContainer.appendChild(newRow);
        const addedInputs = newRow.querySelectorAll('.item-quantity, .item-unit-price');
        addedInputs.forEach(input => input.addEventListener('input', calculateInvoiceTotal));
        calculateInvoiceTotal();
        newRow.querySelector('.item-designation')?.focus();
        const removeBtn = newRow.querySelector('.remove-invoice-item-btn');
        if (removeBtn && currentUser && (currentUser.status === 'Administrateur' || currentUser.status === 'Editeur')) {
            removeBtn.disabled = false;
        } else if (removeBtn) {
            removeBtn.disabled = true;
        }
    }
    if (addInvoiceItemButton && !addInvoiceItemButton._hasClickListener) { addInvoiceItemButton.addEventListener('click', () => addInvoiceItemRow()); addInvoiceItemButton._hasClickListener = true; } // MODIFIED to call with no args for new empty row
    if (invoiceItemsContainer && !invoiceItemsContainer._hasClickListener) { invoiceItemsContainer.addEventListener('click', function(event) { if (event.target.classList.contains('remove-invoice-item-btn')) { if (!currentUser || !(currentUser.status === 'Administrateur' || currentUser.status === 'Editeur')) return; const rowToRemove = event.target.closest('.invoice-item-row'); if (invoiceItemsContainer.querySelectorAll('.invoice-item-row').length <= 1) { alert("Vous devez avoir au moins une ligne d'article."); return; } if (rowToRemove) { rowToRemove.remove(); calculateInvoiceTotal(); } } }); invoiceItemsContainer.addEventListener('input', function(event) { if (event.target.classList.contains('item-quantity') || event.target.classList.contains('item-unit-price')) { calculateInvoiceTotal(); } }); invoiceItemsContainer._hasClickListener = true; }
    function initializeInvoiceForm() {
        if (invoiceItemsContainer) {
            invoiceItemsContainer.innerHTML = '';
            addInvoiceItemRow(); // Add an empty row for a new invoice
        } else {
            console.error("Invoice items container not found.");
            return;
        }
        if(invoiceGenDateInput) { // Always set date, even if it has a value, to ensure consistency
            invoiceGenDateInput.value = new Date().toISOString().split('T')[0];
        }
        if(invoiceGenNumberInput) {
            invoiceGenNumberInput.value = generateInvoiceNumber();
            invoiceGenNumberInput.readOnly = true; // NEW: Make invoice number read-only
        }
        if (invoiceGenClientNameInput) invoiceGenClientNameInput.value = '';
        if (invoiceGenClientContactInput) invoiceGenClientContactInput.value = '';

        if (invoiceEditIdInput) invoiceEditIdInput.value = ''; // NEW: Clear edit ID
        calculateInvoiceTotal();
        if (saveUpdateInvoiceButton) saveUpdateInvoiceButton.textContent = 'Enregistrer Facture'; // NEW: Default button text
    }

    // NEW: Save/Update Invoice to Firebase
    async function saveInvoiceToFirebase(options = { print: false, exportPdf: false }) {
        if (!currentUser || !(currentUser.status === 'Administrateur' || currentUser.status === 'Editeur')) {
            alert("Accès Refusé: Permissions insuffisantes."); return;
        }

        let isValid = true;
        invoiceGeneratorForm?.querySelectorAll('.invalid-field').forEach(el => el.classList.remove('invalid-field'));

        if (!invoiceGenDateInput?.value) { isValid = false; invoiceGenDateInput?.classList.add('invalid-field'); }
        if (!invoiceGenClientNameInput?.value.trim()) { isValid = false; invoiceGenClientNameInput?.classList.add('invalid-field'); }
        if (!invoiceGenNumberInput?.value) { isValid = false; invoiceGenNumberInput?.classList.add('invalid-field'); }

        const items = [];
        const itemRows = invoiceItemsContainer?.querySelectorAll('.invoice-item-row');
        if (!itemRows || itemRows.length === 0) { alert("Ajoutez au moins une ligne d'article à la facture."); return; }

        itemRows.forEach((row) => {
            const designationInput = row.querySelector('.item-designation');
            const quantityInput = row.querySelector('.item-quantity');
            const unitPriceInput = row.querySelector('.item-unit-price');

            const designation = designationInput?.value.trim();
            const quantity = parseFloat(quantityInput?.value);
            const unitPrice = parseFloat(unitPriceInput?.value);

            let rowIsValid = true;
            if (!designation) { isValid = false; rowIsValid = false; designationInput?.classList.add('invalid-field'); }
            if (isNaN(quantity) || quantity < 0) { isValid = false; rowIsValid = false; quantityInput?.classList.add('invalid-field'); }
            if (isNaN(unitPrice) || unitPrice < 0) { isValid = false; rowIsValid = false; unitPriceInput?.classList.add('invalid-field'); }

            if (rowIsValid) {
                items.push({ designation, quantity, unitPrice, total: quantity * unitPrice });
            }
        });

        if (!isValid) {
            alert("Veuillez vérifier et corriger les champs marqués en rouge.");
            const firstInvalid = invoiceGeneratorForm?.querySelector('.invalid-field');
            firstInvalid?.scrollIntoView({ behavior: 'smooth', block: 'center' });
            firstInvalid?.focus();
            return;
        }

        calculateInvoiceTotal();
        const finalTotalAmount = parseFloat(invoiceGenTotalAmountInput.value);

        const isEditing = !!invoiceEditIdInput.value;
        const invoiceId = isEditing ? invoiceEditIdInput.value : generatedInvoicesRef.push().key; // Get a new ID if not editing
        const invoiceNumber = invoiceGenNumberInput.value;

        const newInvoiceData = {
            id: invoiceId, // Store the ID within the object
            date: invoiceGenDateInput.value,
            number: invoiceNumber,
            clientName: invoiceGenClientNameInput.value.trim(),
            clientContact: invoiceGenClientContactInput?.value.trim() || '',
            items: items,
            totalAmount: finalTotalAmount,
            totalWords: numberToWordsFrench(finalTotalAmount),
            generatedBy: currentUser?.username || 'N/A', // Assuming creator if new
            generatedDate: new Date().toISOString()
        };

        if (isEditing) {
            // Keep original generatedBy/Date if editing
            const originalInvoice = generatedInvoicesData.find(inv => inv.id === invoiceId);
            if (originalInvoice) {
                newInvoiceData.generatedBy = originalInvoice.generatedBy;
                newInvoiceData.generatedDate = originalInvoice.generatedDate;
            }
            newInvoiceData.lastModifiedBy = currentUser?.username || 'N/A';
            newInvoiceData.lastModifiedDate = new Date().toISOString();
        }

        try {
            await generatedInvoicesRef.child(invoiceId).set(newInvoiceData);
            alert(`Facture ${invoiceNumber} ${isEditing ? 'mise à jour' : 'enregistrée'} avec succès.`);

            if (!isEditing && (options.print || options.exportPdf)) {
                await incrementAndSaveInvoiceCounter(); // Only increment counter for new invoices that are printed/exported
            }

            // Perform print/export actions after successful save
            if (options.print) {
                const invoiceHTML = generateInvoiceHTML(newInvoiceData);
                const invoiceArea = document.getElementById('invoice-print-area');
                if (invoiceArea) {
                    invoiceArea.innerHTML = invoiceHTML;
                    printElement('invoice-print-area');
                } else {
                    alert("Erreur critique: Zone impression facture introuvable.");
                }
            }
            if (options.exportPdf) {
                await exportInvoiceToPdf(newInvoiceData); // Use the saved invoice data for PDF
            }

            // Reset form after successful operation if it was a new invoice or if we are navigating away
            if (!isEditing || (isEditing && (options.print || options.exportPdf))) { // If it was a new invoice OR an edited one that was printed/exported (implies finalization)
                invoiceGeneratorForm.reset();
                initializeInvoiceForm();
                updateConnectedUserFields();
            } else if (isEditing) { // If it was an edited invoice, but not printed/exported, just reset edit state but keep current invoice form filled
                if (invoiceEditIdInput) invoiceEditIdInput.value = '';
                if (saveUpdateInvoiceButton) saveUpdateInvoiceButton.textContent = 'Enregistrer Facture';
                invoiceGenNumberInput.readOnly = false; // Allow new number generation
                // The current form data is still valid, so no full reset
            }

        } catch (error) {
            console.error("Erreur lors de l'enregistrement/mise à jour de la facture:", error);
            alert(`Erreur lors de l'enregistrement/mise à jour de la facture: ${error.message}`);
        }
    }


    // --- MODIFIED: previewPrintInvoiceButton listener triggers counter increment via saveInvoiceToFirebase ---
    if (previewPrintInvoiceButton && !previewPrintInvoiceButton._hasClickListener) { //
        previewPrintInvoiceButton.addEventListener('click', () => saveInvoiceToFirebase({ print: true, exportPdf: false }));
        previewPrintInvoiceButton._hasClickListener = true;
    }

    // --- MODIFIED: Event Listener for Invoice PDF Export Button increments counter via saveInvoiceToFirebase ---
    if (exportInvoicePdfButton && !exportInvoicePdfButton._hasClickListener) { //
        exportInvoicePdfButton.addEventListener('click', () => saveInvoiceToFirebase({ print: false, exportPdf: true }));
        exportInvoicePdfButton._hasClickListener = true;
    }

    // NEW: Save/Update Invoice button listener
    if (saveUpdateInvoiceButton && !saveUpdateInvoiceButton._hasClickListener) {
        saveUpdateInvoiceButton.addEventListener('click', () => saveInvoiceToFirebase({ print: false, exportPdf: false }));
        saveUpdateInvoiceButton._hasClickListener = true;
    }


    // NEW: Edit Invoice function
    window.editInvoice = (invoiceId) => {
        if (!currentUser || !(currentUser.status === 'Administrateur' || currentUser.status === 'Editeur')) {
            alert("Accès Refusé: Admin ou Éditeur seulement.");
            return;
        }

        const invoiceToEdit = generatedInvoicesData.find(inv => inv.id === invoiceId);
        if (!invoiceToEdit) {
            alert("Facture non trouvée pour modification.");
            return;
        }

        // Switch to invoice generator section
        setSectionVisibility(invoiceGeneratorSection, allMainSections.filter(s => s !== invoiceGeneratorSection));

        // Populate the form
        if (invoiceGenDateInput) invoiceGenDateInput.value = invoiceToEdit.date || '';
        if (invoiceGenClientNameInput) invoiceGenClientNameInput.value = invoiceToEdit.clientName || '';
        if (invoiceGenClientContactInput) invoiceGenClientContactInput.value = invoiceToEdit.clientContact || '';
        if (invoiceGenNumberInput) {
            invoiceGenNumberInput.value = invoiceToEdit.number || '';
            invoiceGenNumberInput.readOnly = true; // Keep existing invoice number read-only
        }
        if (invoiceEditIdInput) invoiceEditIdInput.value = invoiceToEdit.id; // Store ID for update

        // Clear existing items and add from invoiceToEdit
        if (invoiceItemsContainer) invoiceItemsContainer.innerHTML = '';
        invoiceToEdit.items.forEach(item => {
            addInvoiceItemRow(item.designation, item.quantity, item.unitPrice);
        });
        calculateInvoiceTotal(); // Recalculate total after populating items

        if (saveUpdateInvoiceButton) saveUpdateInvoiceButton.textContent = 'Mettre à Jour Facture';
        invoiceGeneratorSection?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    // NEW: Delete Invoice function
    window.deleteInvoice = async (invoiceId) => {
        if (!currentUser || !(currentUser.status === 'Administrateur' || currentUser.status === 'Editeur')) {
            alert("Accès Refusé: Admin ou Éditeur seulement.");
            return;
        }
        if (confirm(`Supprimer la facture N° ${invoiceId} ? Cette action est irréversible.`)) {
            try {
                await generatedInvoicesRef.child(invoiceId).remove();
                alert(`Facture N° ${invoiceId} supprimée.`);
                // No need to manually update generatedInvoicesData, Firebase listener will do it
            } catch (error) {
                console.error("Erreur suppression facture:", error);
                alert(`Erreur lors de la suppression de la facture: ${error.message}`);
            }
        }
    };


    // --- Login and Logout Logic ---
    function handleLogin(event) { //
        event.preventDefault();
        const username = loginUsernameInput.value.trim(); const password = loginPasswordInput.value;
        if (!username || !password) { loginErrorMessage.textContent = "Nom d'utilisateur et mot de passe requis."; loginErrorMessage.classList.remove('hidden'); return; }

        if (!Array.isArray(adminData)) {
             loginErrorMessage.textContent = "Données utilisateur non chargées. Réessayez.";
             loginErrorMessage.classList.remove('hidden');
             return;
        }

        const foundUser = adminData.find(user => user.username === username && user.password === password);
        if (foundUser) {
            console.log(`Connecté: ${username}, Statut: ${foundUser.status}`);
            currentUser = { username: foundUser.username, status: foundUser.status };
            if (loginContainer) loginContainer.classList.add('hidden');
            if (mainAppContainer) mainAppContainer.classList.remove('hidden');
            loginForm.reset(); loginErrorMessage.classList.add('hidden');

            invoiceCounterRef.once('value').then(snapshot => {
                localInvoiceCounter = snapshot.val() || 1;
                console.log("Compteur facture chargé:", localInvoiceCounter);
                initializeAppUI();
            }).catch(error => {
                console.error("Erreur chargement compteur facture:", error);
                localInvoiceCounter = 1;
                initializeAppUI();
            });

        } else {
            console.log("Échec connexion pour:", username);
            loginErrorMessage.textContent = "Nom d'utilisateur ou mot de passe incorrect.";
            loginErrorMessage.classList.remove('hidden');
            currentUser = null;
            if (loginButton) loginButton.disabled = false;
        }
    }

    function handleLogout() {
         if (confirm("Voulez-vous vraiment vous déconnecter ?")) {
             currentUser = null;
             localInvoiceCounter = 1;
             if (mainAppContainer) mainAppContainer.classList.add('hidden');
             if (loginContainer) loginContainer.classList.remove('hidden');
             const allSections = [supplySection, salesSection, employeesSection, learnersSection, mobileMoneySection, creditorsSection, debtSection, reportSection, invoiceGeneratorSection, invoiceHistorySection, adminSection, equipmentSection, pieceEnLigneSection, wifiZoneSection].filter(Boolean); // MODIFIED
             allSections.forEach(section => { if(section) section.classList.add('hidden'); });
             if (userInfoUsernameSpan) userInfoUsernameSpan.textContent = '';
             if (userInfoStatusSpan) userInfoStatusSpan.textContent = '';
              if(loginButton) loginButton.disabled = false;
             console.log("Utilisateur déconnecté.");
         }
    }

    // --- NEW: Payment Alert Function for Administrators ---
    function checkAndShowPaymentAlert() {
        if (!currentUser || currentUser.status !== 'Administrateur') {
            return;
        }

        const today = new Date();
        const dayOfMonth = today.getDate();

        // Check if today is between the 25th of the current month and the 1st of the next month (inclusive)
        const isPaymentPeriod = (dayOfMonth >= 25 && dayOfMonth <= 31) || (dayOfMonth === 1);

        if (isPaymentPeriod) {
            let message = "Rappel Important : Période de Paiement des Salaires !\n\n";
            let employeesWithOutstandingSalary = employeesData.filter(emp => {
                const salary = emp.salary !== null ? parseFloat(emp.salary) : 0;
                const paidAmount = emp.paidAmount || 0;
                return (salary - paidAmount) > 0.005;
            });

            if (employeesWithOutstandingSalary.length > 0) {
                message += "Veuillez vérifier les salaires des employés suivants :\n";
                employeesWithOutstandingSalary.forEach(emp => {
                    const remaining = (emp.salary !== null ? parseFloat(emp.salary) : 0) - (emp.paidAmount || 0);
                    message += `- ${emp.nom || ''} ${emp.prenom || ''} (Reste dû : ${formatAmount(remaining)} FCFA)\n`;
                });
                message += "\nAssurez-vous de traiter les paiements nécessaires.";
                alert(message);
            }
        }
    }

    // NEW: Subscription Renewal Alert Function for Administrators
    function checkAndShowSubscriptionRenewalAlert() {
        if (!currentUser || currentUser.status !== 'Administrateur') {
            return;
        }

        const today = new Date();
        const dayOfMonth = today.getDate();

        // Define the renewal period: from 25th of current month to 1st of next month
        const isRenewalPeriod = (dayOfMonth >= 25 && dayOfMonth <= 31) || (dayOfMonth === 1);

        if (isRenewalPeriod) {
            alert("Rappel Important : N'oubliez pas de renouveler l'abonnement mensuel de l'entreprise !");
        }
    }


    // --- Initialisation ---
    function attachFirebaseListener() {
        if (!firebaseListenerHandle) {
            firebaseListenerHandle = dataRef.on('value', handleFirebaseDataUpdate, (error) => {
                console.error("Erreur écoute Firebase (dataRef):", error);
                alert("Erreur de connexion à la base de données principale. Certaines fonctionnalités peuvent être indisponibles.");
                if(loginButton) loginButton.disabled = true;
                if(loginErrorMessage){
                     loginErrorMessage.textContent = "Erreur de connexion temps réel.";
                     loginErrorMessage.classList.remove('hidden');
                }
            });
            console.log("Firebase listener (dataRef) attaché.");

            invoiceCounterRef.on('value', (snapshot) => {
                const counterVal = snapshot.val();
                if (counterVal !== null && counterVal !== undefined) {
                    localInvoiceCounter = counterVal;
                    console.log("Compteur facture mis à jour (listener):", localInvoiceCounter);
                    if (invoiceGeneratorSection && !invoiceGeneratorSection.classList.contains('hidden') && invoiceGenNumberInput && !invoiceEditIdInput.value) { // Only update if not editing an existing invoice
                         invoiceGenNumberInput.value = generateInvoiceNumber();
                    }
                }
            }, (error) => {
                console.error("Erreur écoute Firebase (invoiceCounterRef):", error);
            });
             console.log("Firebase listener (invoiceCounterRef) attaché.");

            // NEW: Listener for generated invoices
            generatedInvoicesRef.on('value', (snapshot) => {
                const invoicesObj = snapshot.val() || {};
                generatedInvoicesData = Object.keys(invoicesObj).map(key => ({ id: key, ...invoicesObj[key] }));
                console.log("Factures générées chargées:", generatedInvoicesData);
                if (invoiceHistorySection && !invoiceHistorySection.classList.contains('hidden')) {
                    updateInvoiceHistoryTable(); // Update table if history section is visible
                }
            }, (error) => {
                console.error("Erreur écoute Firebase (generatedInvoicesRef):", error);
            });
             console.log("Firebase listener (generatedInvoicesRef) attaché.");

        }
    }

    attachFirebaseListener();

    if (loginForm && !loginForm._hasSubmitListener) {
         loginForm.addEventListener('submit', handleLogin);
         loginForm._hasSubmitListener = true;
         if(loginButton) loginButton.disabled = false;
    } else if (!loginForm) {
         console.error("Login form not found!");
         alert("Erreur critique : Formulaire de connexion manquant.");
    }

    if(logoutButton && !logoutButton._hasClickListener) {
         logoutButton.addEventListener('click', handleLogout);
         logoutButton._hasClickListener = true;
    }

    if (globalSearchInput && !globalSearchInput._hasInputListener) {
        globalSearchInput.addEventListener('input', filterTablesByDesignation);
        globalSearchInput._hasInputListener = true;
    }

    document.querySelectorAll('.table-search-container input[type="search"]').forEach(input => {
        if (!input._hasTableSearchListener) {
            input.addEventListener('input', () => filterSpecificTable(input));
            input._hasTableSearchListener = true;
        }
    });

    if (loginContainer) loginContainer.classList.remove('hidden');
    if (mainAppContainer) mainAppContainer.classList.add('hidden');

    const footerYearSpan = document.getElementById('footer-year');
    if (footerYearSpan) { footerYearSpan.textContent = new Date().getFullYear(); }

    const pieceEnLigneDesignations = [
        "Acte de Décès",
        "Acte de Décès de cujus",
        "Acte de Mariage",
        "Acte de Naissance",
        "Acte de Naissance avec mention marginale",
        "Acte de Naissance Reconstitué",
        "Acte de Naissance Transcrit",
        "Certificat de Résidence",
        "Certificat de Coutume et de Célibat",
        "Certificat d'Identification Personnelle",
        "Carte d'identité Nationale Biométrique",
        "Certificat Non Enregistrement Acte Naissance",
        "Certificat de non inscription de décès",
        "Certificat de Non Remariage, de Non Divorce, de...",
        "Certificat Numéro Personnel d’Identification / fID",
        "IFU Personnel",
        "IFU Entreprise",
        "Casier Judiciaire",
        "Registre de Commerce",
        "Autre"
    ];

    if (pieceEnLigneDesignationSelect) {
        const currentSelectedValue = pieceEnLigneDesignationSelect.value;
        pieceEnLigneDesignationSelect.innerHTML = '<option value="">-- Choisir --</option>';
        pieceEnLigneDesignations.forEach(designation => {
            const option = document.createElement('option');
            option.value = designation;
            option.textContent = designation;
            if (designation === currentSelectedValue) {
                option.selected = true;
            }
            pieceEnLigneDesignationSelect.appendChild(option);
        });
        if (!pieceEnLigneDesignations.includes(currentSelectedValue)) {
            pieceEnLigneDesignationSelect.selectedIndex = 0;
        }
    }


});