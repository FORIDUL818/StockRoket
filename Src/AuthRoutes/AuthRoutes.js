const express=require("express")
const  Registration=require("../Controller/Cotroller")
const authMiddlewere = require("../Middleware/authMiddlewere")
const CreateBrand  = require("../Controller/BrandController")
const  CategoryCreate  = require("../Controller/CategoryController")
const  createProducts  = require("../Controller/ProductsController")
const CreateSepplier  = require("../Controller/SepplireController")
const  CreateCustomar  = require("../Controller/CustomarSeppier")
const  CreateExpenseType  = require("../Controller/ExpenseTypeController")
const  CreateExpense  = require("../Controller/expenseController")
const createPurchase  = require("../Controller/purchaseController")
const  createSalse  = require("../Controller/SalseController")
const  createReturn  = require("../Controller/ReturnController")
const  expenseReportByDate  = require("../Controller/ExpenseReportController")
const  ExpenseSummary = require("../Controller/SummaryController")


const router=express.Router()
// user inforamtion start
router.post("/ragistration",Registration.Registration)
router.post("/login",Registration.login)
router.post("/profile-update",authMiddlewere,Registration.profileUpdate);
router.get("/user-details",authMiddlewere,Registration.profileDetails);
router.get("/user-email-recovery/:email",Registration.RecoverVaryfyEmail);
router.get("/user-otp-varify-recovery/:email/:otp",Registration.OtpVarification);
router.post("/resetPassword",Registration.passwordReset);
// user inforamtion end

// start Products section
   router.post("/create-brand", authMiddlewere, CreateBrand.CreateBrand)
   router.get("/brand-detials/:id", authMiddlewere, CreateBrand.BrandDetails)
   router.post("/brand-update/:id", authMiddlewere, CreateBrand.updateBrand)
   router.get("/brand-dropdown", authMiddlewere, CreateBrand.BrandDropdwon)
   router.get("/brand-list/:pageNumber/:perpage/:searchKeyword", authMiddlewere, CreateBrand.Brandlist)
   router.delete("/brand-delete/:id", authMiddlewere, CreateBrand.deleteBrand)
   // end Products section 
   
   // category section start
   router.post("/create-category", authMiddlewere, CategoryCreate.CategoryCreate)
   router.get("/category-detials/:id", authMiddlewere, CategoryCreate.categoryDetails)
   router.post("/category-update/:id", authMiddlewere, CategoryCreate.CategoryUpdate)
   router.get("/category-dropdown", authMiddlewere, CategoryCreate.CategoryDropdwon)
   router.get("/catagory-list/:pageNumber/:perpage/:searchKeyword", authMiddlewere, CategoryCreate.CategoryList)
   router.delete("/category-delete/:id", authMiddlewere, CategoryCreate.deleteCategory)

// category section end  

// product area start

router.get("/create-product", authMiddlewere, createProducts.createProducts);
router.get("/product-detials/:id", authMiddlewere,createProducts.ProductsDetails)
router.get("/dropdown-Products", authMiddlewere, createProducts.ProductsDropdwon)
router.post("/products-update/:id", authMiddlewere, createProducts.updateProducts)
router.get("/products-list/:pageNumber/:perpage/:searchKeyword", authMiddlewere, createProducts.Productslist)
// product area end

// supplair start
router.post("/create-sepplaire", authMiddlewere, CreateSepplier.CreateSepplier)
router.get("/sepplaire-detials/:id", authMiddlewere, CreateSepplier.SepplierDetails)
router.post("/sepplaire-update/:id", authMiddlewere, CreateSepplier.updateSepplair)
router.get("/sepplaire-dropdown", authMiddlewere, CreateSepplier.SepplierDropdwon)
router.get("/sepplaire-list/:pageNumber/:perpage/:searchKeyword", authMiddlewere, CreateSepplier.seppierList)
// supplair end

// Customar start
router.post("/create-customar", authMiddlewere, CreateCustomar.CreateCustomar)
router.get("/customar-detials/:id", authMiddlewere, CreateCustomar.CustomarDetails)
router.post("/customar-update/:id", authMiddlewere, CreateCustomar.updateCustomar)
router.get("/customar-dropdown", authMiddlewere, CreateCustomar.CustomarDropdwon)
router.get("/customar-list/:pageNumber/:perpage/:searchKeyword", authMiddlewere, CreateCustomar.CustomarList)
// Customar end

// Expanse Type start 
router.post("/create-expensetype", authMiddlewere, CreateExpenseType.CreateExpenseType)
router.get("/expensetype-detials/:id", authMiddlewere, CreateExpenseType.ExpenseTypeDetails)
router.post("/expensetype-update/:id", authMiddlewere, CreateExpenseType.updateExpenseType)
router.get("/expensetype-dropdown", authMiddlewere, CreateExpenseType.ExpenseTypeDropdwon)
router.get("/expensetype-list/:pageNumber/:perpage/:searchKeyword", authMiddlewere, CreateExpenseType.ExpenseTypelist)
router.delete("/expensetype-delete/:id", authMiddlewere, CreateExpenseType.expenseTypeDelete)
// Expanse Type end

//  expensive type start
router.post("/create-expense", authMiddlewere, CreateExpense.CreateExpense)
router.get("/expense-detials/:id", authMiddlewere, CreateExpense.ExpenseDetails)
router.post("/expense-update/:id", authMiddlewere, CreateExpense.updateExpense)
router.get("/expense-list/:pageNumber/:perpage/:searchKeyword", authMiddlewere, CreateExpense.expenselist)
router.delete("/expense-delete/:id", authMiddlewere, CreateExpense.expendseDelete)
//  expensive type end

// purchese start
router.post("/create-purthase",authMiddlewere,createPurchase.createPurchase)
router.get("/purthase-list/:pageNumber/:perpage/:searchKeyword", authMiddlewere,createPurchase.purchaselist)
router.delete("/perchase-delete/:id", authMiddlewere, createPurchase.purchaseDelete)
// purchese end
// salse start
router.post("/create-salse",authMiddlewere,createSalse.createSalse)
router.get("/salse-list/:pageNumber/:perpage/:searchKeyword", authMiddlewere,createSalse.Salselist)
router.delete("/salse-delete/:id", authMiddlewere, createSalse.SalseDelete)
// salse end
// return start
router.post("/create-return",authMiddlewere,createReturn.createReturn)
router.get("/return-list/:pageNumber/:perpage/:searchKeyword", authMiddlewere,createReturn.returnlist)
router.delete("/return-delete/:id", authMiddlewere, createReturn.returnDelete)
// return end

//expensereturnData start 

router.post("/expense-report",authMiddlewere,expenseReportByDate.expenseReportByDate)
router.post("/selse-report",authMiddlewere,expenseReportByDate.selseReportByDate)
router.post("/purses-report",authMiddlewere,expenseReportByDate.PursesReportByDate)
router.post("/return-report",authMiddlewere,expenseReportByDate.ReturnReportByDate)
//expensereturnData end

//expenseSummary start

router.get("/expense-summary",authMiddlewere,ExpenseSummary.ExpenseSummary)
router.get("/purses-summary",authMiddlewere,ExpenseSummary.pursesSummary)
router.get("/return-summary",authMiddlewere,ExpenseSummary.ReturnSummary)
//expenseSummary end
module.exports=router;