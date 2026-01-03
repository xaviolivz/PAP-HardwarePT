/* =====================================================
   HardwarePT - JavaScript Unificado
   Produtos + Carrinho + UI
   ===================================================== */

// ==================== BASE DE DADOS (FRONTEND) ====================
let carrinho = JSON.parse(localStorage.getItem("carrinho")) || []

const produtos = [
  { id: 1, nome: "Intel Core i9-14900K", categoria: "Processadores", preco: 589.99, descricao: "Processador Intel 14ª geração", imagem: "/images/intel-i9-14900k.jpg", destaque: true },
  { id: 2, nome: "AMD Ryzen 9 7950X", categoria: "Processadores", preco: 549.99, descricao: "Processador AMD topo de gama", imagem: "/images/amd-ryzen-9-7950x.jpg", destaque: true },
  { id: 3, nome: "NVIDIA RTX 4090", categoria: "Placas Gráficas", preco: 1899.99, descricao: "Placa gráfica high-end", imagem: "/images/rtx-4090.jpg", destaque: true },
  { id: 4, nome: "Corsair Vengeance RGB 32GB", categoria: "Memória RAM", preco: 149.99, descricao: "DDR5 RGB", imagem: "/images/corsair.jpg" },
]

// ==================== INIT ====================
document.addEventListener("DOMContentLoaded", () => {
  carregarProdutos()
  carregarDestaques()
  atualizarContadorCarrinho()
})

// ==================== PRODUTOS ====================
function carregarProdutos() {
  const grid = document.getElementById("productsGrid")
  if (!grid) return

  grid.innerHTML = produtos.map(criarCardProduto).join("")
}

function carregarDestaques() {
  const container = document.getElementById("featured-products")
  if (!container) return

  container.innerHTML = produtos.filter(p => p.destaque)
    .map(criarCardProduto)
    .join("")
}

function criarCardProduto(produto) {
  return `
    <div class="product-card">
      <img src="${produto.imagem}" alt="${produto.nome}">
      <h3>${produto.nome}</h3>
      <p>${produto.preco.toFixed(2)}€</p>
      <button onclick="adicionarAoCarrinho(${produto.id})">Adicionar</button>
    </div>
  `
}

// ==================== CARRINHO ====================
function adicionarAoCarrinho(id) {
  const produto = produtos.find(p => p.id === id)
  if (!produto) return

  const existente = carrinho.find(i => i.id === id)
  if (existente) existente.quantidade++
  else carrinho.push({ ...produto, quantidade: 1 })

  guardarCarrinho()
  mostrarNotificacao(`${produto.nome} adicionado ao carrinho`)
}

function removerDoCarrinho(id) {
  carrinho = carrinho.filter(i => i.id !== id)
  guardarCarrinho()
}

function guardarCarrinho() {
  localStorage.setItem("carrinho", JSON.stringify(carrinho))
  atualizarContadorCarrinho()
}

function atualizarContadorCarrinho() {
  const contador = document.getElementById("cartCount")
  if (!contador) return

  contador.textContent = carrinho.reduce((t, i) => t + i.quantidade, 0)
}

// ==================== UI ====================
function mostrarNotificacao(msg) {
  alert(msg)
}
