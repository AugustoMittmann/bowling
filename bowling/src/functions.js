const result = (arrayPontos) => {
  let resultado = []
  arrayPontos.forEach((value, index) => {
    if(value[0] === 10) { // strike

      resultado.push(
        (resultado[index-1] || 0) +   //resultado anterior
        value[0] +  //valor da posição 1
        (value[1] || 0) +   //valor da posição 2 se diferente de 0
        (arrayPontos[index+1] !== undefined ? arrayPontos[index+1][0] + //  se tiver algum numero no prox frame, soma a posição 1 
        (arrayPontos[index+1][0] === 10 ? arrayPontos[index+2] !== undefined ? arrayPontos[index+2][0] : 0 : arrayPontos[index+1][1] || 0) : 0) //se tiver algum numero no prox frame, soma a posição 2 ou 0
      )

    } else if(value[0] + value[1] === 10) { //spare
      resultado.push((resultado[index-1] || 0) + value[0] + (value[1] || 0) + (arrayPontos[index+1] !== undefined ? arrayPontos[index+1][0] : 0))
    } else {  //jogada normal
      resultado.push((resultado[index-1] || 0) + value[0] + (value[1] || 0))
    }
  })
  return resultado
}

module.exports = { result }
