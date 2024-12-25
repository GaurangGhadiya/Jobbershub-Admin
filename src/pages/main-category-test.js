import { useEffect, useState } from "react";
import api from "../../utils/api";
import ParentCategoryTable from "../components/Product/main_category"; 
import SubCategoryTable from "../components/Product/sub_category"; 
import ChildCategoryTable from "../components/Product/child_category"; 
import ProductTable from "../components/leads/leads_report"; 
import { Container, Typography, Button, CircularProgress } from "@mui/material";

const CategoriesPage = () => {
  const [parentCategories, setParentCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [childCategories, setChildCategories] = useState([]);
  const [products, setProducts] = useState([]); 
  const [activeCategory, setActiveCategory] = useState('products'); 
  const [loading, setLoading] = useState(false); 

  const fetchCategories = async () => {
    try {
      const response = await api.post("/api/leads/get-lead-category-list");
      if (response.data.status === 200) {
        setParentCategories(response.data.data.parentCategory);
        setSubCategories(response.data.data.subCategory);
        setChildCategories(response.data.data.childCategory);
      } else {
        console.error(response.data.message);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

 
  const fetchProducts = async () => {
    setLoading(true); 
    try {
      const response = await api.post('/api/leads/get-leads-report');
      if (response.data.status === 200) {
        setProducts(response.data.data);
        console.log("Fetched Products:", response.data.data); 
      } else {
        console.error(response.data.message);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false); 
    }
  };

  useEffect(() => {
    fetchProducts(); 
    fetchCategories();
   
  }, []);


  return (
    <Container sx={{marginTop:"30px"}}>
      
      <div sx={{marginBottom:"30px"}}>
      <Button
        variant="contained"
        onClick={() => setActiveCategory('parent')}
        style={{ marginRight: "10px" }}
      >
        Show Parent Categories
      </Button>
      <Button
        variant="contained"
        onClick={() => setActiveCategory('sub')}
        style={{ marginRight: "10px" }}
      >
        Show Sub Categories
      </Button>
      <Button
        variant="contained"
        onClick={() => setActiveCategory('child')}
        style={{ marginRight: "10px" }}
      >
        Show Child Categories
      </Button>
      <Button
        variant="contained"
        onClick={() => {
          setActiveCategory('products');
          fetchProducts();
         
        }}
      >
        Show Products
      </Button>
      </div>

      {loading && <CircularProgress />} 
      
      {activeCategory === 'child' ? (
        <ChildCategoryTable categories={childCategories} />
      ) : activeCategory === 'sub' ? (
        <SubCategoryTable categories={subCategories} />
      ) : activeCategory === 'products' ? (
        <ProductTable showServiceTrans={products} /> 
      ) : (
        <ParentCategoryTable categories={parentCategories} />
      )}

    </Container>
  );
};

export default CategoriesPage;
