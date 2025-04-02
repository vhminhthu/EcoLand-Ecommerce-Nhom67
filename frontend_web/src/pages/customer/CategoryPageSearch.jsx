import MainLayout from "../../layouts/customer/MainLayout";
import { useState } from "react";
import { FaBars } from "react-icons/fa";
import ProductCard from "../../components/customer/common/cards/ProductCard";
import axios from "axios";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {ListLocations} from "../../data/ListLocations";
import { GrInfo } from "react-icons/gr";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import ShopCard from "../../components/customer/common/cards/ShopCard";

const ratings = [5, 4, 3, 2, 1];

function CategoryPageSearch() {
  const [loading, setLoading] = useState(true);

  const [expanded, setExpanded] = useState(false);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [shops, setShops] = useState([]);

  const [tongPages, setTongPages] = useState(1);

  const location = useLocation();
  const { id } = location.state || {};
  const navigate = useNavigate();

  const query = new URLSearchParams(window.location.search); 
  const search = query.get('search');
  const page = parseInt(query.get('trang')) || 1;
  const sort = query.get('sort') || 'phobien';
  const limit = query.get('limit') || 20;
  const minStar = query.get('minStar') || 0;
  const maxStar = query.get('maxStar') || 0;
  const locations = query.get('locations') || '';

  useEffect(() => {
      const fetchProducts = async () => {
          try { 
              const response = await axios.get('/api/danhmuc/lay');
              // console.log(response.data);
              setCategories(response.data); 
              if(id){
                const responsesp = await axios.get(`/api/sanpham/search/timkiem?search=${search}&sort=${sort}&page=${page}&limit=${limit}&danhmuc=${id}&minStar=${minStar}&maxStar=${maxStar}&locations=${locations}`);
                console.log(responsesp.data);
                setProducts(responsesp.data.result.sp);
                setTongPages(responsesp.data.result.tongPage);
                setShops(responsesp.data.timKiemCH);
              } else {
                const responsesp = await axios.get(`/api/sanpham/search/timkiem?search=${search}&sort=${sort}&page=${page}&limit=${limit}&minStar=${minStar}&maxStar=${maxStar}&locations=${locations}`);
                console.log(responsesp.data);
                setProducts(responsesp.data.result.sp);
                setShops(responsesp.data.timKiemCH);
              }
          } catch (error) {
              console.error("Có lỗi xảy ra khi lấy sản phẩm:", error);
          }finally {
            setLoading(false);
        }
      };
      fetchProducts();
  }, [search, sort, page, limit, id, minStar, maxStar, locations]);

  const categoriesToShow = expanded ? categories : categories.slice(0, 5);

  const updateQueryParams = (newParams) => {
    const searchParams = new URLSearchParams(location.search);

    // Cập nhật giá trị mới
    Object.keys(newParams).forEach((key) => {
      if (newParams[key] !== null) {
        searchParams.set(key, newParams[key]);
      }
    });

    // Điều hướng với query params mới
    navigate(`${location.pathname}?${searchParams.toString()}`, {
      state: { id: location.state?.id }
    });
  };

  // const handleSortChange = (newSort) => {
  //   navigate(`?sort=${newSort}&page=1&limit=20`, {
  //       state: {
  //           id: id,
  //       }
  //   });
  // };

  const handleSortChange = (newSort) => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.set("sort", newSort);
    searchParams.set("page", 1); // Khi thay đổi sắp xếp, quay về trang đầu tiên

    navigate(`${location.pathname}?${searchParams.toString()}`, {
        state: { id: id }
    });
};

  const handleCategoryChange = (newCate) => {
    const nameCategory = newCate.tenDM.replace(/\s+/g, '-');
    navigate(`/category/${nameCategory}?sort=phobien&page=1&limit=20`, {
      state: { id: newCate._id }
    });
  };

  const handleStarChange = (newStars) => {
    let maxStars;
    if(newStars === 1 ){
      maxStars = 2;
    } else if (newStars === 2){
      maxStars = 3;
    } else if (newStars === 3){
      maxStars = 4;
    } else if (newStars === 4){
      maxStars = 5;
    } else {
      maxStars = 5;
    }

    updateQueryParams({
      minStar: newStars,
      maxStar: maxStars
    });
  };

  const handlePageChange = (newPage) => {
    const searchParams = new URLSearchParams(location.search);
        searchParams.set("trang", newPage);
  
    navigate(`${location.pathname}?${searchParams.toString()}`, {
      state: { id: id }
    });
  };
  if (loading) return <Loading />;

  return (
    <MainLayout>
      <div className="flex gap-6 p-4">
        {/* Sidebar */}
        <div className={`w-64 p-4 rounded-lg shadow-lg bg-[#FCFCFC] transition-all duration-300 ${expanded ? "h-auto" : "h-fit"}`}>
          <div className="flex items-center gap-2 text-[#1B8057] font-semibold mb-7">
            <FaBars />
            <span>Tất cả danh mục</span>
          </div>
          <hr className="mb-4 text-[#959595] font-bold" />
          <ul className="space-y-2">
            {categoriesToShow.map((category, index) => (
              <li key={index} className={`text-[#4d4c4c] font-semibold cursor-pointer hover:text-green-600 ${id === category._id ? 'text-green-600' : ''}`} onClick={() => handleCategoryChange(category)}>
                {category.tenDM}
              </li>
            ))}
            <li
              className="text-gray-500 cursor-pointer hover:text-gray-700"
              onClick={() => setExpanded(!expanded)}
            >
              {expanded ? "Ẩn bớt" : "Thêm..."}
            </li>
          </ul>
          <hr className="my-4 text-[#959595] font-bold" />
          <div>
            <h3 className="font-semibold mb-2">Đánh giá</h3>
            {ratings.map((stars) => (
              <div key={stars} className="flex hover:bg-gray-100 cursor-pointer" onClick={() => handleStarChange(stars)} >
                {Array.from({ length: stars }).map((_, i) => (
                  <span key={i} className="text-yellow-400 text-2xl">★</span>
                ))}
              </div>
            ))}
          </div>
          <hr className="my-4 text-[#959595] font-bold" />
          <div className="mb-10">
            <h3 className="font-semibold mb-5">Nơi bán</h3>
            {ListLocations.map((location, index) => {
              const searchParams = new URLSearchParams(window.location.search);
              let selectedLocations = searchParams.get("locations")?.split(",") || [];
              const isChecked = selectedLocations.includes(location); // Kiểm tra xem location có đang được chọn không

              const handleCheckboxChange = () => {
                if (isChecked) {
                  // Nếu đã có -> Xóa khỏi danh sách
                  selectedLocations = selectedLocations.filter(loc => loc !== location);
                } else {
                  // Nếu chưa có -> Thêm vào danh sách
                  selectedLocations.push(location);
                }

                if (selectedLocations.length === 0) {
                  searchParams.delete("locations");
                } else {
                  searchParams.set("locations", selectedLocations.join(","));
                }

                navigate(`${window.location.pathname}?${searchParams.toString()}`, {
                  state: { id: id }
                });
              };

              return (
                <div key={index} className="flex items-center gap-5 mb-3">
                  <input
                    type="checkbox"
                    className="w-4 h-4 accent-[#1B8057] cursor-pointer"
                    checked={isChecked}
                    onChange={handleCheckboxChange}
                  />
                  <span className="text-[#6F6F6F] font-semibold">{location}</span>
                </div>
              );
            })}

          </div>
        </div>

        {/* Product Grid */}
        <div className="flex-1">
          <p className="flex items-center gap-2 font-semibold mb-4 text-xl">
            <GrInfo /> Kết quả tìm kiếm cho từ khóa <span className="text-[#1B8057]">{search}</span>
          </p>
          <hr className="my-4 text-[#959595] font-bold" />
          {shops.length >0 ? (
            <>
              <div className="grid grid-cols-3 gap-4 justify-center">
                {shops.map((shop, index) => (
                    <ShopCard key={index} {...shop} />
                ))}
              </div>
              <hr className="my-4 text-[#959595] font-bold" />
            </>
          ) : (
            <p>Không có cửa hàng</p>
          )}
          <hr className="my-4 text-[#959595] font-bold" />
            <div className="flex justify-between mb-4">
              <span className="font-semibold">Sắp xếp theo</span>
              <div className="flex gap-2">
                <button 
                  className={`px-4 py-2 border font-semibold rounded-lg hover:bg-[#1B8057] hover:text-white transition duration-200 cursor-pointer ${sort === 'phobien' ? 'bg-[#1B8057] text-white' : 'bg-white '}`}
                  onClick={() => handleSortChange('phobien')} 
                  >Phổ Biến</button>
                <button 
                  className={`px-4 py-2 border font-semibold rounded-lg hover:bg-[#1B8057] hover:text-white transition duration-200 cursor-pointer ${sort === 'moinhat' ? 'bg-[#1B8057] text-white' : 'bg-white '}`}
                  onClick={() => handleSortChange('moinhat')} 
                  >Mới nhất</button>
                <button 
                  className={`px-4 py-2 border font-semibold rounded-lg hover:bg-[#1B8057] hover:text-white transition duration-200 cursor-pointer ${sort === 'banchay' ? 'bg-[#1B8057] text-white' : 'bg-white '}`}
                  onClick={() => handleSortChange('banchay')} 
                  >Bán chạy</button>
                <select 
                  className={`px-4 py-2 border font-semibold rounded-lg hover:bg-[#1B8057] hover:text-white transition duration-200 cursor-pointer ${sort === "giaTang" || sort === "giaGiam" ? 'bg-[#1B8057] text-white' : 'bg-white'}`}
                  onChange={(e) => handleSortChange(e.target.value)}
                  value={sort}
                >
                  <option value="" className="text-black bg-white">Giá</option>
                  <option value="giatang" onClick={(e) => handleSortChange(e.target.value)} className ={`cursor-pointer text-black ${sort === "giaTang" ? 'bg-[#1B8057] text-white' : 'bg-white'}`}>Giá tăng</option>
                  <option value="giagiam" onClick={(e) => handleSortChange(e.target.value)} className={`cursor-pointer text-black ${sort === "giaGiam" ? 'bg-[#1B8057] text-white' : 'bg-white'}`}>Giá giảm</option>
                </select>
              </div>
            </div>
            {products.length >0 ? (
              <>
                <div className="grid grid-cols-4 gap-4 justify-center">
                  {products.map((product) => (
                    <ProductCard key={product._id} {...product} />
                  ))}
                </div>
                <div className="flex justify-center items-center mt-6 mb-10">
                  <button 
                      onClick={() => handlePageChange(page - 1)}
                      disabled={page === 1}
                      className={`px-4 py-2 mx-1 rounded-lg shadow hover:bg-[#1B8057] hover:text-white transition duration-200 ${page === 1 ? 'bg-gray-200 cursor-not-allowed' : 'bg-white'}`}>
                      <FaAngleLeft />
                  </button>
                  {Array.from({ length: tongPages }, (_, index) => (
                      <button
                          key={index + 1}
                          onClick={() => handlePageChange(index + 1)}
                          className={`px-4 py-2 mx-1 rounded-lg shadow hover:bg-[#1B8057] hover:text-white transition duration-200 ${page === index + 1 ? 'bg-[#1B8057] text-white' : 'bg-white'}`}>
                          {index + 1}
                      </button>
                  ))}
                  <button 
                      onClick={() => handlePageChange(page + 1)}
                      disabled={page === tongPages}
                      className={`px-4 py-2 mx-1 rounded-lg shadow hover:bg-[#1B8057] hover:text-white transition duration-200 ${page === tongPages ? 'bg-gray-200 cursor-not-allowed' : 'bg-white'}`}>
                      <FaAngleRight />
                  </button>
                </div>
              </>
            ) : (
              <p>Không có sản phẩm</p>
            )}
        </div>
      </div>
    </MainLayout>
  );
}

export default CategoryPageSearch;
