import { ref, onMounted,computed } from "vue";

export default function useCripto() {
  const criptomonedas = ref([]);

  const monedas = ref([
    { codigo: "USD", texto: "Dolar de Estados Unidos" },
    { codigo: "MXN", texto: "Peso Mexicano" },
    { codigo: "EUR", texto: "Euro" },
    { codigo: "GBP", texto: "Libra Esterlina" },
  ]);

  const cotizacion = ref({});
  const cargando = ref(false);

  onMounted(() => {
    const url =
      "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=20&tsym=USD";
    fetch(url)
      .then((respuesta) => respuesta.json())
      .then(({ Data }) => {
        criptomonedas.value = Data;
      });
  });
  const obtenerCotizacion = async (cotizar) => {
    cargando.value = true;
    cotizacion.value = {};
    const { moneda, criptomoneda } = cotizar;

    const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`;
    const respuesta = await fetch(url);
    const resultado = await respuesta.json();

    // Se utiliza esta versión de acceso a propiedades de objeto porque esas propiedades son dinámicas.
    // Con la notación de punto no se pueden utilizar variables
    cotizacion.value = resultado.DISPLAY[criptomoneda][moneda];
    cargando.value = false;
  };

  const mostrarCotizacion = computed(() => {
    return Object.values(cotizacion.value).length;
  });

  return {
    monedas,
    criptomonedas,
    cargando,
    cotizacion,
    obtenerCotizacion,
    mostrarCotizacion,
  };
}
