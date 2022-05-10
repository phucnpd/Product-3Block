const typeAll = {
  adultContent: [
    'sex',
    'intolerance',
    'adult content',
    'Adult and Pornography',
    'sexually explicit',
    'Pornography',
    'porn',
    'adult content/not recommended site',
  ],
  Business: [
    'Business/Economy',
    'Marketing/Merchandising',
    'business',
    'business and economy',
    'general business',
    'online services',
    'stocks and trading',
    'pay-to-surf',
    'financial',
    'financial data and services',
    'stock trading',
    'shopping',
    'hosted business applications',
    'onlineshop',
    'Brokerage/Trading',
    'financial services',
    'web and email marketing',
    'finance & investment',
    'Finance',
    'Business/Economy, Finance',
    'marketing & merchandising',
    'online shopping',
    'organizational email',
    'real estate',
    'service and philanthropic organizations',
    'social and affiliation organizations',
  ],
  socialMedia: [
    'media sharing',
    'newly registered websites',
    'mobile communications',
    'news',
    'blogs and forums',
    'blogs and personal sites',
    'game playing & game media',
    'blogs',
    'Personal Sites/Blogs',
    'blog',
    'social networking',
    'content delivery networks',
    'content delivery',
    'cultural institutions',
    'Entertainment',
    'socialnetworks',
    'news and media',
    'message boards and forums',
    'streaming media',
    'game-cartoon violence',
    'moderated forums',
    'online chat',
    'blogs & wikis',
    'web chat',
  ],
  Advertisement: [
    'advertisements',
    'Ads/Analytics',
    'ads',
    'not recommended site',
    'Ads/Analytics, Marketing/Merchandising',
    'Ads/Analytics, Business/Economy, Marketing/Merchandising',
    'Unrated',
    'Ads/Analytics, Business/Economy',
    'cultural institutions',
  ],
  misc: [
    'instant messaging',
    'parked',
    'misc',
    'comics & humor & jokes',
    'onlinedating',
    'personals & dating',
    'hobbies',
    'games',
    'sports',
    'health',
    'prescribed medications',
    'tasteless & offensive',
    'vehicles',
    'uncategorized',
    'job search',
    'personals and dating',
    'advice',
    'society and lifestyles',
    'Parked Site',
    'tasteless & offensive',
    'Travel',
    'unknown',
    'motor vehicles',
  ],
  Technology: [
    'application and software download',
    'Hosting, Information Technology',
    'Information Technology',
    'download freeware and shareware',
    'hosted personal pages',
    'computersandsoftware',
    'software-hardware',
    'downloads',
    'dynamic dns',
    'information technology',
    'professional networking ',
    'parked domain',
    'web infrastructure',
    'personal network storage and backup',
    'online storage',
    'Search Engines',
    'content server',
    'Computer and Internet Info',
    'web hosting',
    'hacking',
    'media file download',
    'hosting',
    'Hacking, Information Technology',
    'filesharing',
    'e-mail',
    'Internet Portals',
    'parked domains',
    'webmail',
    'video hosting',
    'technical information',
    'Business/Economy, Information Technology',
    'Finance, Information Technology',
    'search engines & portals',
    'search engines and portals',
    'Shareware and Freeware',
    'visual search',
    'Hosting, Information Technology, Personal Sites/Blogs',
  ],
  Malicious: [
    'Suspicious',
    'Malicious, Phishing, Suspicious',
    'suspicious content',
    'malicious web sites',
    'Malicious',
    'Malicious, Phishing',
    'hacking',
    'Malware Sites',
    'Malicious',
    'Games, Malicious',
    'Information Technology, Suspicious',
    'spyware and malware',
    'parked domain. compromised websites',
    'potentially unwanted software distribution',
    'Malicious, Phishing, Scam/Illegal/Unethical',
    'Hacking, Malicious, Piracy/Plagiarism',
    'Hosting, Information Technology, Suspicious',
    'Hacking, Malicious, Potentially Unwanted Programs',
    'illegal drugs',
    'Information Technology, Malicious',
    'Malicious, Piracy/Plagiarism, Potentially Unwanted Programs',
    'Phishing, Scam/Illegal/Unethical',
    'malware repository, spyware and malware',
    'newly registered websites. elevated exposure',
    'elevated exposure',
    'Scam/Illegal/Unethical',
    'malicious web sites. blogs and personal sites',
    '',
    '',
  ],
  Phishing: [
    'Phishing',
    'Phishing and Other Frauds',
    'illegal phishing, phishing and fraud',
    'gambling',
    'known infection source',
    'phishing and fraud',
    'online brokerage and trading',
    'web and email spam. gambling',
    'Finance, Gambling',
    'spam other, spam urls',
    'Spam, Suspicious',
    'Spam',
    'phishing and other frauds. games',
    'Entertainment, Games, Suspicious',
    'Scam/Illegal/Unethical, Suspicious',
    'Business/Economy, Suspicious',
    'Business/Economy, Phishing',
    'gambling/adult content',
    'gambling/not recommended site',
    'gambling/social networks',
    'illegal software',
    'illegal or questionable',
    'Information Technology, Software Downloads, Suspicious',
    'Ads/Analytics, Information Technology, Suspicious',
    'internet auctions',
    'malicious web sites. phishing and other frauds',
    'Business/Economy, Finance, Scam/Illegal/Unethical',
    'Business/Economy, Marketing/Merchandising, Suspicious',
    'Business/Economy, Malicious, Phishing',
    'Questionable',
    'spam urls',
  ],
  Education: [
    'education',
    'educational institutions',
    'educational materials',
    'Kids',
    'kids sites',
    'nutrition',
    'reference materials',
  ],
};

