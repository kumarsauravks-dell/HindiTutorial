const Order = require("../../../models/order")

function statusController(){
    return{
        update(req,res){
            Order.updateOne(
                {_id:req.body.orderId},
                {status:req.body.status},
                (err,data)=>{
                    if(err){
                        res.redirect('/admin-orders');
                    }
                    // Emit Event
                    const eventEmitter=req.app.get('eventEmitter')
                    eventEmitter.emit('orderUpdated',{id: req.body.orderId,status:req.body.status})
                    res.redirect('/admin-orders');
                }
            )
        }
    }
}
module.exports=statusController