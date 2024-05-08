'use client';
import { useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { languages } from '@/lib/languages';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';


export default function TranslateForm() {
  const [text, setText] = useState('');
  const [translation, setTranslation] = useState('');
  const [error, setError] = useState('');
  const [targetLanguage, setTargetLanguage] = useState('en');
  const [isLoading, setIsLoading] = useState(false);
  const [translationKey, setTranslationKey] = useState(0);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await axios.post('/api/translate', { text, targetLanguage });
      setTranslation(res.data.translation);
      setTranslationKey(prevKey => prevKey + 1);
      setError('');
    } catch (err) {
      setError('Error during translation');
      setTranslation('');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">Text Translation</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow-md p-6 flex flex-col md:max-w-2xl md:mx-auto lg:max-w-4xl lg:mx-auto"
      >
        <Textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter text to translate"
          className="border-gray-300 rounded-md p-2 mb-4 focus:ring-2 focus:ring-indigo-500"
        />
        <div className="flex flex-col md:flex-row items-center justify-between mb-4">
          <Label htmlFor="language" className="font-bold mr-2 mb-2 md:mb-0">
            Target Language:
          </Label >
          <select
            id="language"
            value={targetLanguage}
            onChange={(e) => setTargetLanguage(e.target.value)}
            className="flex h-10 w-full md:w-1/2 items-center justify-between rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {languages.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.name}
              </option>
            ))}
          </select>
        </div>
        <Button
          type="submit"
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          {isLoading ? 'Translating ...' : 'Translate'}
        </Button>
      </form>
      {error && <p className="text-red-500 mt-4">{error}</p>}
      <AnimatePresence>
        {translation && (
          <motion.div
            key={`translation-${translationKey}`}
            className="mt-4 bg-gray-100 rounded-md p-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{
              duration: 0.8,
              ease: 'easeInOut',
            }}
          >
            <p className="font-bold text-gray-800">Translation:</p>
            <p className="text-gray-700">{translation}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
