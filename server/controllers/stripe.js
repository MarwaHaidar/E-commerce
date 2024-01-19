import asyncHandler from 'express-async-handler';
import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_KEY);




const payment = asyncHandler(async (req, res) => {


    const Line_items=req.body.cartItems.map((product)=>{

    

        return{
            price_data:{
                currency:"USD",
                product_data:{

                    name:product.name,
                    images:product.imageCover,
                    desc:product.desc,
                    metadata:{
                        id:product._id,
                    },
                },
                price:product.price *100,
            },
            quantity:product.quantity,



        };
    });

    const session = await stripe.checkout.sessions.create({
        Line_items,
    //   line_items: [
    //     {
    //       price_data: {
    //         currency: 'usd',
    //         product_data: {
    //           name: 'T-shirt',
    //         },
    //         unit_amount: 2000,
    //       },
    //       quantity: 1,
    //     },
    //   ],
      mode: 'payment',
      success_url: `${process.env.CLIENT_URL}/checkout-success`,
      cancel_url: `${process.env.CLIENT_URL}/cart`,
    });
  
    res.send({url:session.url});
  });
  

  export {payment};