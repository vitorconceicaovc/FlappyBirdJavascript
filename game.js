
let name = prompt("User Name:");
document.querySelector(".name").innerHTML = !name ? "Guest" : name

let frames = 0

//audio
const som_HIT = new Audio()
som_HIT.src = './efeitos/hit.wav'

const som_Pulo = new Audio()
som_Pulo.src = './efeitos/pulo.wav'

const som_Caiu = new Audio()
som_Caiu.src = './efeitos/caiu.wav'

const som_Ponto = new Audio()
som_Ponto.src = './efeitos/ponto.wav'


const sprites = new Image()
sprites.src = './sprites.png'

const canvas = document.querySelector('canvas')
const contexto = canvas.getContext('2d')

let pontuacao = 0
let FinalScore = 0

function addScore() {
  if (pontuacao > FinalScore) {
    FinalScore = pontuacao
  }
}

function updatePlacarScore() {
  document.querySelector('.score').innerHTML = FinalScore.toString()
}

function resetScore() {
  pontuacao = 0
}

// [Plano de Fundo]
const planoDeFundo = {
    spriteX: 390,
    spriteY: 0,
    largura: 275,
    altura: 204,
    x: 0,
    y: canvas.height - 204,
    desenha() {
      contexto.fillStyle = '#70c5ce';
      contexto.fillRect(0,0, canvas.width, canvas.height)
  
      contexto.drawImage(
        sprites,
        planoDeFundo.spriteX, planoDeFundo.spriteY,
        planoDeFundo.largura, planoDeFundo.altura,
        planoDeFundo.x, planoDeFundo.y,
        planoDeFundo.largura, planoDeFundo.altura,
      );
  
      contexto.drawImage(
        sprites,
        planoDeFundo.spriteX, planoDeFundo.spriteY,
        planoDeFundo.largura, planoDeFundo.altura,
        (planoDeFundo.x + planoDeFundo.largura), planoDeFundo.y,
        planoDeFundo.largura, planoDeFundo.altura,
      );
    },
};
  
// [Chao]
function criaChao() {

  const chao = {
    spriteX: 0,
    spriteY: 610,
    largura: 224,
    altura: 112,
    x: 0,
    y: canvas.height - 112,
    atualiza() {
      const movimentoDoChao = 1
      const repeteEm = chao.largura / 2
      const movimentacao = chao.x - movimentoDoChao

      chao.x = movimentacao % repeteEm
    },
    desenha() {
        contexto.drawImage(
        sprites,
        chao.spriteX, chao.spriteY,
        chao.largura, chao.altura,
        chao.x, chao.y,
        chao.largura, chao.altura,
        );

        contexto.drawImage(
        sprites,
        chao.spriteX, chao.spriteY,
        chao.largura, chao.altura,
        (chao.x + chao.largura), chao.y,
        chao.largura, chao.altura,
        );
    },
  };

  return chao

}

function fazColisao(flappyBird, chao) {
  const flappyBirdY = flappyBird.y + flappyBird.altura
  const chaoY = chao.y

  if(flappyBirdY >= chaoY) {
    return true
  }

  return false
}

function criaFlappyBird() {

  const flappyBird = {
    spriteX: 0,
    spriteY: 0,
    largura: 33,
    altura: 24,
    x: 10,
    y: 50,
    pulo: 4.6,
    pula() {

      som_Pulo.play()
      flappyBird.velocidade = -flappyBird.pulo
      
    },
    gravidade: 0.25,
    velocidade: 0,
    atualiza() {
  
      if (fazColisao(flappyBird, globais.chao)) {
        som_HIT.play()

        resetScore()
        
        mudaParaTela(Telas.GAME_OVER)
        
        som_Caiu.play()
        
        return
      }
  
      flappyBird.velocidade = flappyBird.velocidade + flappyBird.gravidade
      flappyBird.y = flappyBird.y + flappyBird.velocidade
    },
    movimentos: [
      { spriteX: 0, spriteY: 0, },
      { spriteX: 0, spriteY: 26, },
      { spriteX: 0, spriteY: 52, },
      { spriteX: 0, spriteY: 26, },
    ],
    frameAtual: 0,
    atualizaFrameAtual() {

      const intervaloDeFrames = 10
      const passouOIntervalo = frames % intervaloDeFrames === 0

      if (passouOIntervalo) {
        const baseDoIncremento = 1
        const incremento = baseDoIncremento + flappyBird.frameAtual
        const baseRepeticao = flappyBird.movimentos.length
        flappyBird.frameAtual = incremento % baseRepeticao
      }
      
    },
    desenha() {

      flappyBird.atualizaFrameAtual()

      const { spriteX, spriteY } = flappyBird.movimentos[flappyBird.frameAtual]

      contexto.drawImage(
        sprites,
        spriteX, spriteY, // Sprite X, Sprite Y
        flappyBird.largura, flappyBird.altura, // Tamanho do recorte na sprite
        flappyBird.x, flappyBird.y,
        flappyBird.largura, flappyBird.altura,
      );
    }
  }

  return flappyBird

}
 
// [Get Ready]
const mensagemGetReady = {
  spriteX: 134,
  spriteY: 0,
  largura: 174,
  altura: 152,
  x: (canvas.width / 2) - 174 / 2,
  y: 50,
  desenha() {
    contexto.drawImage(
      sprites,
      mensagemGetReady.spriteX, mensagemGetReady.spriteY, // Sprite X, Sprite Y
      mensagemGetReady.largura, mensagemGetReady.altura, // Tamanho do recorte na sprite
      mensagemGetReady.x, mensagemGetReady.y,
      mensagemGetReady.largura, mensagemGetReady.altura,
    );
  }
}

