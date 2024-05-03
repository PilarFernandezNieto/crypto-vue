import {ref, onMounted} from "vue";

export default function useCripto(){

    const criptomonedas = ref([]);

    const monedas = ref([
      { codigo: "USD", texto: "Dolar de Estados Unidos" },
      { codigo: "MXN", texto: "Peso Mexicano" },
      { codigo: "EUR", texto: "Euro" },
      { codigo: "GBP", texto: "Libra Esterlina" },
    ]);

    onMounted(() => {
      const url =
        "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=20&tsym=USD";
      fetch(url)
        .then((respuesta) => respuesta.json())
        .then(({ Data }) => {
          criptomonedas.value = Data;
        });
    });


    return {
      monedas,
      criptomonedas,
    };
}