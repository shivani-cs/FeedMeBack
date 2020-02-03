package com.cmpe272.feedmeback;

import simplenlg.framework.*;
import simplenlg.lexicon.*;
import simplenlg.realiser.english.*;
import simplenlg.features.*;

public class App
{
    public static void main( String[] args )
    {
    	Lexicon lexicon = new XMLLexicon();
    	
    	Realiser realiser = new Realiser(lexicon);
    	
    	NLGFactory docFactory = new NLGFactory();
    	docFactory.setLexicon(lexicon);
    	
		realiser.setLexicon(lexicon);
		
		NLGElement she = docFactory.createWord("she",LexicalCategory.PRONOUN);

		// Set possessive on the pronoun to make it 'her'
		she.setFeature(Feature.POSSESSIVE, true);

		// Create a noun phrase with the subject lover and the determiner
		// as she
		PhraseElement herLover = docFactory.createNounPhrase(she,"lover");

		// Create a clause to say 'he be her lover'
		PhraseElement clause = docFactory.createClause("he", "be", herLover);

		// Add the cue phrase need the comma as orthography
		// currently doesn't handle this.
		// This could be expanded to be a noun phrase with determiner
		// 'two' and noun 'week', set to plural and with a premodifier of
		// 'after'
		clause.setFeature(Feature.CUE_PHRASE, "after two weeks,");

		// Add the 'for a fortnight' as a post modifier. Alternatively
		// this could be added as a prepositional phrase 'for' with a
		// complement of a noun phrase ('a' 'fortnight')
		clause.addPostModifier("for a fortnight");

		// Set 'be' to 'was' as past tense
		clause.setFeature(Feature.TENSE,Tense.PAST);

		// Add the clause to a sentence.
		DocumentElement sentence1 = docFactory.createSentence(clause);

		// Realise the sentence
		NLGElement realised = realiser.realise(sentence1);
		
		System.out.print(realised);
    }
}
