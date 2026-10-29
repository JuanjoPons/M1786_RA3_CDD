import { SessionBlock } from '../types/course';

export const COURSE_META = {
  day: 1786,
  code: "MPCDPD (1786)",
  title: "Competencia digital para la práctica docente",
  subtitle: "MPCDPD (1786) · RA3 · Integración de las tecnologías digitales en el proceso de enseñanza-aprendizaje · 5 sesiones de 1 hora",
  short: "CDPD RA3",
  ud: "RA3",
  udTitle: "Integración de las tecnologías digitales en el proceso de enseñanza-aprendizaje"
};

export const SESSIONS_DATA: SessionBlock[] = [
  {
    id: "S9",
    ud: "RA3",
    title: "El modelo TPACK: tecnología, pedagogía y contenido",
    meta: { ra_fp: "RA3" },
    cover: {
      signs: [
        ["info", "screen", "TK · Conocimiento tecnológico"],
        ["info", "learn", "PK · Conocimiento pedagógico"],
        ["info", "book", "CK · Conocimiento del contenido"],
        ["safe", "target", "TPACK: decisión pedagógica fundamentada"]
      ],
      lead: "¿Qué tecnología concreta debo emplear, en qué momento, y de qué manera, para enseñar mejor un contenido determinado a un grupo de alumnado específico?"
    },
    sections: [
      {
        num: 0,
        kind: "intro",
        title: "Integración de las tecnologías digitales en el proceso de enseñanza-aprendizaje",
        nodes: [
          {
            t: "p",
            x: "Una vez asentadas las bases conceptuales de la competencia digital docente y desarrolladas las estrategias para la búsqueda, selección y curación de contenidos digitales, este tercer capítulo aborda el modo en que las tecnologías digitales se integran de forma efectiva en el desarrollo cotidiano del proceso de enseñanza-aprendizaje. No basta con disponer de buenos materiales digitales si el docente no es capaz de articularlos pedagógicamente dentro de una planificación coherente, de emplear con soltura los recursos tecnológicos disponibles en su centro, de acompañar al alumnado a lo largo de su proceso de aprendizaje mediante estas tecnologías, y de fomentar en él estrategias de trabajo autónomo y colaborativo mediadas por herramientas digitales. A estos cuatro aspectos se dedican, respectivamente, los epígrafes que componen este capítulo."
          },
          {
            t: "viz",
            v: {
              type: "cards",
              num: true,
              title: "Los cuatro aspectos que desarrolla el capítulo",
              items: [
                { i: "doc", s: "info", x: "Articular los materiales en una planificación coherente", d: "Integración sistemática orientada a metas formativas claras." },
                { i: "laptop", s: "info", x: "Emplear con soltura los recursos tecnológicos del centro", d: "Conocimiento de equipamiento, redes y alternativas ante imprevistos." },
                { i: "handshake", s: "info", x: "Acompañar al alumnado mediante estas tecnologías", d: "Canales de soporte continuo, tutoría y retroalimentación personalizada." },
                { i: "group", s: "info", x: "Fomentar el trabajo autónomo y colaborativo", d: "Herramientas de co-creación y estrategias de autorregulación metacognitiva." }
              ]
            }
          }
        ],
        acts: []
      },
      {
        num: 1,
        kind: "theory",
        title: "El modelo TPACK: tecnología, pedagogía y contenido",
        nodes: [
          {
            t: "p",
            x: "Cuando un docente se plantea cómo incorporar una herramienta digital a su práctica, suele enfrentarse a una pregunta que, aunque parezca sencilla, resulta en realidad compleja: ¿qué tecnología concreta debo emplear, en qué momento, y de qué manera, para enseñar mejor un contenido determinado a un grupo de alumnado específico? Para responder a esta pregunta de forma sistemática resulta de gran utilidad el modelo conocido como TPACK, acrónimo del inglés Technological Pedagogical Content Knowledge, es decir, Conocimiento Tecnológico Pedagógico del Contenido."
          },
          {
            t: "p",
            x: "El modelo TPACK parte de la idea de que la enseñanza eficaz mediada por tecnología no depende de un único tipo de conocimiento, sino de la interacción dinámica entre tres ámbitos de conocimiento docente. El primero de ellos es el conocimiento tecnológico, identificado habitualmente por sus siglas en inglés como TK, que hace referencia al dominio que el docente posee sobre las herramientas, aplicaciones y plataformas digitales disponibles, así como a su capacidad para aprender y adaptarse a nuevas tecnologías conforme estas surgen. El segundo ámbito es el conocimiento pedagógico, o PK, que engloba el saber del docente sobre los procesos y métodos de enseñanza y aprendizaje, las estrategias de gestión del aula, la evaluación o la atención a la diversidad, con independencia de la materia concreta que se imparta. El tercer ámbito es el conocimiento del contenido, o CK, referido al dominio experto que el docente posee sobre la materia o familia profesional que enseña."
          },
          {
            t: "viz",
            v: {
              type: "tri",
              title: "Los tres ámbitos de conocimiento docente",
              top: { i: "screen", s: "info", x: "TK · Conocimiento tecnológico", d: "Herramientas, aplicaciones y plataformas; capacidad de adaptarse a nuevas tecnologías." },
              left: { i: "learn", s: "info", x: "PK · Conocimiento pedagógico", d: "Métodos de enseñanza, gestión del aula, evaluación, atención a la diversidad." },
              right: { i: "book", s: "info", x: "CK · Conocimiento del contenido", d: "Dominio experto de la materia o familia profesional." },
              center: "TPACK"
            }
          },
          {
            t: "p",
            x: "El valor del modelo TPACK no reside únicamente en la identificación de estos tres ámbitos por separado, sino, sobre todo, en el análisis de sus intersecciones. De la combinación entre conocimiento pedagógico y conocimiento del contenido surge el conocimiento pedagógico del contenido (PCK), es decir, el saber sobre cómo enseñar una materia concreta de la forma más eficaz posible. De la combinación entre conocimiento tecnológico y conocimiento del contenido surge el conocimiento tecnológico del contenido (TCK), referido a cómo la tecnología puede representar o transformar un contenido concreto (como simulaciones). De la combinación entre conocimiento tecnológico y conocimiento pedagógico surge el conocimiento tecnológico pedagógico (TPK), relativo a cómo determinadas herramientas favorecen estrategias didácticas. En el centro se sitúa el TPACK propiamente dicho: la capacidad plena e integrada del docente para tomar decisiones fundamentadas."
          },
          {
            t: "viz",
            v: {
              type: "cards",
              title: "Las intersecciones del modelo",
              items: [
                { i: "learn", s: "info", x: "PK + CK → Conocimiento pedagógico del contenido", d: "Cómo enseñar una materia concreta de la forma más eficaz, con independencia de la tecnología." },
                { i: "layers", s: "info", x: "TK + CK → Conocimiento tecnológico del contenido", d: "Cómo la tecnología representa o transforma un contenido (p. ej., simulaciones interactivas)." },
                { i: "gear", s: "info", x: "TK + PK → Conocimiento tecnológico pedagógico", d: "Cómo las herramientas favorecen o dificultan estrategias didácticas, con independencia de la materia." },
                { i: "target", s: "safe", x: "Centro → TPACK Integrado", d: "Decidir qué tecnología, de qué manera pedagógica y para qué contenido, atendiendo a los tres ámbitos." }
              ]
            }
          },
          {
            t: "viz",
            v: {
              type: "compare",
              title: "Dos errores frecuentes que el modelo TPACK ayuda a evitar",
              cols: [
                {
                  i: "star",
                  s: "ban",
                  x: "Error 1: La tecnología por su novedad",
                  items: [["Herramientas vistosas con escaso valor añadido"], ["Sin valorar si es adecuada al contenido y al grupo"]]
                },
                {
                  i: "xmark",
                  s: "ban",
                  x: "Error 2: Descartarla sistemáticamente",
                  items: [["Por desconocimiento o inseguridad del docente"], ["Priva al alumnado de recursos que enriquecen su aprendizaje"]]
                },
                {
                  i: "target",
                  s: "safe",
                  x: "TPACK: Decisión fundamentada",
                  items: [["Integración creativa, segura y crítica"], ["La tecnología responde a una decisión pedagógica"]]
                }
              ]
            }
          },
          {
            t: "links",
            items: [
              { i: "globe", x: "TPACK.org", d: "Web oficial de referencia del modelo TPACK.", url: "https://tpack.org/" },
              { i: "bolt", x: "PhET · Simulaciones Interactivas", d: "Simulador gratuito de circuitos de la Univ. de Colorado (mencionado en la solución de la Actividad 8).", url: "https://phet.colorado.edu/es/simulations/circuit-construction-kit-dc" }
            ]
          }
        ],
        acts: ["S9-tpack", "S9-vf", "S9-A8", "S9-A8bis"]
      }
    ],
    acts: [
      {
        id: "S9-tpack",
        type: "match",
        time: "8 min",
        title: "Cada conocimiento, su definición",
        instr: "Relaciona cada conocimiento del modelo TPACK con su definición según el epígrafe 1.",
        pairs: [
          { a: "TK · Conocimiento tecnológico", b: "Dominio de herramientas, aplicaciones y plataformas digitales y capacidad de adaptarse a otras nuevas", exp: "Primer ámbito del modelo." },
          { a: "PK · Conocimiento pedagógico", b: "Métodos de enseñanza, gestión del aula, evaluación y atención a la diversidad, sea cual sea la materia", exp: "Segundo ámbito del modelo." },
          { a: "CK · Conocimiento del contenido", b: "Dominio experto de la materia o familia profesional que se enseña", exp: "Tercer ámbito del modelo." },
          { a: "Conocimiento pedagógico del contenido", b: "Cómo enseñar una materia concreta de la forma más eficaz, con independencia de la tecnología", exp: "Intersección PK + CK." },
          { a: "Conocimiento tecnológico del contenido", b: "Cómo la tecnología representa o transforma un contenido, por ejemplo con simulaciones", exp: "Intersección TK + CK." },
          { a: "Conocimiento tecnológico pedagógico", b: "Cómo las herramientas favorecen o dificultan estrategias didácticas, con independencia de la materia", exp: "Intersección TK + PK." },
          { a: "TPACK", b: "Capacidad plena e integrada de decidir qué tecnología, de qué manera pedagógica y para qué contenido", exp: "Centro del modelo." }
        ],
        block: "S9",
        origin: "complementaria",
        ra: "RA3"
      },
      {
        id: "S9-vf",
        type: "tf",
        time: "6 min",
        title: "Verdadero o falso: aplicar TPACK",
        instr: "Determina la veracidad de las siguientes afirmaciones sobre los fundamentos del modelo TPACK.",
        questions: [
          { q: "Según TPACK, la enseñanza eficaz mediada por tecnología depende de un único tipo de conocimiento: el tecnológico.", ans: false, exp: "Depende de la interacción dinámica entre tres ámbitos de conocimiento docente." },
          { q: "El valor del modelo reside sobre todo en el análisis de las intersecciones entre los tres ámbitos.", ans: true, exp: "No reside únicamente en identificarlos por separado, sino en analizar sus intersecciones." },
          { q: "Elegir una herramienta por ser la más novedosa es una buena aplicación del modelo.", ans: false, exp: "Es el primero de los dos errores frecuentes que señala el manual." },
          { q: "Descartar siempre la tecnología por inseguridad del propio docente también es un error.", ans: true, exp: "Es el segundo error: priva al alumnado de recursos que podrían enriquecer su aprendizaje." },
          { q: "Con TPACK, la tecnología empleada responde a una decisión pedagógica y no a la disponibilidad o la moda del momento.", ans: true, exp: "Última frase del epígrafe 1." }
        ],
        block: "S9",
        origin: "complementaria",
        ra: "RA3"
      },
      {
        id: "S9-A8",
        type: "teacher",
        origin: "manual",
        time: "30 min",
        timeManual: "45 minutos",
        kind: "Análisis de caso y aplicación de modelo teórico",
        group: "Individual",
        mode: "Presencial o virtual",
        ce: "a), b)",
        title: "Actividad 8. Mi contenido con el modelo TPACK",
        instr: "Selecciona un contenido concreto de tu familia profesional que consideres especialmente adecuado para ser trabajado con apoyo de tecnologías digitales. Identifica, en primer lugar, tu conocimiento del contenido (CK): qué debe saber el alumnado al finalizar ese aprendizaje. A continuación, señala qué conocimiento pedagógico (PK) aplicarías (ej. ABP, resolución de problemas). Finalmente, propón una tecnología digital concreta que integre ambos conocimientos de forma coherente, justificando por escrito por qué esa tecnología resulta la más adecuada frente a otras alternativas según el modelo TPACK.",
        fields: [
          "Contenido elegido y conocimiento del contenido (CK): qué debe saber el alumnado al finalizar ese aprendizaje.",
          "Conocimiento pedagógico (PK): estrategia didáctica que emplearías con independencia de la tecnología.",
          "Tecnología digital propuesta y justificación (unas quince líneas) frente a otras alternativas, según el modelo TPACK."
        ],
        rubric: ["Extensión orientativa de la justificación: unas quince líneas."],
        solution: [
          "(Ejemplo aplicado a un contenido de electricidad: el cálculo de la intensidad en un circuito según la ley de Ohm):",
          "Conocimiento del contenido (CK): el alumnado debe saber aplicar la fórmula que relaciona intensidad, tensión y resistencia, comprendiendo el significado físico de cada magnitud y su relación en un circuito eléctrico sencillo.",
          "Conocimiento pedagógico (PK): se emplearía una estrategia de resolución de problemas guiada, partiendo de un caso real y progresando desde ejemplos sencillos hacia situaciones de mayor complejidad, favoreciendo que el alumnado deduzca la relación entre magnitudes antes de formalizarla mediante la fórmula.",
          "Tecnología seleccionada: un simulador digital de circuitos eléctricos (como PhET Circuit Construction Kit) que permita al alumnado modificar los valores de tensión y resistencia y observar de forma inmediata el efecto sobre la intensidad resultante.",
          "Justificación: esta tecnología resulta especialmente adecuada frente a otras alternativas porque permite una experimentación segura e inmediata que sería inviable o arriesgada con material eléctrico real en las fases iniciales de aprendizaje, y porque la visualización dinámica del efecto de cada variable refuerza la comprensión conceptual mejor que el cálculo aislado de valores numéricos."
        ],
        block: "S9",
        ra: "RA3"
      },
      {
        id: "S9-A8bis",
        type: "teacher",
        origin: "manual",
        time: "Fuera de sesión (refuerzo)",
        timeManual: "45 minutos",
        kind: "Análisis de caso y aplicación de modelo teórico",
        group: "Individual",
        mode: "Presencial o virtual",
        ce: "a), b)",
        title: "Actividad 8 bis. Otro contenido con el modelo TPACK",
        instr: "Selecciona un contenido concreto de tu familia profesional, distinto al empleado como ejemplo en este capítulo, que consideres especialmente adecuado para ser trabajado con apoyo de tecnologías digitales. Especifica CK, PK y propuesta tecnológica justificada.",
        fields: [
          "Contenido elegido (distinto de la ley de Ohm) y conocimiento del contenido (CK).",
          "Conocimiento pedagógico (PK): estrategia didáctica.",
          "Tecnología digital propuesta y justificación (unas quince líneas)."
        ],
        rubric: ["El manual no incluye solución para esta actividad (actividad abierta)."],
        block: "S9",
        ra: "RA3"
      }
    ]
  },
  {
    id: "S10",
    ud: "RA3",
    title: "Planificación didáctica con recursos digitales",
    meta: { ra_fp: "RA3" },
    cover: {
      signs: [
        ["must", "check", "Comprobar dispositivos y conexión"],
        ["info", "group", "Alumnado, contexto y modalidad"],
        ["info", "calendar", "Momento y finalidad de cada recurso"],
        ["safe", "cycle", "Alternativa ante imprevistos"]
      ],
      lead: "La integración de las tecnologías digitales en el aula no puede depender de la improvisación."
    },
    sections: [
      {
        num: 2,
        kind: "theory",
        title: "Planificación didáctica con recursos digitales",
        nodes: [
          {
            t: "p",
            x: "La integración de las tecnologías digitales en el aula no puede depender de la improvisación, sino que debe formar parte de una planificación didáctica cuidadosamente diseñada. Esta planificación exige, en primer lugar, un conocimiento preciso de los dispositivos, recursos y servicios tecnológicos disponibles en el centro educativo, así como la capacidad de revisar su funcionamiento con anticipación suficiente y de resolver, en la medida de lo posible, los problemas técnicos que puedan surgir durante el desarrollo de la sesión formativa."
          },
          {
            t: "viz",
            v: {
              type: "key",
              big: "Sin comprobación previa",
              x: "Un simple contratiempo técnico puede echar por tierra el desarrollo previsto de la sesión y dar una imagen de escasa competencia digital ante el alumnado.",
              src: "Manual, epígrafe 2"
            }
          },
          {
            t: "p",
            x: "Junto a esta previsión técnica, la planificación didáctica exige el empleo autónomo de los recursos digitales disponibles en el centro, seleccionándolos en función de tres variables fundamentales: las características del alumnado destinatario, el contexto educativo concreto en que se desarrolla la acción formativa, y la modalidad de enseñanza empleada (presencial, semipresencial o virtual)."
          },
          {
            t: "viz",
            v: {
              type: "tri",
              title: "Tres variables para seleccionar los recursos",
              top: { i: "group", s: "info", x: "Características del alumnado", d: "Poca experiencia: introducción pausada y guiada. Más destreza: tareas autónomas desde el inicio." },
              left: { i: "building", s: "info", x: "Contexto educativo", d: "Aula de informática, taller con pocos dispositivos o entorno completamente virtual." },
              right: { i: "laptop", s: "info", x: "Modalidad de enseñanza", d: "Presencial (control directo), semipresencial (híbrido) o virtual (guías detalladas)." },
              center: "Recursos pertinentes"
            }
          },
          {
            t: "viz",
            v: {
              type: "steps",
              title: "Qué debe prever la planificación para cada recurso",
              items: [
                { i: "clock", s: "must", x: "En qué momento de la sesión se empleará" },
                { i: "target", s: "must", x: "Con qué finalidad concreta" },
                { i: "doc", s: "must", x: "Qué instrucciones se darán al alumnado para su uso correcto" },
                { i: "cycle", s: "safe", x: "Qué alternativa se aplicará si surge un problema técnico" }
              ]
            }
          }
        ],
        acts: ["S10-mod", "S10-A9"]
      }
    ],
    acts: [
      {
        id: "S10-mod",
        type: "classify",
        time: "7 min",
        title: "¿Qué variable condiciona la planificación?",
        instr: "Clasifica cada situación según la variable del epígrafe 2 que más condiciona la elección de recursos.",
        cats: ["Características del alumnado", "Contexto educativo", "Modalidad de enseñanza"],
        items: [
          { x: "El grupo tiene escasa experiencia previa con tecnologías digitales.", c: 0, exp: "Requerirá una introducción más pausada y guiada a las herramientas." },
          { x: "El grupo tiene mucha destreza digital y puede empezar con tareas complejas.", c: 0, exp: "Puede abordar desde el inicio tareas más autónomas y complejas." },
          { x: "La sesión se imparte en un taller con acceso limitado a dispositivos.", c: 1, exp: "El contexto educativo determina qué planificación resulta viable." },
          { x: "El centro dispone de un aula de informática bien equipada.", c: 1, exp: "Es uno de los contextos educativos que cita el manual." },
          { x: "La acción formativa es totalmente virtual y el docente no está presente físicamente.", c: 2, exp: "La modalidad virtual exige instrucciones claras, materiales estructurados y canales ágiles." },
          { x: "Se alternan momentos de uso guiado con periodos de trabajo autónomo.", c: 2, exp: "Es lo propio de la modalidad semipresencial." }
        ],
        block: "S10",
        origin: "complementaria",
        ra: "RA3"
      },
      {
        id: "S10-A9",
        type: "teacher",
        origin: "manual",
        time: "38 min",
        timeManual: "1 hora",
        kind: "Caso práctico de planificación",
        group: "Individual",
        mode: "Presencial o virtual",
        ce: "c), d)",
        title: "Actividad 9. Planifico una sesión con dos recursos digitales",
        instr: "Diseña una breve planificación, de una sesión formativa de aproximadamente una hora de duración, sobre un contenido de tu familia profesional, en la que integres de forma justificada al menos dos recursos digitales distintos. Para cada recurso, especifica momento, comprobaciones técnicas y alternativa.",
        grid: {
          cols: ["Recurso digital", "Momento de la sesión", "Comprobaciones técnicas previas", "Alternativa ante un problema técnico"],
          rows: 3
        },
        fields: ["Contenido de la sesión y justificación de los recursos elegidos."],
        rubric: ["Presenta la planificación en forma de tabla o esquema estructurado, con al menos dos recursos digitales distintos."],
        block: "S10",
        ra: "RA3"
      }
    ]
  },
  {
    id: "S11",
    ud: "RA3",
    title: "Acompañamiento y retroalimentación digital al alumnado",
    meta: { ra_fp: "RA3" },
    cover: {
      signs: [
        ["info", "handshake", "Orientación y apoyo"],
        ["info", "chart", "Recoger información"],
        ["safe", "chat", "Retroalimentación continua"],
        ["info", "group", "Aprendizaje entre iguales"],
        ["must", "lock", "Protección de datos"]
      ],
      lead: "La incorporación de tecnologías digitales no debe limitarse a la transmisión de contenidos, sino extenderse al acompañamiento personalizado."
    },
    sections: [
      {
        num: 3,
        kind: "theory",
        title: "Acompañamiento y retroalimentación digital al alumnado",
        nodes: [
          {
            t: "p",
            x: "La incorporación de tecnologías digitales al proceso formativo no debe limitarse a la transmisión de contenidos, sino que debe extenderse también al acompañamiento personalizado del alumnado a lo largo de su proceso de aprendizaje. Este acompañamiento adquiere una especial relevancia en las modalidades semipresencial y virtual, en las que la distancia física entre docente y alumnado exige articular canales digitales específicos que garanticen una atención efectiva."
          },
          {
            t: "viz",
            v: {
              type: "chain",
              title: "Las cuatro tareas del acompañamiento digital",
              items: [
                { i: "handshake", s: "info", x: "Orientar, apoyar y asistir", d: "Resolución de dudas individuales y colectivas mediante canales oficiales." },
                { i: "chart", s: "info", x: "Recoger información sobre el aprendizaje", d: "Rastreo de interacciones, resultados de tareas y registros en el LMS." },
                { i: "chat", s: "safe", x: "Ofrecer retroalimentación continuada", d: "Comentarios oportunos, específicos y formativos orientados a la mejora." },
                { i: "group", s: "safe", x: "Enseñar estrategias de cooperación", d: "Capacitar al alumnado en la ayuda mutua y el trabajo entre iguales." }
              ]
            }
          },
          {
            t: "viz",
            v: {
              type: "tri",
              title: "Una retroalimentación digital eficaz es…",
              top: { i: "clock", s: "safe", x: "Oportuna", d: "En un plazo razonable tras la tarea, cuando el aprendizaje aún está fresco." },
              left: { i: "target", s: "safe", x: "Específica", d: "Señala errores y fortalezas concretas, sin comentarios genéricos poco útiles." },
              right: { i: "arrowr", s: "safe", x: "Orientada a la mejora", d: "Indica cómo progresar y qué pasos dar, no solo califica con una nota." },
              center: "Retroalimentación"
            }
          }
        ],
        acts: ["S11-feed", "S11-A10"]
      }
    ],
    acts: [
      {
        id: "S11-feed",
        type: "classify",
        time: "8 min",
        title: "¿Retroalimentación eficaz?",
        instr: "Decide si cada comentario o práctica cumple las características de la retroalimentación digital eficaz del epígrafe 3 (oportuna, específica y orientada a la mejora).",
        cats: ["Cumple las características", "No las cumple"],
        items: [
          { x: "«Buen trabajo.», escrito igual en todas las entregas del grupo.", c: 1, exp: "Es un comentario genérico poco útil: no es específico." },
          { x: "Devolver corregida una tarea un mes después de entregarla, cuando ya se ha cerrado la unidad.", c: 1, exp: "No es oportuna: debe ofrecerse en un plazo razonable tras la tarea." },
          { x: "«En el paso 3 no has comprobado la tensión; revisa el apartado 2 y repite la medición.», dos días después de la entrega.", c: 0, exp: "Es oportuna, específica y orientada a la mejora." },
          { x: "Poner solo la nota numérica, sin ningún comentario.", c: 1, exp: "No proporciona indicaciones para progresar: se limita a valorar el resultado." },
          { x: "Un audio breve por la mensajería institucional con lo que hay que mejorar en la siguiente entrega.", c: 0, exp: "Canal institucional e indicaciones concretas sobre cómo progresar." },
          { x: "Comentar las dificultades de un alumno en un grupo de mensajería personal del profesorado.", c: 1, exp: "La información sobre el progreso debe mantenerse dentro de los cauces institucionales." }
        ],
        block: "S11",
        origin: "complementaria",
        ra: "RA3"
      },
      {
        id: "S11-A10",
        type: "teacher",
        origin: "manual",
        time: "37 min",
        timeManual: "40 minutos",
        kind: "Reflexión y diseño de estrategia de acompañamiento",
        group: "Individual",
        mode: "Presencial o virtual",
        ce: "e), f), g)",
        title: "Actividad 10. Un alumno que se desconecta",
        instr: "Imagina que impartes un módulo en modalidad semipresencial y detectas, a través del entorno virtual de aprendizaje, que un alumno concreto no ha entregado las dos últimas actividades y apenas ha interactuado en el foro del curso durante la última semana. Diseña por escrito tu estrategia de acompañamiento digital.",
        fields: [
          "Canal que emplearías para contactar con el alumno y por qué.",
          "Tono y contenido de tu primer mensaje.",
          "Información previa que consultarías en el entorno virtual antes del contacto.",
          "Retroalimentación y apoyo que le ofrecerías según su respuesta.",
          "Justificación de cada decisión según los principios de acompañamiento digital del epígrafe 3."
        ],
        block: "S11",
        ra: "RA3"
      }
    ]
  },
  {
    id: "S12",
    ud: "RA3",
    title: "Aprendizaje autorregulado y colaborativo en entornos digitales",
    meta: { ra_fp: "RA3" },
    cover: {
      signs: [
        ["info", "edit", "Blogs"],
        ["info", "copy", "Wikis"],
        ["info", "laptop", "Plataformas de aprendizaje"],
        ["safe", "brain", "Metacognición"],
        ["safe", "calendar", "Planificar, registrar y consultar"]
      ],
      lead: "Trabajo colaborativo y aprendizaje autorregulado, lejos de resultar contradictorios, se complementan y refuerzan mutuamente."
    },
    sections: [
      {
        num: 4,
        kind: "theory",
        title: "Aprendizaje autorregulado y colaborativo en entornos digitales",
        nodes: [
          {
            t: "p",
            x: "El último epígrafe de este capítulo se centra en la capacidad de las tecnologías digitales para favorecer, por un lado, el trabajo colaborativo entre el alumnado y, por otro, el desarrollo de estrategias de aprendizaje autónomo y autorregulado, dos dimensiones que, lejos de resultar contradictorias, se complementan y refuerzan mutuamente en los entornos formativos actuales."
          },
          {
            t: "viz",
            v: {
              type: "cards",
              title: "Herramientas de aprendizaje colaborativo",
              items: [
                { i: "edit", s: "info", x: "Blogs de aprendizaje", d: "Publicación periódica: el alumnado documenta su proceso y recibe comentarios constructivos." },
                { i: "copy", s: "info", x: "Wikis colaborativas", d: "Construcción conjunta y progresiva de documentos por varios autores con historial de cambios." },
                { i: "laptop", s: "info", x: "Plataformas de gestión (LMS)", d: "Foros temáticos, tareas grupales y espacios de trabajo compartido." }
              ]
            }
          },
          {
            t: "viz",
            v: {
              type: "cycle",
              title: "Habilidades metacognitivas clave",
              center: "Autorregulación",
              items: [
                { i: "calendar", s: "info", x: "Planificar", d: "Definir metas y tiempos" },
                { i: "eye", s: "info", x: "Supervisar", d: "Monitorizar el progreso" },
                { i: "checklist", s: "safe", x: "Evaluar", d: "Revisar los resultados" }
              ]
            }
          },
          {
            t: "viz",
            v: {
              type: "key",
              big: "Sistema digital de planificación, registro y consulta",
              x: "Favorece que el alumnado identifique por sí mismo sus fortalezas, sus dificultades y las estrategias que mejor le funcionan a lo largo de toda su formación.",
              src: "Manual, epígrafe 4"
            }
          }
        ],
        acts: ["S12-tools", "S12-vf", "S12-plan"]
      }
    ],
    acts: [
      {
        id: "S12-tools",
        type: "match",
        time: "8 min",
        title: "Cada herramienta, su aportación",
        instr: "Relaciona cada recurso con lo que aporta según el epígrafe 4.",
        pairs: [
          { a: "Blog", b: "Documentar el propio proceso de aprendizaje y recibir comentarios de los compañeros", exp: "Espacio de publicación periódica." },
          { a: "Wiki", b: "Construir un documento de forma conjunta y progresiva entre varios autores", exp: "Herramienta colaborativa por excelencia." },
          { a: "Plataforma de gestión del aprendizaje", b: "Foros, tareas grupales y espacios de trabajo compartido", exp: "Epígrafe 4." },
          { a: "Agenda digital", b: "Planificar tareas y plazos", exp: "Recurso para la autorregulación." },
          { a: "Grabación de audio o vídeo", b: "Revisar el propio desempeño en una exposición oral o un procedimiento técnico", exp: "Favorece la autoevaluación reflexiva." },
          { a: "Sistema digital de planificación, registro y consulta", b: "Visión organizada y actualizada del propio progreso a lo largo de la acción formativa", exp: "Registra tareas, calificaciones y retroalimentación." }
        ],
        block: "S12",
        origin: "complementaria",
        ra: "RA3"
      },
      {
        id: "S12-vf",
        type: "tf",
        time: "6 min",
        title: "Verdadero o falso: autonomía y colaboración",
        instr: "Determina si las siguientes afirmaciones sobre autorregulación y colaboración son verdaderas o falsas.",
        questions: [
          { q: "El trabajo colaborativo y el aprendizaje autorregulado son dimensiones contradictorias.", ans: false, exp: "Se complementan y refuerzan mutuamente." },
          { q: "Las habilidades metacognitivas son la capacidad de planificar, supervisar y evaluar el propio aprendizaje.", ans: true, exp: "Definición del epígrafe 4." },
          { q: "El sistema de registro del aprendizaje solo puede estar dentro del entorno virtual del centro.", ans: false, exp: "También puede ser una herramienta sencilla de planificación personal que gestiona el alumnado." },
          { q: "La competencia metacognitiva trasciende el contenido concreto de cualquier módulo formativo.", ans: true, exp: "Así lo afirma el último párrafo del epígrafe 4." }
        ],
        block: "S12",
        origin: "complementaria",
        ra: "RA3"
      },
      {
        id: "S12-plan",
        type: "teacher",
        origin: "complementaria",
        time: "26 min",
        title: "Diseño mi sistema de registro del aprendizaje",
        instr: "A partir del epígrafe 4, diseña cómo organizarías, para tu futuro alumnado, una actividad colaborativa digital y un sistema digital de planificación, registro y consulta del aprendizaje.",
        fields: [
          "Actividad colaborativa: herramienta (blog, wiki o plataforma) y qué aportaría frente al trabajo en papel.",
          "Recurso de autorregulación que propondrías (agenda, planificador o grabación) y para qué tarea.",
          "Qué registraría el alumnado en su sistema de planificación, registro y consulta (tareas, calificaciones, retroalimentación…) y dónde.",
          "Cómo ayudaría ese sistema a que el alumnado reflexione sobre sus fortalezas y dificultades."
        ],
        block: "S12",
        ra: "RA3"
      }
    ]
  },
  {
    id: "S13",
    ud: "RA3",
    title: "Moodle con apoyo de Genially y evaluación final del RA3",
    meta: { ra_fp: "RA3" },
    cover: {
      signs: [
        ["info", "laptop", "Moodle: curso en bloques o temas"],
        ["info", "layers", "Genially: contenidos interactivos"],
        ["safe", "chart", "Informes de actividad"],
        ["must", "checklist", "Evaluación final del RA3"]
      ],
      lead: "Permite transformar una programación didáctica lineal en un itinerario modular, donde el alumnado avanza a su propio ritmo."
    },
    sections: [
      {
        num: 5,
        kind: "theory",
        title: "Moodle (con apoyo de Genially)",
        nodes: [
          {
            t: "p",
            x: "Moodle es un entorno virtual de aprendizaje que permite estructurar un curso completo en bloques o temas, dentro de los cuales se insertan recursos (documentos, enlaces, vídeos) y actividades evaluables (cuestionarios, tareas, foros de debate). Genially, por su parte, es una aplicación de diseño que permite crear presentaciones, infografías y contenidos interactivos sin necesidad de conocimientos de programación."
          },
          {
            t: "viz",
            v: {
              type: "compare",
              title: "Dos herramientas complementarias",
              cols: [
                {
                  i: "laptop",
                  s: "info",
                  x: "Moodle (LMS Institucional)",
                  items: [
                    ["Entorno virtual estructurado en bloques o temas"],
                    ["Seguimiento automatizado del progreso del alumnado"],
                    ["Actividades evaluables con fechas límite y calificaciones"]
                  ]
                },
                {
                  i: "layers",
                  s: "info",
                  x: "Genially (Diseño Interactivo)",
                  items: [
                    ["Presentaciones e infografías interactivas"],
                    ["Capas desplegables y animaciones didácticas"],
                    ["Integración directa mediante enlace URL o incrustado"]
                  ]
                }
              ]
            }
          },
          {
            t: "links",
            items: [
              { i: "laptop", x: "Moodle.org", d: "Web oficial del entorno virtual de aprendizaje de código abierto.", url: "https://moodle.org/" },
              { i: "layers", x: "Genially", d: "Herramienta para crear presentaciones, infografías y contenidos interactivos.", url: "https://genially.com/es/" }
            ]
          }
        ],
        acts: ["S13-mg", "S13-A11"]
      },
      {
        num: 7,
        kind: "selfcheck",
        title: "Autoevaluación · Evaluación final del RA3 (10 preguntas)",
        nodes: [
          {
            t: "p",
            x: "Responde a las diez preguntas de la autoevaluación oficial del manual. La plataforma calcula el resultado al momento, guardando el mejor puntaje y el último intento para tu informe individual acreditativo."
          }
        ],
        acts: ["S13-EVAL"]
      }
    ],
    acts: [
      {
        id: "S13-mg",
        type: "classify",
        time: "5 min",
        title: "¿Moodle o Genially?",
        instr: "Clasifica cada función según la herramienta a la que la atribuye el epígrafe 5.",
        cats: ["Moodle", "Genially"],
        items: [
          { x: "Establecer plazos de entrega y condiciones de acceso secuencial a los contenidos.", c: 0, exp: "Primera ventaja de Moodle." },
          { x: "Capas desplegables, animaciones y elementos clicables.", c: 1, exp: "El componente visual e interactivo lo aporta Genially." },
          { x: "Informes de actividad para detectar pronto al alumnado con dificultades de seguimiento.", c: 0, exp: "Los informes de actividad son de Moodle." },
          { x: "Crear infografías sin conocimientos de programación.", c: 1, exp: "Definición de Genially." },
          { x: "Organizar el curso en temas con el botón «Activar edición».", c: 0, exp: "Paso 2 del tutorial de Moodle." },
          { x: "Generar un enlace público que se inserta como recurso «URL».", c: 1, exp: "Paso 4 del tutorial: el enlace lo genera Genially y se inserta en Moodle." }
        ],
        block: "S13",
        origin: "complementaria",
        ra: "RA3"
      },
      {
        id: "S13-A11",
        type: "teacher",
        origin: "manual",
        time: "30 min",
        timeManual: "40 minutos",
        kind: "Caso práctico",
        group: "Individual",
        mode: "Telemática, con acceso a entorno virtual de prueba.",
        ce: "Planificación didáctica modular y adaptación de materiales",
        title: "Actividad 11. Una unidad didáctica en el entorno virtual",
        instr: "Para un módulo de la familia profesional de Peluquería y Estética (o de tu propia especialidad), estructura una unidad didáctica dentro de un entorno virtual de aprendizaje, definiendo temas, recursos, una actividad evaluable y una infografía interactiva de apoyo.",
        grid: {
          cols: ["Tema o bloque", "Recursos que incluiría"],
          rows: 4
        },
        fields: [
          "Actividad evaluable y su fecha límite.",
          "Infografía de apoyo (descripción conceptual) y procedimiento técnico que ayuda a comprender."
        ],
        block: "S13",
        ra: "RA3"
      },
      {
        id: "S13-EVAL",
        type: "mcq",
        origin: "manual",
        time: "15 min",
        title: "Evaluación final del RA3 (Prueba oficial objetiva)",
        kind: "Prueba objetiva de opción múltiple",
        group: "Individual",
        questions: [
          {
            q: "En el modelo TPACK, las siglas TK hacen referencia a:",
            opts: [
              "El conocimiento pedagógico del docente.",
              "El conocimiento tecnológico del docente.",
              "El conocimiento del contenido de la materia.",
              "El conocimiento de la evaluación."
            ],
            ans: 1,
            exp: "Epígrafe 1: TK es el conocimiento tecnológico (Technological Knowledge)."
          },
          {
            q: "La intersección entre conocimiento tecnológico y conocimiento del contenido da lugar a:",
            opts: [
              "El conocimiento pedagógico del contenido.",
              "El conocimiento tecnológico pedagógico.",
              "El conocimiento tecnológico del contenido.",
              "El conocimiento tecnológico pedagógico del contenido."
            ],
            ans: 2,
            exp: "Epígrafe 1: de la combinación de conocimiento tecnológico y del contenido surge el conocimiento tecnológico del contenido (TCK)."
          },
          {
            q: "Seleccionar una tecnología digital exclusivamente por su novedad o atractivo visual, sin valorar su pertinencia pedagógica, constituye:",
            opts: [
              "Una correcta aplicación del modelo TPACK.",
              "Un error frecuente que el modelo TPACK ayuda a evitar.",
              "Una estrategia recomendada de planificación didáctica.",
              "Un requisito exigido por la normativa vigente."
            ],
            ans: 1,
            exp: "Epígrafe 1: es el primero de los dos errores frecuentes que el modelo TPACK permite evitar."
          },
          {
            q: "Antes de emplear un recurso tecnológico en el aula, el docente debe:",
            opts: [
              "Confiar en que funcionará correctamente sin comprobación previa.",
              "Revisar su funcionamiento y prever alternativas ante posibles problemas técnicos.",
              "Evitar cualquier planificación específica para su uso.",
              "Delegar la comprobación técnica exclusivamente en el alumnado."
            ],
            ans: 1,
            exp: "Epígrafe 2: hay que revisar el funcionamiento con antelación y prever una alternativa ante problemas técnicos."
          },
          {
            q: "La selección de recursos digitales disponibles en el centro debe realizarse considerando, entre otros factores:",
            opts: [
              "Únicamente el gusto personal del docente.",
              "Las características del alumnado, el contexto educativo y la modalidad de enseñanza.",
              "Exclusivamente el coste económico del recurso.",
              "La disponibilidad de recursos sin atender a la modalidad formativa."
            ],
            ans: 1,
            exp: "Epígrafe 2: las tres variables son las características del alumnado, el contexto educativo y la modalidad de enseñanza."
          },
          {
            q: "Una retroalimentación digital eficaz se caracteriza, entre otros aspectos, por ser:",
            opts: [
              "Genérica y aplicable a cualquier alumno por igual.",
              "Ofrecida sin plazo determinado tras la realización de la tarea.",
              "Oportuna, específica y orientada a la mejora.",
              "Centrada exclusivamente en la valoración numérica del resultado."
            ],
            ans: 2,
            exp: "Epígrafe 3: la retroalimentación eficaz es oportuna, específica y orientada a la mejora."
          },
          {
            q: "Proporcionar al alumnado estrategias para el uso de tecnologías digitales de comunicación y cooperación tiene como finalidad principal:",
            opts: [
              "Sustituir por completo la comunicación directa entre docente y alumnado.",
              "Favorecer la capacidad de aprendizaje entre iguales.",
              "Reducir la carga de trabajo docente sin beneficio pedagógico.",
              "Evitar cualquier forma de trabajo colaborativo."
            ],
            ans: 1,
            exp: "Epígrafe 3: se trata de favorecer la capacidad de aprendizaje entre iguales."
          },
          {
            q: "Las wikis, como herramienta de aprendizaje colaborativo, se caracterizan principalmente por:",
            opts: [
              "Permitir la construcción conjunta y progresiva de documentos por varios autores.",
              "Estar diseñadas exclusivamente para el trabajo individual.",
              "No permitir el seguimiento de las aportaciones de cada participante.",
              "Sustituir el uso de cualquier entorno virtual de aprendizaje."
            ],
            ans: 0,
            exp: "Epígrafe 4: las wikis posibilitan la construcción conjunta y progresiva de documentos por varios autores."
          },
          {
            q: "Las estrategias de aprendizaje autorregulado apoyadas en tecnologías digitales buscan, principalmente, desarrollar en el alumnado:",
            opts: [
              "La dependencia constante de la supervisión docente.",
              "Habilidades metacognitivas y capacidad de autonomía en su aprendizaje.",
              "Exclusivamente destrezas técnicas ajenas al contenido formativo.",
              "Una menor implicación en la planificación de su propio estudio."
            ],
            ans: 1,
            exp: "Epígrafe 4: buscan la autonomía y las habilidades metacognitivas del alumnado."
          },
          {
            q: "Un sistema digital de planificación, registro y consulta del aprendizaje facilitado al alumnado tiene como finalidad principal:",
            opts: [
              "Sustituir la evaluación realizada por el docente.",
              "Favorecer una reflexión sistemática del alumnado sobre su propio progreso.",
              "Limitar el acceso del alumnado a la información sobre sus resultados.",
              "Eliminar la necesidad de retroalimentación docente."
            ],
            ans: 1,
            exp: "Epígrafe 4: favorece una reflexión sistemática del alumnado sobre su propio proceso de aprendizaje."
          }
        ],
        block: "S13",
        ra: "RA3"
      }
    ]
  }
];
