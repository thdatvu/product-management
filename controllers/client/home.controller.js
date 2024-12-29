//[GET] /

module.exports.index = (req, res) => {
    res.render("client/pages/home/index",{
        pageTitle: "HomePage"
    }) // mac dinh se di vao views dau tien
}