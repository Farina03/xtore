import styled from "styled-components";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import headphone from "../images/headphonerbg.png";
import { Add, Remove } from "@material-ui/icons";
import { mobile } from "../responsive";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { userRequest } from "../requestMethods";

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 20px;
  ${mobile({ padding: "10px" })}
`;

const Title = styled.div`
  font-weight: 300;
  text-align: center;
  font-size: 26px;
  color: #256d85;
  padding: 20px;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  ${mobile({ flexDirection: "column" })}
`;

const TopButton = styled.button`
  padding: 10px;
  font-weigt: 600;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "#256D85" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
  transition: all 0.3s ease;
  &:hover {
    transform: scale(1.02);
    background-color: #e8f9fd;
  }
`;

const Bottom = styled.div`
  display: flex;
  jystify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const Info = styled.div`
  flex: 3;
`;
const Product = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  margin-bottom: 20px;
`;
const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;
const Image = styled.img`
  width: 200px;
  height: 200px;
`;
const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;
const ProductName = styled.span``;
const ProductId = styled.span``;
const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;
const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;
const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
`;
const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 400;
`;
const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 2px;
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 350px;
`;

const SummaryTitle = styled.div`
  font-weight: 200;
`;
const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;
const SummaryItemText = styled.div``;
const SummaryItemPrice = styled.div``;
const Button = styled.button`
    width: 100%;
    padding 10px;
    background-color: #256D85;
    color: white;
    font-weight: 600;
    border: none;
    cursor: pointer;
    transition: all 0.3s ease;
    &:hover {
        transform: scale(1.02);

    }
`;

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const navigate = useNavigate();

  //console.log(cart);
  const handleClick = async (event) => {
    event.preventDefault();
    try {
      const accountNo = "420420420";
      const bank = await userRequest.get("/bank/" + accountNo);
      console.log(bank.data.balance);
      if (cart.total <= bank.data.balance) {
        const res = await userRequest.post("/transactions", {
          userId: "test",
          from_bank_account: accountNo,
          to_bank_account: "421421421",
          amount: cart.total,
        });
        const updatedAccount = await userRequest.put("/bank/", {
          accountNo: accountNo,
          amount: cart.total,
          password: "123456",
        });
        console.log("Cart is", cart);
        console.log("res.data", res.data);
        console.log(updatedAccount.data);
        navigate("/success", {
          state: { products: cart, data: res.data, bank: updatedAccount.data },
        });
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Container>
      <Navbar />
      <Wrapper>
        <Title>Your Cart</Title>
        <Top>
          <Link to="/">
            <TopButton>CONTINUE SHOPPING</TopButton>
          </Link>

          {/* <TopTexts>
                    <TopText>
                        Your Shopping Bag
                    </TopText>
                    <TopText>
                        Your Wishlist
                    </TopText>
                </TopTexts> */}

          {/* <TopButton type="filled">CHECKOUT NOW</TopButton> */}
        </Top>
        <Bottom>
          <Info>
            {cart.products.map((product) => (
              <>
                <Product>
                  <ProductDetail>
                    <Image src={headphone} />
                    <Details>
                      <ProductName>
                        <b>Product: </b> {product.title}
                      </ProductName>
                      <ProductId>
                        <b>ID: </b>
                        {product._id}
                      </ProductId>
                      <ProductColor color={product.color} />
                    </Details>
                  </ProductDetail>
                  <PriceDetail>
                    <ProductAmountContainer>
                      <Add style={{ cursor: "pointer", color: "#444444" }} />
                      <ProductAmount> {product.quantity} </ProductAmount>
                      <Remove style={{ cursor: "pointer", color: "#444444" }} />
                    </ProductAmountContainer>
                    <ProductPrice>
                      {" "}
                      $ {product.price * product.quantity}{" "}
                    </ProductPrice>
                  </PriceDetail>
                </Product>
                <Hr />
              </>
            ))}
          </Info>
          <Summary>
            <SummaryTitle>ORDER SUMMARY</SummaryTitle>
            <SummaryItem>
              <SummaryItemText>Bank Account Balance</SummaryItemText>
              <SummaryItemPrice>$ 1000</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Sub-total</SummaryItemText>
              <SummaryItemPrice>$ {cart.total}</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Shipping Cost</SummaryItemText>
              <SummaryItemPrice>$ 5</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem type="total">
              <SummaryItemText>Total Cost</SummaryItemText>
              <SummaryItemPrice>$ {cart.total + 5.0} </SummaryItemPrice>
            </SummaryItem>
            <Button onClick={handleClick}>CHECKOUT NOW</Button>
          </Summary>
        </Bottom>
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default Cart;