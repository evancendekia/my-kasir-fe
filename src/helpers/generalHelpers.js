function FormatIDR(intNum){
  return (new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
    }).format(intNum)
  )
}   

module.exports = {
  FormatIDR
}