'use client'

import { useEffect } from 'react'

interface Props {
  onClose: () => void
}

export default function ModalTerminos({ onClose }: Props) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-terminos-titulo"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg bg-rf-carbon rounded-2xl p-6 shadow-2xl border border-rf-dorado/20 flex flex-col max-h-[88vh]"
        onClick={e => e.stopPropagation()}
      >
        {/* Encabezado */}
        <div className="flex items-center justify-between mb-5">
          <h2
            id="modal-terminos-titulo"
            className="font-display text-base uppercase tracking-widest text-rf-dorado"
          >
            Términos y Condiciones
          </h2>
          <button
            onClick={onClose}
            aria-label="Cerrar"
            className="text-rf-texto/40 hover:text-rf-dorado transition-colors p-1.5 rounded-lg hover:bg-white/5"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Contenido scrolleable */}
        <div className="overflow-y-auto flex-1 text-sm text-rf-texto/70 space-y-5 pr-1">
          <p className="text-[10px] font-display uppercase tracking-widest text-rf-dorado/50 mb-4">
            Términos y Condiciones – Sorteo Promocional Rock&Feller&apos;s Mundial
          </p>

          {/* 1 */}
          <div className="space-y-1.5">
            <p className="font-display text-rf-dorado text-xs uppercase tracking-wide">1.- Vigencia. Alcance Geográfico.</p>
            <p>MFK S.A., sito en Avenida del Libertador 5936 piso 14 A, Ciudad Autónoma de Buenos Aires, Argentina (en adelante, &quot;MFK&quot; y/o el &quot;Organizador&quot;) realizará un sorteo de acuerdo a las Bases y Condiciones (en adelante, las &quot;Bases&quot;).</p>
            <p><span className="text-rf-dorado/80">1.1.</span>La Participación será para quienes se encuentren en la República Argentina en el área geográfica de la Ciudad de Buenos Aires y Gran Buenos Aires (en adelante, el &quot;Ámbito Geográfico&quot;).</p>
          </div>

          {/* 2 */}
          <div className="space-y-1.5">
            <p className="font-display text-rf-dorado text-xs uppercase tracking-wide">2. Vigencia.</p>
            <p>Plazo: La posibilidad de inscripción al sorteo será desde las 00:00 hs del 01/05 hasta las 23:59 hs del 31/05.</p>
          </div>

          {/* 3 */}
          <div className="space-y-1.5">
            <p className="font-display text-rf-dorado text-xs uppercase tracking-wide">3. Participantes.</p>
            <p><span className="text-rf-dorado/80">3.1.</span> Podrá participar de el Sorteo cualquier persona física que cumpla con los siguientes requisitos: (a) ser mayor de 18 años de edad; (b) residir en el Ámbito Geográfico; y c) que cumplan con todos los requisitos de participación detallados en estas Bases y Condiciones (en adelante, el &quot;Participante&quot;).</p>
            <p><span className="text-rf-dorado/80">3.2.</span> Quedan excluidos de participar en este Sorteo quienes no cumplan los requisitos de 2.1. así como el personal del Organizador y los ex empleados que se hubiesen desvinculado de la misma hasta treinta (30) días antes del inicio del Plazo de Vigencia.</p>
            <p><span className="text-rf-dorado/80">3.3.</span> La participación es de carácter voluntario.</p>
          </div>

          {/* 4 */}
          <div className="space-y-1.5">
            <p className="font-display text-rf-dorado text-xs uppercase tracking-wide">4. Mecánica de Participación. &quot;Double Chance&quot; y Contenido de Usuario.</p>
            <p><span className="text-rf-dorado/80">4.1.</span> Modalidad: los interesados deberán:</p>
            <p className="pl-3">a) Ingresar al sitio web https://sorteo.rockandfellers.com.ar.</p>
            <p className="pl-3">b) Completar el formulario con datos reales: Nombre y Apellido, Email, Fecha de Nacimiento, Código de cupón y Teléfono.</p>
            <p className="pl-3">c) Completar el formulario de participación con el código de cupón entregado junto a la factura emitida por el establecimiento del Organizador dentro del Plazo de Vigencia.</p>
            <p className="pl-3">Cada cupón válido equivale a una (1) chance.</p>
            <p><span className="text-rf-dorado/80">4.2.</span> Incentivo &quot;Doble Chance&quot;: Aquellos que comenten la publicación oficial del sorteo en la cuenta de Instagram del Organizador (@rockandfellersba) obtendrán una (1) chance adicional por única vez, siempre que hayan completado previamente el formulario de participación y cumplan con los requisitos establecidos en las presentes Bases y Condiciones.</p>
            <p><span className="text-rf-dorado/80">4.3.</span> Gratuidad: En cumplimiento de la normativa vigente, la participación es gratuita y no deberá realizar pago alguno una vez enviado lo requerido.</p>
            <p><span className="text-rf-dorado/80">4.4.</span> El día 01/06 se realizará el sorteo incluyendo a todos los participantes que hayan cumplido con los términos pactados.</p>
          </div>

          {/* 5 */}
          <div className="space-y-1.5">
            <p className="font-display text-rf-dorado text-xs uppercase tracking-wide">5. Premio y Limitación de Responsabilidad.</p>
            <p><span className="text-rf-dorado/80">5.1.</span> Detalle: El Premio consistirá en un (1) Smart TV de 85&quot;. La marca, modelo, versión, color, características técnicas, accesorios incluidos y demás especificaciones del producto serán definidos por el Organizador según disponibilidad comercial al momento de adquisición del Premio. Toda imagen, descripción o referencia visual utilizada en piezas de comunicación tendrá carácter meramente ilustrativo y no implicará compromiso sobre una marca, modelo o especificación técnica determinada. El Premio no podrá ser transferido, canjeado por dinero en efectivo ni reemplazado por otros bienes o servicios a solicitud del ganador.</p>
            <p><span className="text-rf-dorado/80">5.2.</span> Garantía: El Organizador no otorga garantía propia; el ganador deberá gestionar cualquier falla directamente con el fabricante bajo la garantía oficial (Ley 24.240).</p>
            <p><span className="text-rf-dorado/80">5.3.</span> Gastos: Todo impuesto (ej: Ley 20.630), tasa, contribución o gasto de envío/instalación no especificado será a cargo exclusivo del ganador.</p>
            <p><span className="text-rf-dorado/80">5.4.</span> El Premio será entregado según coordinen las Partes, en un plazo no mayor a sesenta (60) días del sorteo.</p>
          </div>

          {/* 6 */}
          <div className="space-y-1.5">
            <p className="font-display text-rf-dorado text-xs uppercase tracking-wide">6. Seguridad Informática y Prevención de Phishing.</p>
            <p><span className="text-rf-dorado/80">6.1.</span> Exoneración por Ciberdelitos: El Organizador nunca solicitará datos de tarjetas de crédito, claves bancarias (CBU/alias), ni transferencias de dinero para la entrega del premio. El Organizador no se responsabiliza por perfiles falsos que utilicen su nombre e imagen para estafar a los participantes.</p>
            <p><span className="text-rf-dorado/80">6.2.</span> Integridad: El Organizador no será responsable por fallas técnicas en el sitio web o en la plataforma Instagram que interrumpan la participación.</p>
          </div>

          {/* 7 */}
          <div className="space-y-1.5">
            <p className="font-display text-rf-dorado text-xs uppercase tracking-wide">7. Protección de Datos Personales (Ley 25.326).</p>
            <p><span className="text-rf-dorado/80">7.1.</span> Los datos personales suministrados por los Participantes serán tratados conforme a lo dispuesto por la Ley 25.326 de Protección de Datos Personales y su normativa reglamentaria.</p>
            <p><span className="text-rf-dorado/80">7.2.</span> El Participante presta su consentimiento libre, expreso e informado para la recolección, almacenamiento, uso, tratamiento y cesión de sus datos personales por parte del Organizador, con las siguientes finalidades:</p>
            <p className="pl-3">a) Gestión integral del Sorteo;</p>
            <p className="pl-3">b) Verificación de identidad y cumplimiento de requisitos;</p>
            <p className="pl-3">c) Contacto con los participantes;</p>
            <p className="pl-3">d) Acciones promocionales, comerciales y de marketing directo.</p>
            <p><span className="text-rf-dorado/80">7.3.</span> El titular de los datos podrá ejercer en cualquier momento sus derechos de acceso, rectificación, actualización y supresión, conforme lo previsto en la normativa vigente, mediante comunicación a contacto@rockandfellersba.com.ar.</p>
            <p><span className="text-rf-dorado/80">7.4.</span> La Agencia de Acceso a la Información Pública, en su carácter de órgano de control de la Ley 25.326, tiene la atribución de atender denuncias y reclamos vinculados al incumplimiento de las normas sobre protección de datos personales.</p>
            <p><span className="text-rf-dorado/80">7.5.</span> El Organizador declara haber adoptado medidas de seguridad técnicas y organizativas razonables para garantizar la confidencialidad e integridad de los datos, sin perjuicio de lo cual el Participante reconoce que los sistemas informáticos no son invulnerables.</p>
            <p><span className="text-rf-dorado/80">7.6.</span> El Participante autoriza expresamente la cesión de sus datos a terceros vinculados al desarrollo del Sorteo, siempre dentro de las finalidades indicadas.</p>
            <p><span className="text-rf-dorado/80">7.7.</span> Toda información que sea introducida a la pagina y/o formulario será tratada en cumplimiento de la Normativa y los datos personales serán utilizados únicamente para los fines aquí consentidos o los que consienta oportunamente. MFK expresa su compromiso de proteger la seguridad de la información personal de los usuarios. Sin perjuicio de esto, le recomendamos que no incluya información confidencial, secreta, comprometedora, datos sensibles o información personal delicada que usted no desea revelar al enviar información, datos o archivos. Usted reconoce y acepta que, a pesar de todos nuestros esfuerzos, ninguna medida de seguridad de datos puede garantizar por completo la protección en todo momento.</p>
            <p><span className="text-rf-dorado/80">7.8.</span> MFK se reserva el derecho de mantener actualizada esta Política de conformidad con la normativa vigente. Si se realizan cambios materiales en esta Política, se lo informaremos mediante una comunicación electrónica y de ser necesario se le solicitará nuevamente su consentimiento con la nueva Política que se implemente.</p>
          </div>

          {/* 8 */}
          <div className="space-y-1.5">
            <p className="font-display text-rf-dorado text-xs uppercase tracking-wide">8. Propiedad Intelectual y Derechos de Imagen.</p>
            <p>Los textos, diseños, imágenes, bases de datos, logos, estructura, marcas y demás elementos de el Sorteo y/o el sitio están protegidos por las leyes y los tratados internacionales sobre propiedad intelectual e industrial. Cualquier reproducción, transmisión, adaptación, traducción, modificación, comunicación al público, o cualquier otra explotación de todo o parte del contenido de este sitio, efectuada de cualquier forma o por cualquier medio, electrónico, mecánico u otro, están estrictamente prohibidos salvo autorización previa por escrito del Organizador.</p>
            <p>Ninguno de los mencionados concede licencia y/o autorización de uso de ninguna clase sobre sus derechos de propiedad intelectual e industrial o sobre cualquier otra propiedad o derecho relacionado con el Sorteo, los términos y/o contenidos de la misma o del sitio donde se introducen los datos.</p>
            <p>Lo dispuesto en el presente se encuentra amparado por las normas de la propiedad intelectual vigentes en nuestro país, a saber, la ley 11.723 y convenios internacionales que están ratificados por la República Argentina.</p>
          </div>

          {/* 9 */}
          <div className="space-y-1.5">
            <p className="font-display text-rf-dorado text-xs uppercase tracking-wide">9. Aceptación y Reclamos.</p>
            <p><span className="text-rf-dorado/80">9.1.</span> Plazo de Reclamo: La falta de contacto o respuesta en 72 horas hábiles desde la notificación causará la pérdida automática del derecho al premio.</p>
            <p><span className="text-rf-dorado/80">9.2.</span> La participación en el Sorteo implica la aceptación de estas Bases, así como de las decisiones que adopte el Organizador, conforme a derecho, sobre cualquier cuestión no prevista en las mismas y cuya difusión será realizada a través de los mismos medios por los que se difunden las presentes Bases, motivo por el cual sugerimos consultarlas dentro del Plazo de Vigencia.</p>
            <p><span className="text-rf-dorado/80">9.3.</span> Cuando circunstancias no imputables al Organizador ni previstas en estas Bases o que constituyan caso fortuito o fuerza mayor lo justifiquen, el Organizador podrá suspender, cancelar o modificar el Sorteo y/o la entrega de Obsequios, supuestos en los cuales los Participantes no tendrán derecho a reclamo alguno.</p>
            <p><span className="text-rf-dorado/80">9.4.</span> El Organizador, sus socios, directivos y/o accionistas no serán responsables por los daños y perjuicios derivados directa o indirectamente del uso del sitio y/o aplicación, y que puedan deberse a la presencia de virus o a la presencia de otros elementos lesivos en los contenidos del Sitio donde se ingresa la información, que puedan producir alteración en los sistemas informáticos así como en documentos o sistemas almacenados.</p>
            <p><span className="text-rf-dorado/80">9.5.</span> MFK se reserva el derecho de modificar y/o actualizar estos términos y condiciones periódicamente.</p>
          </div>

          {/* 10 */}
          <div className="space-y-1.5">
            <p className="font-display text-rf-dorado text-xs uppercase tracking-wide">10. Fraude y Manipulación.</p>
            <p>El Organizador se reserva el derecho de descalificar a cualquier participante que utilice &quot;bots&quot;, software de participación masiva o perfiles sospechosos. La decisión del Organizador es inapelable.</p>
          </div>

          {/* 11 */}
          <div className="space-y-1.5">
            <p className="font-display text-rf-dorado text-xs uppercase tracking-wide">11. Jurisdicción y Ley Aplicable.</p>
            <p>Se aplica la ley argentina. Para cualquier controversia, las partes se someten a la jurisdicción de los Tribunales Ordinarios de la Ciudad Autónoma de Buenos Aires, renunciando a cualquier otro fuero o jurisdicción.</p>
          </div>
        </div>

        {/* Pie */}
        <div className="mt-5 pt-4 border-t border-rf-dorado/10">
          <button
            onClick={onClose}
            className="w-full py-3 rounded-xl font-display uppercase tracking-widest text-sm bg-gradient-dorado text-rf-negro hover:opacity-90 active:scale-[0.98] transition-all"
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  )
}
