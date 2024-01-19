import asyncHandler from 'express-async-handler';
import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_KEY);




const payment = asyncHandler(async (req, res) => {

    const Line_items=req.body.Cart.map((item)=>{
        return{
            price_data:{
                currency:"USD",
                product_data:{
                    name:item.name,
                    images:item.imageCover,
                    desc:item.desc,
                    metadata:{
                        id:item._id,
                    },
                },
                price:item.price *100,
            },
            quantity:item.quantity,

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