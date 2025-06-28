export default function PrivacyPage() {
  return (
    <div className="container mx-auto py-12 px-4 max-w-4xl">
      <h1 className="font-headline text-4xl font-bold mb-8">Política de Privacidad</h1>
      <div className="prose dark:prose-invert max-w-none space-y-4">
        <p>Tu privacidad es importante para nosotros. Es política de DualMuse respetar tu privacidad con respecto a cualquier información que podamos recopilar de ti a través de nuestro sitio web.</p>
        
        <h2 className="font-headline text-2xl font-bold pt-4">1. Información que Recopilamos</h2>
        <p>Solicitamos información personal solo cuando realmente la necesitamos para brindarte un servicio. La recopilamos por medios justos y legales, con tu conocimiento y consentimiento. También te informamos por qué la recopilamos y cómo se utilizará.</p>
        <p>La información que nos proporcionas para crear tu canción (historias, nombres, etc.) se utiliza únicamente para el propósito de generar tu canción personalizada.</p>

        <h2 className="font-headline text-2xl font-bold pt-4">2. Uso de Datos</h2>
        <p>Usamos la información recopilada para procesar tu pedido, comunicarnos contigo y mejorar nuestros servicios. No compartimos ninguna información de identificación personal públicamente o con terceros, excepto cuando la ley lo exija.</p>
        
        <h2 className="font-headline text-2xl font-bold pt-4">3. Seguridad de los Datos</h2>
        <p>La seguridad de tus datos es una prioridad para nosotros. Utilizamos Firebase y Stripe, plataformas seguras y reconocidas, para almacenar tu información y procesar los pagos. Sin embargo, ningún método de transmisión por Internet o de almacenamiento electrónico es 100% seguro.</p>
        
        <h2 className="font-headline text-2xl font-bold pt-4">4. Cookies</h2>
        <p>Nuestro sitio web puede utilizar "cookies" para mejorar la experiencia del usuario. Puedes configurar tu navegador para que rechace las cookies, pero esto puede afectar la funcionalidad de algunas partes de nuestro sitio.</p>

        <p>El uso continuado de nuestro sitio web se considerará como la aceptación de nuestras prácticas en materia de privacidad y de información personal. Si tienes alguna pregunta sobre cómo manejamos los datos de los usuarios y la información personal, no dudes en contactarnos.</p>
      </div>
    </div>
  );
}
