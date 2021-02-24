import React from 'react';
import Layout from "../components/Layout";
import utilsStyles from '../styles/Utils.module.css';
import Footer from "../components/Footer";
const Aviso = (props) => {
    return (
        <Layout router={props.router} user={props.user} utils={props.utils} setUser={props.setUser}>
            <div className={`${utilsStyles.sectionContainer} legalidad aviso`}>
                <div className={utilsStyles.centeredContainer} style={{display:'block'}}>
                    <div className={utilsStyles.sectionTitle}>
                        AVISO LEGAL
                    </div>
                    <p>El sitio web (www.academiaformaciondeportiva.com) (en adelante, el “Sitio Web”) es propiedad de Academia de Formación CASOR SC (en adelante, la “EMPRESA”), con domicilio social en Calle Caulina, 2 Guadalcacin (Jerez de la Frontera) Cádiz 11591 y CIF J11977857.

                        La EMPRESA  le da la bienvenida y le invita a leer atentamente las Condiciones Generales de Uso de este Sito Web (en adelante, las “Condiciones Generales de Uso”) que describen los términos y condiciones que serán aplicables a su navegación por el mismo, de conformidad con lo establecido en la normativa española de aplicación. Dado que la EMPRESApodría modificar en el futuro estas Condiciones de Uso, le recomendamos que las visite periódicamente para estar debidamente informado de los cambios realizados.

                        Con el ánimo de que el uso del Sitio Web se ajuste a criterios de transparencia, claridad y sencillez, la EMPRESA informa al Usuario que cualquier sugerencia, duda o consulta sobre las Condiciones Generales de Uso será recibida y solucionada contactando con la EMPRESA a través del correo electrónico: info@academiaformaciondeportiva.com.
                    </p>
                    <p><b>1.Objeto</b><br/>
                        La EMPRESA suministra el contenido y los servicios que están disponibles en el Sitio Web, con sujeción a las presentes Condiciones Generales de Uso así como a la política sobre tratamiento de datos personales (en adelante, la “Política de Protección de Datos”). El acceso a este Sitio Web o su utilización en cualquier forma le otorga la calificación de “Usuario” e implica la aceptación sin reservas de todas y cada una de las presentes Condiciones Generales de Uso, reservándose la EMPRESA el derecho a modificarlos en cualquier momento. En consecuencia, será responsabilidad de todo Usuario, la atenta lectura de las Condiciones Generales de Uso vigente en cada una de las ocasiones en que acceda a este Sitio Web, por lo que si éste no está de acuerdo con cualquiera de los mismos aquí dispuestos, deberá abstenerse respecto al uso del presente Sitio Web.

                        Asimismo, queda advertido de que, en ocasiones, se podrán establecer condiciones particulares para la utilización en el Sitio Web de contenidos y/o servicios específicos, la utilización de dichos contenidos o servicios implicará la aceptación de las condiciones particulares en ellos especificadas.
                    </p>

                    <p>
                        <b>2. Servicios</b><br/>
                        A través del Sitio Web, la EMPRESA ofrece a los Usuarios la posibilidad de acceder a: Información sobre la empresa, sus datos de contacto, sus productos y servicios, sus tarifas, sus ofertas comerciales, su ubicación – Un apartado de contacto para realizar consultas facilitando sus datos de carácter personal – Links para acceder a redes sociales (en adelante los “Servicios”)
                    </p>
                    <p>
                        <b>3. Privacidad y Tratamiento de Datos</b><br/>
                        La EMPRESA trata sus datos de carácter personal según los establecido en el Reglamento (UE) 2016/679 del Parlamento Europeo y del Consejo, de 27 de abril de 2016, relativo a la protección de las personas físicas en lo que respecta al tratamiento de datos personales y a la libre circulación de estos datos y la Ley Orgánica 3/2018 de 5 de diciembre, de Protección de Datos Personales y garantía de los derechos digitales. La información sobre sus datos de carácter personal, según la citada normativa, puede consultarla en este <a href={'https://www.boe.es/buscar/act.php?id=BOE-A-2018-16673'}>link</a>.
                    </p>
                    <p>
                        <b >4. Propiedad Industrial e Intelectual</b><br/>
                        El Usuario reconoce y acepta que todos los contenidos que se muestran en el Sitio Web y en especial, diseños, textos, imágenes, logos, iconos, botones, software, nombres comerciales, marcas, o cualesquiera otros signos susceptibles de utilización industrial y/o comercial están sujetos a derechos de Propiedad Intelectual y todas las marcas, nombres comerciales o signos distintivos, todos los derechos de propiedad industrial e intelectual, sobre los contenidos y/o cualesquiera otros elementos insertados en el página, que son propiedad exclusiva de la EMPRESA  y/o de terceros, quienes tienen el derecho exclusivo de utilizarlos en el tráfico económico. Por todo ello el Usuario se compromete a no reproducir, copiar, distribuir, poner a disposición o de cualquier otra forma comunicar públicamente, transformar o modificar tales contenidos manteniendo indemne a  la EMPRESA de cualquier reclamación que se derive del incumplimiento de tales obligaciones. En ningún caso el acceso al Sitio Web implica ningún tipo de renuncia, transmisión, licencia o cesión total ni parcial de dichos derechos, salvo que se establezca expresamente lo contrario. Las presentes Condiciones Generales de Uso del Sitio Web no confieren a los Usuarios ningún otro derecho de utilización, alteración, explotación, reproducción, distribución o comunicación pública del Sitio Web y/o de sus Contenidos distintos de los aquí expresamente previstos. Cualquier otro uso o explotación de cualesquiera derechos estará sujeto a la previa y expresa autorización específicamente otorgada a tal efecto por la EMPRESA o el tercero titular de los derechos afectados.

                        Los contenidos, textos, fotografías, diseños, logotipos, imágenes, programas de ordenador, códigos fuente y, en general, cualquier creación intelectual existente en este sitio, así como el propio sitio en su conjunto, como obra artística multimedia, están protegidos como derechos de autor por la legislación en materia de propiedad intelectual. La EMPRESA es titular de los elementos que integran el diseño gráfico del Sitio Web, lo menús, botones de navegación, el código HTML, los textos, imágenes, texturas, gráficos y cualquier otro contenido del Sitio Web o, en cualquier caso dispone de la correspondiente autorización para la utilización de dichos elementos. El contenido dispuesto en el Sitio Web no podrá ser reproducido ni en todo ni en parte, ni transmitido, ni registrado por ningún sistema de recuperación de información, en ninguna forma ni en ningún medio, a menos que se cuente con la autorización previa, por escrito, de la citada Entidad.

                        Asimismo queda prohibido suprimir, eludir y/o manipular el "copyright" así como los dispositivos técnicos de protección, o cualesquiera mecanismos de información que pudieren contener los contenidos. El Usuario de este Sitio Web se compromete a respetar los derechos enunciados y a evitar cualquier actuación que pudiera perjudicarlos, reservándose en todo caso la EMPRESA el ejercicio de cuantos medios o acciones legales le correspondan en defensa de sus legítimos derechos de propiedad intelectual e industrial.
                    </p><p>
                    <b>5. Obligaciones y Responsabilidades del Usuario del Sitio Web</b><br/>
                    El Usuario se compromete a:

                    Hacer un uso adecuado y lícito del Sitio Web así como de los contenidos y servicios, de conformidad con: (i) la legislación aplicable en cada momento; (ii) las Condiciones Generales de Uso del Sitio Web; (iii) la moral y buenas costumbres generalmente aceptadas y (iv) el orden público.
                    Proveerse de todos los medios y requerimientos técnicos que se precisen para acceder al Sitio Web.
                    Facilitar información veraz al cumplimentar con sus datos de carácter personal los formularios contenidos en el Sitio Web y a mantenerlos actualizados en todo momento de forma que responda, en cada momento, a la situación real del Usuario. El Usuario será el único responsable de las manifestaciones falsas o inexactas que realice y de los perjuicios que cause a la EMPRESA  o a terceros por la información que facilite.

                    No obstante lo establecido en el apartado anterior el Usuario deberá asimismo abstenerse de:

                    a) Hacer un uso no autorizado o fraudulento del Sitio Web y/o de los contenidos con fines o efectos ilícitos, prohibidos en las presentes Condiciones Generales de Uso, lesivos de los derechos e intereses de terceros, o que de cualquier forma puedan dañar, inutilizar, sobrecargar, deteriorar o impedir la normal utilización de los servicios o los documentos, archivos y toda clase de contenidos almacenados en cualquier equipo informático.
                    <br/>b) Acceder o intentar acceder a recursos o áreas restringidas del Sitio Web, sin cumplir las condiciones exigidas para dicho acceso.
                    <br/>c) Provocar daños en los sistemas físicos o lógicos del Sitio Web, de sus proveedores o de terceros.
                    <br/>d) Introducir o difundir en la red virus informáticos o cualesquiera otros sistemas físicos o lógicos que sean susceptibles de provocar daños en los sistemas físicos o lógicos de la EMPRESA, de sus proveedores o de terceros.
                    <br/>e) Intentar acceder, utilizar y/o manipular los datos de la EMPRESA, terceros proveedores y otros Usuarios.
                    <br/>f) Reproducir o copiar, distribuir, permitir el acceso del público a través de cualquier modalidad de comunicación pública, transformar o modificar los contenidos, a menos que se cuente con la autorización del titular de los correspondientes derechos o ello resulte legalmente permitido.
                    <br/>g) Suprimir, ocultar o manipular las notas sobre derechos de propiedad intelectual o industrial y demás datos identificativos de los derechos de la EMPRESA o de terceros incorporados a los contenidos, así como los dispositivos técnicos de protección o cualesquiera mecanismos de información que puedan insertarse en los contenidos.
                    <br/>h) Obtener e intentar obtener los contenidos empleando para ello medios o procedimientos distintos de los que, según los casos, se hayan puesto a su disposición a este efecto o se hayan indicado expresamente en las páginas web donde se encuentren los contenidos o, en general, de los que se empleen habitualmente en Internet por no entrañar un riesgo de daño o inutilización del sitio web y/o de los contenidos.
                    <br/>i) En particular, y a título meramente indicativo y no exhaustivo, el Usuario se compromete a no transmitir, difundir o poner a disposición de terceros informaciones, datos, contenidos, mensajes, gráficos, dibujos, archivos de sonido y/o imagen, fotografías, grabaciones, software y, en general, cualquier clase de material que:
                    <br/>(i) De cualquier forma sea contrario, menosprecie o atente contra los derechos fundamentales y las libertades públicas reconocidas constitucionalmente, en los Tratados Internacionales y en el resto de la legislación vigente.
                    <br/>(ii) Induzca, incite o promueva actuaciones delictivas, denigratorias, difamatorias, violentas o, en general, contrarias a la ley, a la moral, a las buenas costumbres generalmente aceptadas o al orden público.
                    <br/>(iii) Induzca, incite o promueva actuaciones, actitudes o pensamientos discriminatorios por razón de sexo, raza, religión, creencias, edad o condición.
                    <br/>(iv) Incorpore, ponga a disposición o permita acceder a productos, elementos, mensajes y/o servicios delictivos, violentos, ofensivos, nocivos, degradantes o, en general, contrarios a la ley, a la moral y a las buenas costumbres generalmente aceptadas o al orden público.
                    <br/>(v) Induzca o pueda inducir a un estado inaceptable de ansiedad o temor.
                    <br/>(vi) Induzca o incite a involucrarse en prácticas peligrosas, de riesgo o nocivas para la salud y el equilibrio psíquico.
                    <br/>(vii) Se encuentra protegido por la legislación en materia de protección intelectual o industrial perteneciente a la EMPRESA o a terceros sin que haya sido autorizado el uso que se pretenda realizar.
                    <br/>(viii) Sea contrario al honor, a la intimidad personal y familiar o a la propia imagen de las personas.
                    <br/>(ix) Constituya cualquier tipo de publicidad.
                    <br/>(x) Incluya cualquier tipo de virus o programa que impida el normal funcionamiento del Sitio Web.

                    <br/>Si para acceder a algunos de los servicios y/o contenidos del Sitio Web, se le proporcionara una contraseña, se obliga a usarla de manera diligente, manteniéndola en todo momento en secreto. En consecuencia, será responsable de su adecuada custodia y confidencialidad, comprometiéndose a no cederla a terceros, de manera temporal o permanente, ni a permitir el acceso a los mencionados servicios y/o contenidos por parte de personas ajenas. Igualmente, se obliga a notificar a la EMPRESA cualquier hecho que pueda suponer un uso indebido de su contraseña, como, a título enunciativo, su robo, extravío o el acceso no autorizado, con el fin de proceder a su inmediata cancelación. En consecuencia, mientras no efectúe la notificación anterior, la EMPRESA quedará eximida de cualquier responsabilidad que pudiera derivarse del uso indebido de su contraseña, siendo de su responsabilidad cualquier utilización ilícita de los contenidos y/o servicios del Sitio Web por cualquier tercero ilegítimo.

                    Si de manera negligente o dolosa incumpliera cualquiera de las obligaciones establecidas en las presentes Condiciones Generales de Uso, responderá por todos los daños y perjuicios que de dicho incumplimiento pudieran derivarse para la EMPRESA.
                </p><p>
                    <b>6. Responsabilidades</b><br/>
                    La EMPRESA no garantiza el acceso continuado, ni la correcta visualización, descarga o utilidad de los elementos e informaciones contenidas en las páginas del sitio Web, que pueden verse impedidos, dificultados o interrumpidos por factores o circunstancias que están fuera de su control.

                    La EMPRESA no se hace responsable de las decisiones que pudieran adoptarse como consecuencia del acceso a los contenidos o informaciones ofrecidas.

                    La EMPRESA podrá interrumpir el servicio o resolver de modo inmediato la relación con el Usuario si detecta que un uso de su Sitio Web o de cualquiera de los servicios ofertados en el mismo son contrarios a las presentes Condiciones Generales de Uso. La EMPRESA  no se hace responsable por daños, perjuicios, pérdidas, reclamaciones o gastos derivados del uso del Sitio Web. Únicamente será responsable de eliminar, lo antes posible, los contenidos que puedan generar tales perjuicios, siempre que así se notifique. En especial no será responsable de los perjuicios que se pudieran derivar, entre otros, de:
                    (i) interferencias, interrupciones, fallos, omisiones, averías telefónicas, retrasos, bloqueos o desconexiones en el funcionamiento del sistema electrónico, motivadas por deficiencias, sobrecargas y errores en las líneas y redes de telecomunicaciones, o por cualquier otra causa ajena al control de la EMPRESA.
                    (ii) intromisiones ilegítimas mediante el uso de programas malignos de cualquier tipo y a través de cualquier medio de comunicación, tales como virus informáticos o cualesquiera otros.
                    (iii) abuso indebido o inadecuado del Sitio Web.
                    (iv) errores de seguridad o navegación producidos por un mal funcionamiento del navegador o por el uso de versiones no actualizadas del mismo. Los administradores de la EMPRESA se reservan el derecho de retirar, total o parcialmente, cualquier contenido o información presente en el Sitio Web.
                    perjuicios por un uso ilícito o incorrecto de dichos servicios, podrá ser el Usuario reclamado por la EMPRESA
                    La EMPRESA  excluye cualquier responsabilidad por los daños y perjuicios de toda naturaleza que pudieran deberse a la mala utilización de los servicios de libre disposición y uso por parte de los Usuarios de Sitio Web. Asimismo, la EMPRESA queda exonerado de cualquier responsabilidad por el contenido e informaciones que puedan ser recibidas como consecuencia de los formularios de recogida de datos, estando los mismos únicamente para la prestación de los servicios de consultas y dudas. Por otro lado, en caso de causar daños y  de los daños o perjuicios causados.

                    Usted defenderá, indemnizará y mantendrá a la EMPRESA indemne frente a cualesquiera daños y perjuicios que se deriven de reclamaciones, acciones o demandas de terceros como consecuencia de su acceso o uso del Sitio Web. Asimismo, usted se obliga a indemnizar a la EMPRESA frente a cualesquiera daños y perjuicios, que se deriven del uso por su parte de “robots”, “spiders”, “crawlers” o herramientas similares empleadas con el fin de recabar o extraer datos o de cualquier otra actuación por su parte que imponga una carga irrazonable sobre el funcionamiento del Sitio Web.
                </p>   <p>
                    <b >7.Hipervínculos</b><br/>
                    El Usuario se obliga a no reproducir de ningún modo, ni siquiera mediante un hiperenlace o hipervínculo, el Sitio Web de la EMPRESA, así como ninguno de sus contenidos, salvo autorización expresa y por escrito de la EMPRESA.

                    El Sitio Web de la EMPRESA incluye enlaces a otras sitios web gestionados por terceros, con objeto de facilitar el acceso del Usuario a la información de empresas colaboradoras y/o patrocinadoras. Conforme con ello, la EMPRESA  no se responsabiliza del contenido de dichos sitios web, ni se sitúa en una posición de garante ni/o de parte ofertante de los servicios y/o información que se puedan ofrecer a terceros a través de los enlaces de terceros.

                    Se concede al Usuario un derecho limitado, revocable y no exclusivo a crear enlaces a la página principal del Sitio Web exclusivamente para uso privado y no comercial. Los sitios web que incluyan enlace a nuestro Sitio Web (i) no podrán dar a entender que la EMPRESA recomienda ese sitio web o sus servicios o productos; (ii) no podrán falsear su relación con la EMPRESA  ni afirmar que la EMPRESA  ha autorizado tal enlace, ni incluir marcas, denominaciones, nombres comerciales, logotipos u otros signos distintivos de la EMPRESA; (iii) no podrán incluir contenidos que puedan considerarse de mal gusto, obscenos, ofensivos, controvertidos, que inciten a la violencia o la discriminación por razón de sexo, raza o religión, contrarios al orden público o ilícitos; (iv) no podrán enlazar a ninguna página del Sitio Web distinta de la página principal; (v) deberá enlazar con la propia dirección del Sitio Web, sin permitir que el sitio web que realice el enlace reproduzca el Sitio Web como parte de su web o dentro de uno de sus “frames” o crear un “browser” sobre cualquiera de las páginas del Sitio Web. La EMPRESA podrá solicitar, en cualquier momento, que elimine cualquier enlace al Sitio Web, después de lo cual deberá proceder de inmediato a su eliminación. La EMPRESA  no puede controlar la información, contenidos, productos o servicios facilitados por otros sitios web que tengan establecidos enlaces con destino al Sitio Web.

                    En consecuencia, la EMPRESA  no asume ningún tipo de responsabilidad por cualquier aspecto relativo a tales sitios web.
                </p>
                    <b >8. Cookies</b><br/>

                    Puede usted consultar la información sobre cookies accediendo a este <a href={'http://www.interior.gob.es/politica-de-cookies'}>LINK</a>





                    <p>
                        <b >9. Duración y terminación</b><br/>
                        La prestación del servicio del presente Sitio Web y los demás servicios tienen en principio una duración indefinida. No obstante, la EMPRESA podrá dar por terminada o suspender cualquiera de los servicios del portal. Cuando sea ello posible, la EMPRESA anunciará la terminación o suspensión de la prestación del servicio determinado.
                    </p><p>
                    <b > 10. Declaraciones y Garantías</b><br/>
                    En general, los contenidos y servicios ofrecidos en el Sitio Web tienen carácter meramente informativo. Por consiguiente, al ofrecerlos, la EMPRESA no otorga garantía ni declaración alguna en relación con los contenidos y servicios ofrecidos en el Sitio web, incluyendo, a título enunciativo, garantías de licitud, fiabilidad, utilidad, veracidad, exactitud, o comerciabilidad, salvo en la medida en que por ley no puedan excluirse tales declaraciones y garantías.
                </p><p>
                    <b> 11. Fuerza mayor</b><br/>
                    La EMPRESA  no será responsable en todo en caso de imposibilidad de prestar servicio, si ésta se debe a interrupciones prolongadas del suministro eléctrico, líneas de telecomunicaciones, conflictos sociales, huelgas, rebelión, explosiones, inundaciones, actos y omisiones del Gobierno, y en general todos los supuestos de fuerza mayor o de caso fortuito.
                </p><p>
                    <b >12. Resolución de controversias. Ley aplicable y jurisdicción</b><br/>
                    Las presentes Condiciones Generales de Uso, así como el uso del Sitio Web, se regirán por la legislación española. Cualquier controversia será resuelta ante los tribunales de Córdoba.

                    En el supuesto de que cualquier estipulación de las presentes Condiciones Generales de Uso resultara inexigible o nula en virtud de la legislación aplicable o como consecuencia de una resolución judicial o administrativa, dicha inexigibilidad o nulidad no hará que las presentes Condiciones Generales de Uso resulten inexigibles o nulas en su conjunto. En dichos casos, la EMPRESA procederá a la modificación o sustitución de dicha estipulación por otra que sea válida y exigible y que, en la medida de lo posible, consiga el objetivo y pretensión reflejados en la estipulación original.
                </p>
                </div>
            </div>
            <Footer/>
        </Layout>

    )
}

export default Aviso;
