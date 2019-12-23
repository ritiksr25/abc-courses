module.exports.mailTemplates = (mailType, order) => {
    let template = {
        "order-confirm": {
            subject: `Order confirmation`,
            body: `Congratulations <b>${order.user.name}</b>!,<br>
      <p>Thank you for using ABC Courses.<br> Your order has been confirmed for the following course:<b>${order.course.title}</b>.<br>
            <p>Details:<br>
            Amount: ₹ ${order.course.price}<br>
            Transaction ID: ${order.transacId}.<br>
            Invoice ID: ${order.invoiceId}
            </p><br>
            Note: This is a system generated email. Please do not reply to this email.<br><br>
            Thanks,<br>
            Team ABC Courses`
        }
    };
    return template[mailType];
};
