let produtos = [
  {
    id: "1",
    nome: "Camisa Xadrez - Rosa",
    preco: "49,90",
    img: "./img/imagens/feminino/1.jpg",
    categoria: "feminino",
  },
  {
    id: "2",
    nome: "Camisa Xadrez - Preta",
    preco: "49,90",
    img: "./img/imagens/feminino/2.jpg",
    categoria: "feminino",
  },
  {
    id: "3",
    nome: "Camisa Lisa - Branca",
    preco: "49,90",
    img: "./img/imagens/feminino/3.jpg",
    categoria: "feminino",
  },
  {
    id: "4",
    nome: "Camisa Manga - Nude",
    preco: "49,90",
    img: "./img/imagens/feminino/4.jpg",
    categoria: "feminino",
  },
  {
    id: "5",
    nome: "Camisa Oncinha - Oncinha",
    preco: "49,90",
    img: "./img/imagens/feminino/5.jpg",
    categoria: "feminino",
  },
  {
    id: "6",
    nome: "Camisa Estampada - Preta",
    preco: "49,90",
    img: "./img/imagens/feminino/6.jpg",
    categoria: "feminino",
  },
  {
    id: "7",
    nome: "Camisa Estampada - Rosa",
    preco: "49,90",
    img: "./img/imagens/infantil/1.jpg",
    categoria: "infantil",
  },
  {
    id: "8",
    nome: "Camisa Sonic - Branca",
    preco: "49,90",
    img: "./img/imagens/infantil/2.jpg",
    categoria: "infantil",
  },
  {
    id: "9",
    nome: "Vestido Xadez - Vermelho",
    preco: "49,90",
    img: "./img/imagens/infantil/3.jpg",
    categoria: "infantil",
  },
  {
    id: "10",
    nome: "Camisa Dinossauro - Laranja",
    preco: "49,90",
    img: "./img/imagens/infantil/4.jpg",
    categoria: "infantil",
  },
  {
    id: "11",
    nome: "jaqueta Minnie - Vermelha",
    preco: "49,90",
    img: "./img/imagens/infantil/5.jpg",
    categoria: "infantil",
  },
  {
    id: "12",
    nome: "Vestido Estampado - Oncinha",
    preco: "49,90",
    img: "./img/imagens/infantil/6.jpg",
    categoria: "infantil",
  },
  {
    id: "13",
    nome: "Camisa Xadez - Cinza",
    preco: "49,90",
    img: "./img/imagens/masculino/1.jpg",
    categoria: "masculino",
  },
  {
    id: "14",
    nome: "Camisa Gola Alta - Preta",
    preco: "49,90",
    img: "./img/imagens/masculino/2.jpg",
    categoria: "masculino",
  },
  {
    id: "15",
    nome: "Camisa Rick Morty - Preta",
    preco: "49,90",
    img: "./img/imagens/masculino/3.jpg",
    categoria: "masculino",
  },
  {
    id: "16",
    nome: "Camisa Polo - Cinza",
    preco: "49,90",
    img: "./img/imagens/masculino/4.jpg",
    categoria: "masculino",
  },
  {
    id: "17",
    nome: "Camisa Floral - Branca",
    preco: "49,90",
    img: "./img/imagens/masculino/5.jpg",
    categoria: "masculino",
  },
  {
    id: "18",
    nome: "Camisa Social - Nude",
    preco: "49,90",
    img: "./img/imagens/masculino/6.jpg",
    categoria: "masculino",
  },
];

const productsAll = document.querySelector("#all");
const listFeminino = document.querySelector("#feminino");
const listInfantil = document.querySelector("#infantil");
const listMasculino = document.querySelector("#masculino");
const listProducts = document.querySelector(".section_products");
const inputFilter = document.querySelector(".search");

inputFilter.addEventListener("keyup", (e) => {
  let pecasFiltradas = "";
  let valorBusca = e.target.value.toLowerCase();
  pecasFiltradas = produtos.filter((produto) => {
    const peca = produto.nome.toLowerCase();
    return peca.includes(valorBusca);
  });
  listarProdutos(pecasFiltradas, null);
});

listarProdutos(produtos, null);

productsAll.addEventListener("click", (e) => {
  e.preventDefault();
  listarProdutos(produtos, null);
});
listFeminino.addEventListener("click", (e) => {
  e.preventDefault();
  listarProdutos(produtos, "feminino");
});
listInfantil.addEventListener("click", (e) => {
  e.preventDefault();
  listarProdutos(produtos, "infantil");
});
listMasculino.addEventListener("click", (e) => {
  e.preventDefault();
  listarProdutos(produtos, "masculino");
});

function listarProdutos(produtos, categoria) {
  listProducts.innerHTML = "";
  for (const produto of produtos) {
    if (!categoria || produto.categoria === categoria) {
      listProducts.innerHTML += `
                <div class="product">
                    <img class="section_image" src="${produto.img}">
                    <p class="section_name">${produto.nome}</p>
                    <p class="section_value">${produto.preco}</p>
                    <button id=${produto.id} class="cart_add">Adicionar</button>
                </div>
            `;
    }
  }
}

const modal = document.querySelector(".modal");
const modalCarrinho = document.querySelector("#modal");
const btnCarrinho = document.querySelector(".button_cart");

btnCarrinho.addEventListener("click", (e) => {
  abrirModal();
});

function abrirModal() {
  modal.style.display = "flex";
  modalCarrinho.style.display = "flex";

  const botaoFechar = document.querySelector("#close_modal");
  botaoFechar.addEventListener("click", () => {
    fecharModal();
  });

  // Adicionando um ouvinte de evento ao objeto window
  window.addEventListener("click", foraDoModalClique);
}

function fecharModal() {
  modal.style.display = "none";
  modalCarrinho.style.display = "none";

  // Removendo o ouvinte de evento do objeto window quando o modal é fechado
  window.removeEventListener("click", foraDoModalClique);
}

// Função para verificar se o clique ocorre fora do modal
function foraDoModalClique(event) {
  if (event.target === modal) {
    fecharModal();
  }
}

// Adiciona um ouvinte de evento ao botão de fechar
const sectionProdCart = document.querySelector(".section_products_cart");
const cartAdd = document.querySelectorAll(".cart_add");

// Object to store the cart items and their quantities
const cartItems = {};

// Function to update the cart display in the modal
function listarProdutosCart() {
  sectionProdCart.innerHTML = "";

  for (const productId in cartItems) {
    const product = cartItems[productId];
    sectionProdCart.innerHTML += `
      <div style="margin-right:8px;" class="list">
        <img class="section_image" src="${product.img}">
        <p class="section_name">${product.nome}</p>
        <p class="section_value">${product.preco}</p>
        <p class="section_qtd">Quantidade: ${product.quantity}</p>
      </div>
    `;
  }
}

function handleAddToCart(productId) {
  const product = produtos.find((produto) => produto.id === productId);

  if (!product) {
    return; // If the product doesn't exist, do nothing
  }

  if (cartItems[productId]) {
    // If the product is already in the cart, increase the quantity
    cartItems[productId].quantity++;
  } else {
    // If the product is not in the cart, add it with a quantity of 1
    cartItems[productId] = {
      ...product,
      quantity: 1,
    };
  }

  alert("Item " + product.nome + " adicionado ao carrinho!");
  listarProdutosCart(); // Update the cart display in the modal
}

for (const button of cartAdd) {
  button.addEventListener("click", (e) => {
    const productId = button.id;
    handleAddToCart(productId);
  });
}
