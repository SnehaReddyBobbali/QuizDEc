// This function provides the questions for each quiz based on the quiz ID
const getQuizQuestions = (quizId) => {
    const quizData = {
      'SCI_1': [ // Human Biology
        {
          question: "Which organ is responsible for producing insulin?",
          options: ["Liver", "Pancreas", "Kidneys", "Spleen"],
          correctAnswer: 1,
          explanation: "The pancreas produces insulin, a hormone that regulates blood sugar levels by helping glucose enter cells."
        },
        {
          question: "What is the largest organ in the human body?",
          options: ["Brain", "Liver", "Skin", "Heart"],
          correctAnswer: 2,
          explanation: "The skin is the largest organ, covering about 1.5-2 square meters in adults."
        },
        {
          question: "Which blood cells are responsible for fighting infections?",
          options: ["Red blood cells", "White blood cells", "Platelets", "Plasma"],
          correctAnswer: 1,
          explanation: "White blood cells (leukocytes) are part of the immune system and protect the body against infectious disease and foreign invaders."
        },
        {
          question: "What is the name of the tube that connects the throat to the stomach?",
          options: ["Trachea", "Esophagus", "Bronchus", "Intestine"],
          correctAnswer: 1,
          explanation: "The esophagus is a muscular tube that carries food and liquids from the throat to the stomach."
        },
        {
          question: "How many chambers does the human heart have?",
          options: ["2", "3", "4", "5"],
          correctAnswer: 2,
          explanation: "The human heart has four chambers: right atrium, right ventricle, left atrium, and left ventricle."
        },
        {
          question: "Which part of the brain is responsible for maintaining balance and coordination?",
          options: ["Cerebrum", "Cerebellum", "Medulla", "Hypothalamus"],
          correctAnswer: 1,
          explanation: "The cerebellum coordinates voluntary movements and maintains posture and balance."
        },
        {
          question: "What is the normal range for human body temperature in degrees Celsius?",
          options: ["35-36°C", "36-37.5°C", "38-39°C", "40-41°C"],
          correctAnswer: 1,
          explanation: "Normal human body temperature typically ranges from 36-37.5°C, with 37°C (98.6°F) considered the average."
        },
        {
          question: "Which gland produces growth hormone?",
          options: ["Thyroid", "Adrenal", "Pituitary", "Pineal"],
          correctAnswer: 2,
          explanation: "The pituitary gland, often called the 'master gland,' produces growth hormone among many other important hormones."
        },
        {
          question: "What is the main function of red blood cells?",
          options: ["Fighting infection", "Blood clotting", "Carrying oxygen", "Producing antibodies"],
          correctAnswer: 2,
          explanation: "Red blood cells (erythrocytes) contain hemoglobin, which binds to oxygen and transports it throughout the body."
        },
        {
          question: "Which vitamin is produced when skin is exposed to sunlight?",
          options: ["Vitamin A", "Vitamin C", "Vitamin D", "Vitamin K"],
          correctAnswer: 2,
          explanation: "Vitamin D is synthesized in the skin when exposed to ultraviolet B (UVB) rays from sunlight."
        },
        {
          question: "What is the name of the tiny air sacs in lungs where gas exchange occurs?",
          options: ["Bronchi", "Bronchioles", "Alveoli", "Trachea"],
          correctAnswer: 2,
          explanation: "Alveoli are microscopic air sacs in the lungs where oxygen and carbon dioxide exchange takes place."
        },
        {
          question: "Which of these is NOT a function of the liver?",
          options: ["Detoxification", "Protein synthesis", "Bile production", "Insulin production"],
          correctAnswer: 3,
          explanation: "The liver has many functions including detoxification, protein synthesis, and bile production, but insulin is produced by the pancreas."
        },
        {
          question: "What connects muscles to bones?",
          options: ["Ligaments", "Tendons", "Cartilage", "Nerves"],
          correctAnswer: 1,
          explanation: "Tendons are tough fibrous tissues that connect muscles to bones."
        },
        {
          question: "Which system in the body includes the lymph nodes and spleen?",
          options: ["Digestive system", "Circulatory system", "Lymphatic system", "Nervous system"],
          correctAnswer: 2,
          explanation: "The lymphatic system includes lymph nodes, the spleen, thymus, and lymphatic vessels, and is crucial for immune function."
        },
        {
          question: "What is the hardest substance in the human body?",
          options: ["Bone", "Tooth enamel", "Cartilage", "Nail"],
          correctAnswer: 1,
          explanation: "Tooth enamel is the hardest substance in the human body, composed primarily of hydroxyapatite, a crystalline calcium phosphate."
        }
      ],
      'SCI_2': [ // Chemistry Basics
        {
          question: "What is the chemical symbol for gold?",
          options: ["Au", "Ag", "Fe", "Gd"],
          correctAnswer: 0,
          explanation: "Au is the chemical symbol for gold, derived from the Latin word 'aurum'."
        },
        {
          question: "Which of these is a noble gas?",
          options: ["Chlorine", "Nitrogen", "Oxygen", "Argon"],
          correctAnswer: 3,
          explanation: "Argon is a noble gas, located in Group 18 of the periodic table."
        },
        {
          question: "What is the pH of a neutral solution?",
          options: ["0", "7", "10", "14"],
          correctAnswer: 1,
          explanation: "A neutral solution has a pH of 7, neither acidic (below 7) nor basic (above 7)."
        },
        {
          question: "Which subatomic particle has a positive charge?",
          options: ["Electron", "Proton", "Neutron", "Positron"],
          correctAnswer: 1,
          explanation: "Protons have a positive charge, electrons have a negative charge, and neutrons have no charge."
        },
        {
          question: "What type of bond is formed when electrons are shared between atoms?",
          options: ["Ionic bond", "Covalent bond", "Hydrogen bond", "Metallic bond"],
          correctAnswer: 1,
          explanation: "A covalent bond is formed when atoms share electrons, as opposed to the transfer of electrons in ionic bonding."
        },
        {
          question: "What is the most abundant element in the Earth's atmosphere?",
          options: ["Oxygen", "Carbon dioxide", "Nitrogen", "Hydrogen"],
          correctAnswer: 2,
          explanation: "Nitrogen makes up approximately 78% of the Earth's atmosphere."
        },
        {
          question: "Which of these is an example of a chemical change?",
          options: ["Freezing water", "Dissolving sugar in water", "Rusting iron", "Grinding salt"],
          correctAnswer: 2,
          explanation: "Rusting of iron (forming iron oxide) is a chemical change that creates a new substance. The other options are physical changes."
        },
        {
          question: "What is the chemical formula for water?",
          options: ["H2O", "CO2", "NaCl", "H2O2"],
          correctAnswer: 0,
          explanation: "Water has the chemical formula H2O, consisting of two hydrogen atoms bonded to one oxygen atom."
        },
        {
          question: "What is the process called when a solid changes directly to a gas without becoming a liquid?",
          options: ["Evaporation", "Condensation", "Sublimation", "Deposition"],
          correctAnswer: 2,
          explanation: "Sublimation is the process where a solid changes directly to a gas, skipping the liquid phase."
        },
        {
          question: "Which element has the atomic number 1?",
          options: ["Oxygen", "Carbon", "Hydrogen", "Helium"],
          correctAnswer: 2,
          explanation: "Hydrogen has the atomic number 1, meaning it has one proton in its nucleus."
        },
        {
          question: "What is the main component of natural gas?",
          options: ["Ethane", "Propane", "Methane", "Butane"],
          correctAnswer: 2,
          explanation: "Methane (CH4) is the primary component of natural gas."
        },
        {
          question: "Which of these is NOT a state of matter?",
          options: ["Solid", "Liquid", "Gas", "Element"],
          correctAnswer: 3,
          explanation: "Element is not a state of matter. The four common states of matter are solid, liquid, gas, and plasma."
        }
      ],
      'SCI_3': [ // Physics Laws
        {
          question: "Which law states that for every action, there is an equal and opposite reaction?",
          options: ["Newton's First Law", "Newton's Second Law", "Newton's Third Law", "Law of Conservation of Energy"],
          correctAnswer: 2,
          explanation: "Newton's Third Law states that for every action, there is an equal and opposite reaction."
        },
        {
          question: "What is the formula for Newton's Second Law of Motion?",
          options: ["F = ma", "E = mc²", "F = G(m₁m₂)/r²", "v = u + at"],
          correctAnswer: 0,
          explanation: "Newton's Second Law is represented by F = ma, where F is force, m is mass, and a is acceleration."
        },
        {
          question: "Which principle states that energy cannot be created or destroyed, only transformed?",
          options: ["Law of Gravity", "Law of Conservation of Energy", "Archimedes' Principle", "Bernoulli's Principle"],
          correctAnswer: 1,
          explanation: "The Law of Conservation of Energy states that energy cannot be created or destroyed, only changed from one form to another."
        },
        {
          question: "What is the SI unit of force?",
          options: ["Watt", "Joule", "Newton", "Pascal"],
          correctAnswer: 2,
          explanation: "The newton (N) is the SI unit of force, equal to the force needed to accelerate 1 kg by 1 m/s²."
        },
        {
          question: "Which scientist is known for the theory of relativity?",
          options: ["Isaac Newton", "Niels Bohr", "Albert Einstein", "Galileo Galilei"],
          correctAnswer: 2,
          explanation: "Albert Einstein developed both the special and general theories of relativity."
        },
        {
          question: "What is the phenomenon where light bends as it passes from one medium to another?",
          options: ["Reflection", "Refraction", "Diffraction", "Interference"],
          correctAnswer: 1,
          explanation: "Refraction is the bending of light when it passes from one medium to another due to the change in speed."
        },
        {
          question: "Which law describes the relationship between the voltage, current, and resistance in an electrical circuit?",
          options: ["Faraday's Law", "Coulomb's Law", "Ohm's Law", "Ampere's Law"],
          correctAnswer: 2,
          explanation: "Ohm's Law states that the current flowing through a conductor is directly proportional to the voltage and inversely proportional to the resistance (V = IR)."
        },
        {
        question: "What is the term for the resistance of an object to changes in its motion?",
        options: ["Force", "Acceleration", "Momentum", "Inertia"],
        correctAnswer: 3,
        explanation: "Inertia is the resistance of an object to changes in its state of motion or rest, and is directly related to the object's mass."
      },
      {
        question: "Which law states that the pressure of a gas is inversely proportional to its volume at constant temperature?",
        options: ["Charles' Law", "Gay-Lussac's Law", "Boyle's Law", "Avogadro's Law"],
        correctAnswer: 2,
        explanation: "Boyle's Law states that the pressure and volume of a gas are inversely proportional at constant temperature (P₁V₁ = P₂V₂)."
      },
      {
        question: "What is the formula for Einstein's mass-energy equivalence?",
        options: ["E = mc²", "F = ma", "E = hf", "PV = nRT"],
        correctAnswer: 0,
        explanation: "E = mc² is Einstein's famous equation expressing mass-energy equivalence, where E is energy, m is mass, and c is the speed of light."
      }
    ],
    'SCI_4': [ // Astronomy
      {
        question: "Which planet is known as the 'Red Planet'?",
        options: ["Venus", "Mars", "Jupiter", "Mercury"],
        correctAnswer: 1,
        explanation: "Mars is called the 'Red Planet' due to its reddish appearance caused by iron oxide (rust) on its surface."
      },
      {
        question: "What is the name of our galaxy?",
        options: ["Andromeda", "Milky Way", "Triangulum", "Sombrero"],
        correctAnswer: 1,
        explanation: "Our galaxy is called the Milky Way, a spiral galaxy containing our solar system."
      },
      {
        question: "Which of these is NOT a planet in our solar system?",
        options: ["Neptune", "Uranus", "Pluto", "Saturn"],
        correctAnswer: 2,
        explanation: "Pluto was reclassified as a dwarf planet in 2006 by the International Astronomical Union."
      },
      {
        question: "What is the largest planet in our solar system?",
        options: ["Earth", "Saturn", "Jupiter", "Neptune"],
        correctAnswer: 2,
        explanation: "Jupiter is the largest planet in our solar system, with a mass more than 300 times that of Earth."
      },
      {
        question: "Which celestial body causes ocean tides on Earth?",
        options: ["The Sun", "The Moon", "Jupiter", "Mars"],
        correctAnswer: 1,
        explanation: "The Moon's gravitational pull is the primary cause of tides on Earth, with the Sun having a secondary effect."
      },
      {
        question: "What is a black hole?",
        options: ["A dead star", "A region where gravity is so strong that nothing can escape", "An empty region in space", "A type of galaxy"],
        correctAnswer: 1,
        explanation: "A black hole is a region of spacetime where gravity is so strong that nothing—not even light—can escape from it."
      },
      {
        question: "How long does it take for light from the Sun to reach Earth?",
        options: ["8 minutes", "8 hours", "8 seconds", "8 days"],
        correctAnswer: 0,
        explanation: "It takes about 8 minutes and 20 seconds for light to travel from the Sun to Earth, at a distance of approximately 150 million km."
      },
      {
        question: "Which planet has the most moons?",
        options: ["Jupiter", "Saturn", "Uranus", "Neptune"],
        correctAnswer: 0,
        explanation: "Jupiter currently has the most confirmed moons, with over 79 known satellites."
      }
    ],
    'SCI_5': [ // Environmental Science
      {
        question: "What is the primary cause of global warming?",
        options: ["Solar flares", "Ozone depletion", "Greenhouse gas emissions", "Volcanic eruptions"],
        correctAnswer: 2,
        explanation: "The primary cause of global warming is the increased concentration of greenhouse gases in the atmosphere, mainly from human activities like burning fossil fuels."
      },
      {
        question: "What is biodiversity?",
        options: ["The variety of life forms in an ecosystem", "A type of sustainable agriculture", "The study of human impact on ecosystems", "A measure of air pollution"],
        correctAnswer: 0,
        explanation: "Biodiversity refers to the variety of life forms in a particular habitat or ecosystem, including the diversity of species, genetic diversity, and ecosystem diversity."
      },
      {
        question: "Which of these is a renewable resource?",
        options: ["Coal", "Natural gas", "Solar energy", "Petroleum"],
        correctAnswer: 2,
        explanation: "Solar energy is a renewable resource as it is continuously replenished by the sun. The other options are fossil fuels, which are non-renewable."
      },
      {
        question: "What is the primary component of acid rain?",
        options: ["Carbon dioxide", "Methane", "Sulfuric acid", "Nitrogen"],
        correctAnswer: 2,
        explanation: "Acid rain is primarily composed of sulfuric and nitric acids, formed when sulfur dioxide and nitrogen oxides react with water in the atmosphere."
      },
      {
        question: "Which of these is NOT a major cause of deforestation?",
        options: ["Agriculture expansion", "Logging", "Urbanization", "Ocean acidification"],
        correctAnswer: 3,
        explanation: "Ocean acidification is not a cause of deforestation. It's a separate environmental issue related to the absorption of CO2 by oceans."
      },
      {
        question: "What is an ecosystem?",
        options: ["A community of plants", "A group of animals of the same species", "A biological community and its physical environment", "A protected natural area"],
        correctAnswer: 2,
        explanation: "An ecosystem is a biological community of interacting organisms and their physical environment."
      },
      {
        question: "What is the ozone layer and why is it important?",
        options: ["It produces oxygen for breathing", "It filters harmful UV radiation", "It regulates Earth's temperature", "It prevents acid rain"],
        correctAnswer: 1,
        explanation: "The ozone layer in the stratosphere absorbs and scatters ultraviolet radiation from the sun, protecting life on Earth from harmful UV rays."
      },
      {
        question: "Which of these is an example of a keystone species?",
        options: ["Ants in a forest", "Grass in a prairie", "Wolves in a forest ecosystem", "Algae in a pond"],
        correctAnswer: 2,
        explanation: "Wolves are a keystone species in many forest ecosystems, as they regulate prey populations and indirectly influence forest vegetation."
      },
      {
        question: "What is eutrophication?",
        options: ["The process of water purification", "Excessive richness of nutrients in a body of water", "The formation of new species", "The drying up of lakes and rivers"],
        correctAnswer: 1,
        explanation: "Eutrophication is the excessive richness of nutrients in a body of water, often due to runoff from the land, which causes a dense growth of plant life and death of animal life from lack of oxygen."
      },
      {
        question: "What is sustainable development?",
        options: ["Development that meets present needs without compromising future needs", "Development of only renewable energy sources", "Economic growth regardless of environmental impact", "Conservation of resources by avoiding all development"],
        correctAnswer: 0,
        explanation: "Sustainable development meets the needs of the present without compromising the ability of future generations to meet their own needs."
      }
    ],
    'SCI_6': [ // Genetics
      {
        question: "What is the basic unit of genetic material?",
        options: ["Protein", "DNA", "Cell", "Chromosome"],
        correctAnswer: 1,
        explanation: "DNA (deoxyribonucleic acid) is the basic unit of genetic material that carries the genetic instructions for the development and functioning of all living organisms."
      },
      {
        question: "What are the building blocks of DNA?",
        options: ["Amino acids", "Fatty acids", "Nucleotides", "Monosaccharides"],
        correctAnswer: 2,
        explanation: "Nucleotides are the building blocks of DNA, consisting of a sugar (deoxyribose), a phosphate group, and a nitrogenous base."
      },
      {
        question: "Which nitrogenous base is NOT found in DNA?",
        options: ["Adenine", "Uracil", "Cytosine", "Guanine"],
        correctAnswer: 1,
        explanation: "Uracil is found in RNA, not DNA. DNA contains adenine, thymine, cytosine, and guanine."
      },
      {
        question: "What is a gene?",
        options: ["A segment of DNA that codes for a specific protein", "A chromosome", "A section of the cell nucleus", "A type of RNA"],
        correctAnswer: 0,
        explanation: "A gene is a segment of DNA that contains the instructions for making a specific protein or RNA molecule."
      },
      {
        question: "What process produces exact copies of DNA?",
        options: ["Transcription", "Translation", "Replication", "Mutation"],
        correctAnswer: 2,
        explanation: "DNA replication is the process by which DNA makes an exact copy of itself during cell division."
      },
      {
        question: "What is the structure of DNA called?",
        options: ["Single helix", "Double helix", "Triple helix", "Alpha helix"],
        correctAnswer: 1,
        explanation: "DNA has a double helix structure, resembling a twisted ladder, as discovered by James Watson and Francis Crick."
      },
      {
        question: "What is a genome?",
        options: ["All the genes in a population", "All the DNA in a cell", "All the proteins in an organism", "All the chromosomes in a species"],
        correctAnswer: 1,
        explanation: "A genome is the complete set of genetic material (DNA) present in a cell or organism."
      },
      {
        question: "What is a chromosome?",
        options: ["A single strand of DNA", "A protein that binds to DNA", "A structure made of DNA and proteins", "A type of gene"],
        correctAnswer: 2,
        explanation: "A chromosome is a structure composed of DNA and proteins (histones) that carries genetic information."
      },
      {
        question: "How many pairs of chromosomes do humans typically have?",
        options: ["21 pairs", "22 pairs", "23 pairs", "24 pairs"],
        correctAnswer: 2,
        explanation: "Humans typically have 23 pairs of chromosomes, for a total of 46 chromosomes."
      },
      {
        question: "What is the process of making proteins from genetic information called?",
        options: ["Replication", "Transcription", "Translation", "Mutation"],
        correctAnswer: 2,
        explanation: "Translation is the process of making proteins from the genetic information in mRNA."
      },
      {
        question: "What is genetic engineering?",
        options: ["The study of heredity", "The manipulation of genetic material", "The cloning of organisms", "The breeding of plants"],
        correctAnswer: 1,
        explanation: "Genetic engineering is the direct manipulation of an organism's genes using biotechnology."
      },
      {
        question: "What is a mutation?",
        options: ["A change in the DNA sequence", "The creation of new genes", "The replication of chromosomes", "The process of sexual reproduction"],
        correctAnswer: 0,
        explanation: "A mutation is a change in the DNA sequence that can alter gene function and may lead to new traits."
      }
    ]
  };
  
  return quizData[quizId] || [];
};

export default getQuizQuestions;