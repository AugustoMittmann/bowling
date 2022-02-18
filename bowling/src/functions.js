export const result = (arrayPontos) => {
  let resultado = []
  let round = 0
  
  arrayPontos.map((value, index) => {
      const aux = (resultado[resultado.length-1] || 0) //salva o resultado da soma com somente 1 numero do frame
      
      if(round === 0) {  //primeira jogada
        if(value === 10) {  //strike
          resultado.push(aux + value + (arrayPontos[index+1] || 0) + (arrayPontos[index+2] || 0)) //push em uma soma: soma anterior + 10 + 2 proximos valores
        } else {
          resultado.push(aux+value) //seta a soma com os 2 pontos dos frames
          round = 1 //alterna round
        }
      }
      
      else {  //segunda jogada
        resultado.pop() //remove o resultado anterior 
        if(arrayPontos[index-1] + value === 10) { //spare
          resultado.push(aux + value + (arrayPontos[index+1] || 0)) //efetua a soma com o proximo valor
        } else {
          resultado.push(aux+value) //efetua a soma normal
        }
        round = 0 //alterna round
      }
  })
  return resultado
}