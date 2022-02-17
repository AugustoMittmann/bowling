export const result = (arrayPontos) => {
  let resultado = []
  
  arrayPontos.map((value, index) => {
      const aux = (resultado[resultado.length-1] || 0) //salva o resultado da soma com somente 1 numero do frame
      
      
      if(value === 10) {  //strike
        resultado.pop()
        console.log(aux, value, arrayPontos[index+1], arrayPontos[index+2]);
        resultado.push(aux + value + (arrayPontos[index+1] || 0) + (arrayPontos[index+2] || 0))
      } else 
      
      if(index%2 === 0) {  //indice par
      resultado.push(aux+value) //seta a soma com os 2 pontos dos frames
      } 
      
      
      
      else {  //indice impar
        resultado.pop() //remove o resultad o anterior
        if(arrayPontos[index-1] + value === 10) {
          if(arrayPontos[index+2] === 10) {
            resultado.push(aux+value+(arrayPontos[index+2] || 0))
          } else {
            resultado.push(aux+value+(arrayPontos[index+1] || 0))
          }
        } else {
          resultado.push(aux+value)
        }
      }
  })
  return resultado
}