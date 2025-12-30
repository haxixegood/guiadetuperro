import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState, useMemo } from 'react';
import { Search } from 'lucide-react';

interface BreedSearchProps {
  question: string;
  category?: string;
  placeholder?: string;
  skipText?: string;
  onAnswer: (value: string) => void;
}

// Lista de razas de perros – Español (México)
const DOG_BREEDS = [
  'Mestizo / Criollo',
  'Chihuahua',
  'Pitbull',
  'Labrador Retriever',
  'Golden Retriever',
  'Pastor Alemán',
  'Bulldog Francés',
  'Bulldog Inglés',
  'Poodle',
  'Beagle',
  'Husky Siberiano',
  'Rottweiler',
  'Dálmata',
  'Cocker Spaniel',
  'Pug',
  'Shih Tzu',
  'Yorkshire Terrier',
  'Doberman',
  'Boxer',
  'Border Collie',
  'Schnauzer',
  'Basset Hound',
  'Chow Chow',
  'Maltés',
  'San Bernardo',
  'Akita',
  'Shar Pei',
  'Weimaraner',
  'Pomerania',
  'Gran Danés',
  'Lhasa Apso',
  'Boston Terrier',
  'Cavalier King Charles',
  'Otro / No estoy seguro',
];

export default function BreedSearch({
  question,
  category,
  placeholder,
  skipText,
  onAnswer,
}: BreedSearchProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  
  // Filtrar raças baseado no termo de busca
  const filteredBreeds = useMemo(() => {
    if (!searchTerm.trim()) return [];
    
    const term = searchTerm.toLowerCase();
    return DOG_BREEDS.filter(breed => 
      breed.toLowerCase().includes(term)
    ).slice(0, 8); // Mostrar no máximo 8 sugestões
  }, [searchTerm]);
  
  const handleSelectBreed = (breed: string) => {
    setSearchTerm(breed);
    setShowSuggestions(false);
    onAnswer(breed);
  };
  
  const handleSkip = () => {
    onAnswer('skip');
  };
  
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && searchTerm.trim()) {
      // Se houver sugestões, selecionar a primeira
      if (filteredBreeds.length > 0) {
        handleSelectBreed(filteredBreeds[0]);
      } else {
        // Caso contrário, usar o texto digitado
        onAnswer(searchTerm.trim());
      }
    }
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center p-4 pt-16 pb-32">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl w-full space-y-8"
      >
        {/* Category badge */}
        {category && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-center"
          >
            <span className="text-xs font-semibold tracking-wider text-primary uppercase">
              {category}
            </span>
          </motion.div>
        )}
        
        {/* Question */}
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-3xl md:text-4xl font-bold text-center"
        >
          {question}
        </motion.h2>
        
        {/* Search Input */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-card rounded-3xl p-8 shadow-lg relative"
        >
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type="text"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setShowSuggestions(true);
              }}
              onFocus={() => setShowSuggestions(true)}
              onKeyPress={handleKeyPress}
              placeholder={placeholder}
              className="text-lg h-14 pl-12 pr-6 rounded-xl border-2 focus:border-primary"
              autoFocus
            />
          </div>
          
          {/* Suggestions dropdown */}
          {showSuggestions && filteredBreeds.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute left-8 right-8 top-full mt-2 bg-background rounded-2xl shadow-xl border-2 border-border overflow-hidden z-10"
            >
              {filteredBreeds.map((breed, index) => (
                <button
                  key={breed}
                  onClick={() => handleSelectBreed(breed)}
                  className="w-full px-6 py-3 text-left hover:bg-primary/10 transition-colors border-b border-border last:border-b-0"
                >
                  <span className="font-medium">{breed}</span>
                </button>
              ))}
            </motion.div>
          )}
        </motion.div>
        
        {/* Helper text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-center text-sm text-muted-foreground"
        >
          Digite para buscar ou selecione uma sugestão
        </motion.p>
        
        {/* Fixed bottom bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-sm border-t border-border p-4"
        >
          <div className="max-w-2xl mx-auto flex flex-col sm:flex-row gap-3 items-center justify-between">
            {skipText && (
              <Button
                variant="ghost"
                onClick={handleSkip}
                className="text-accent hover:text-accent/80"
              >
                {skipText}
              </Button>
            )}
            
            <Button
              onClick={() => {
                if (filteredBreeds.length > 0) {
                  handleSelectBreed(filteredBreeds[0]);
                } else if (searchTerm.trim()) {
                  onAnswer(searchTerm.trim());
                }
              }}
              size="lg"
              className="quiz-button w-full sm:w-auto"
              disabled={!searchTerm.trim()}
            >
              Continuar
            </Button>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
