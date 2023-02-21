import { useAuth } from "../../../src/component/commons/hooks/custom/useAuth";
import ProductDetail from "../../../src/component/unit/product/detail/ProductDetail.index";

export default function ProductDetailPage() {
  useAuth();
  return <ProductDetail />;
}