// [GameOver]
const mensagemGameOver = {
  spriteX: 134,
  spriteY: 153,
  largura: 226,
  altura: 200,
  x: (canvas.width / 2) - 226 / 2,
  y: 50,
  desenha() {
    contexto.drawImage(
      sprites,
      mensagemGameOver.spriteX, mensagemGameOver.spriteY, // Sprite X, Sprite Y
      mensagemGameOver.largura, mensagemGameOver.altura, // Tamanho do recorte na sprite
      mensagemGameOver.x, mensagemGameOver.y,
      mensagemGameOver.largura, mensagemGameOver.altura,
    );
  }
}

// [Canos]
function criaCanos() {

  const canos = {
    largura: 52,
    altura: 400,
    chao: {
      spriteX: 0,
      spriteY: 169
    },
    ceu: {
      spriteX: 52,
      spriteY: 169
    },
    espaco: 80,
    desenha() {

      canos.pares.forEach(function(par) {

        const yRandom = par.y
        const espacamentoEntreCanos = 90

        //cano do ceu
        const canoCeuX = par.x
        const canoCeuY = yRandom
        contexto.drawImage(
          sprites,
          canos.ceu.spriteX, canos.ceu.spriteY,
          canos.largura, canos.altura,
          canoCeuX, canoCeuY,
          canos.largura, canos.altura,
        )

        //cano do chao
        const canoChaoX = par.x
        const canoChaoY = canos.altura + espacamentoEntreCanos + yRandom
        contexto.drawImage(
          sprites,
          canos.chao.spriteX, canos.chao.spriteY,
          canos.largura, canos.altura,
          canoChaoX, canoChaoY,
          canos.largura, canos.altura,
        )
        par.canoCeu = {
          x: canoCeuX,
          y: canos.altura + canoCeuY
        }
        par.canoChao = {
          x: canoChaoX,
          y: canoChaoY
        }
      })    
        
    },
    temColisaoComOFlappyBird(par) {

      const cabeloDoFlappy = globais.flappyBird.y
      const peDoFlappy = globais.flappyBird.y + globais.flappyBird.altura

      if(globais.flappyBird.x + globais.flappyBird.largura >= par.x) {

        if(cabeloDoFlappy <= par.canoCeu.y) {
          return true
        }

        if(peDoFlappy >= par.canoChao.y) {
          return true
        }

      }

      return false
    },
    pares: [],
    atualiza() {

      const passou100Frames = frames % 100 === 0

      if(passou100Frames) {

        //som_Ponto.play()

        canos.pares.push({
          x: canvas.width,
          y: -150 * (Math.random() + 1)
        })
      }

      canos.pares.forEach(function(par) {
        par.x = par.x - 2

        

        if (canos.temColisaoComOFlappyBird(par)) {
          som_HIT.play()
          mudaParaTela(Telas.GAME_OVER)
          som_Caiu.play()
          resetScore()
        }

        if(par.x + canos.largura <= 0) {
          canos.pares.shift()

          som_Ponto.play()
          
          pontuacao += 1

        }
      })

    }
  }

  return canos

}



function criaPlacar() {

  const placar = {
    //pontuacao: 0,
    desenha() {
      contexto.font = '30px "VT323"'
      contexto.textAlign = 'center'
      contexto.fillStyle = 'white'
      contexto.fillText(`${pontuacao}`, canvas.width / 2, 50)
    },
    atualiza() {

      const intervaloDeFrames = 100
      const passouOIntervalo = frames % intervaloDeFrames === 0

      /*
      if(passouOIntervalo) {
        placar.pontuacao += 1

        if (placar.pontuacao > PlacarScore) {
          PlacarScore = placar.pontuacao
        }

      }
      */

    }
  }
  return placar
}

//telas
const globais = {}
let telaAtiva = {}
function mudaParaTela(novaTela) {
  telaAtiva = novaTela

  if(telaAtiva.inicializa) {
    telaAtiva.inicializa()
  }
  
}

const Telas = {
  INICIO: {
    inicializa() {
      globais.flappyBird = criaFlappyBird()
      globais.chao = criaChao()
      globais.canos = criaCanos()
    },
    desenha() {
      planoDeFundo.desenha()
      
      globais.flappyBird.desenha()
      
      globais.chao.desenha()
      mensagemGetReady.desenha()
    },
    click() {
      mudaParaTela(Telas.JOGO)
    },
    atualiza() {
      globais.chao.atualiza()
      
    }

  }
}

Telas.JOGO = {
  inicializa() {
    globais.placar = criaPlacar()
  },
  desenha() {
    planoDeFundo.desenha()
    globais.canos.desenha()
    globais.chao.desenha()
    globais.flappyBird.desenha()
    globais.placar.desenha()
  },
  click() {
    globais.flappyBird.pula()
  },
  atualiza() {
    globais.canos.atualiza()
    globais.chao.atualiza()
    globais.flappyBird.atualiza()
    globais.placar.atualiza()
  }
}

Telas.GAME_OVER = {
  desenha() {
    mensagemGameOver.desenha()
    
  },
  atualiza() {

  },
  click() {
    mudaParaTela(Telas.INICIO)
  }

  
}

function loop() {

  telaAtiva.desenha()
  telaAtiva.atualiza()

  frames += 1
  requestAnimationFrame(loop)

  addScore()
  updatePlacarScore()

}

window.addEventListener('click', function() {
  if (telaAtiva.click) {
    telaAtiva.click()
  }
})

window.addEventListener('keydown', function() {
  if(event.code === "Space" && telaAtiva.click) {
    telaAtiva.click()
  }
})



mudaParaTela(Telas.INICIO)
loop()