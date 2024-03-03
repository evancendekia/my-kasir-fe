function FormatIDR(intNum){
  return (new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
    }).format(intNum)
  )
}   
function FormatMoney(intNum){
  return (new Intl.NumberFormat('id-ID').format(intNum)
  )
}   
module.exports = {
  FormatIDR,
  FormatMoney
}