export function typeOfCategories(categories) {
  if (
    typeAll.adultContent.find((element) => {
      if (element === categories) {
        return ' ';
      }
      return undefined;
    }) !== undefined
  ) {
    return { name: 'adultContent', icon: 'uil:18-plus' };
  } else if (
    typeAll.Business.find((element) => {
      if (element === categories) {
        return ' ';
      }
      return undefined;
    }) !== undefined
  ) {
    return { name: 'Business', icon: 'flat-color-icons:businessman' };
  } else if (
    typeAll.socialMedia.find((element) => {
      if (element === categories) {
        return ' ';
      }
      return undefined;
    }) !== undefined
  ) {
    return { name: 'socialMedia', icon: 'flat-ui:camera' };
  } else if (
    typeAll.Advertisement.find((element) => {
      if (element === categories) {
        return ' ';
      }
      return undefined;
    }) !== undefined
  ) {
    return { name: 'Advertisement', icon: 'flat-color-icons:advertising' };
  } else if (
    typeAll.misc.find((element) => {
      if (element === categories) {
        return ' ';
      }
      return undefined;
    }) !== undefined
  ) {
    return { name: 'misc', icon: 'twemoji:sunflower' };
  } else if (
    typeAll.Technology.find((element) => {
      if (element === categories) {
        return ' ';
      }
      return undefined;
    }) !== undefined
  ) {
    return { name: 'Technology', icon: 'logos:stackoverflow-icon' };
  } else if (
    typeAll.Malicious.find((element) => {
      if (element === categories) {
        return ' ';
      }
      return undefined;
    }) !== undefined
  ) {
    return { name: 'Malicious', icon: 'openmoji:hacker-cat' };
  } else if (
    typeAll.Phishing.find((element) => {
      if (element === categories) {
        return ' ';
      }
      return undefined;
    }) !== undefined
  ) {
    return { name: 'Phishing', icon: 'vscode-icons:folder-type-hook-opened' };
  } else if (
    typeAll.Education.find((element) => {
      if (element === categories) {
        return ' ';
      }
      return undefined;
    }) !== undefined
  ) {
    return { name: 'Education', icon: 'openmoji:incredulous-face' };
  } else {
    return { name: 'Unknown', icon: 'emojione-v1:exclamation-question-mark' };
  }
}
