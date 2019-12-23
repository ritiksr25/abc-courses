module.exports.mailTemplates = (mailType, order) => {
    let template = {
        "order-confirm": {
            subject: `Order confirmation`,
            body: `Congratulations <b>${order.user.name}</b>!,<br>
      <p>Thank you for using ABC Courses.<br> Your order has been confirmed for the following course:<br> <b>${order.product.title}</b>.<br>
            <p>Your Payment of ₹ ${order.product.price} is successfull for this order. Transaction ID: ${order.transacId}.</p><br>
            <br>
            
            Note: This is a system generated email. Please do not reply to this email.<br><br>
            Thanks,<br>
            Team ABC Courses`
        }
    };
    return template[mailType];
};
