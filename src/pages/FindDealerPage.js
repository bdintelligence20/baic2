import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const PageContainer = styled.div`
  padding: 120px 2rem 4rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const PageHeader = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 1rem;
  position: relative;
  display: inline-block;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 3px;
    background-color: #e60012;
  }
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  color: #666;
  max-width: 800px;
  margin: 0 auto;
  margin-top: 1.5rem;
`;

const SearchSection = styled.div`
  background-color: #f8f8f8;
  padding: 2rem;
  border-radius: 8px;
  margin-bottom: 3rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
`;

const SearchForm = styled.form`
  display: flex;
  gap: 1rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const FormGroup = styled.div`
  flex: 1;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #555;
`;

const Select = styled.select`
  width: 100%;
  padding: 0.8rem 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  color: #333;
  background-color: white;
  
  &:focus {
    outline: none;
    border-color: #e60012;
    box-shadow: 0 0 0 2px rgba(230, 0, 18, 0.1);
  }
`;

const Button = styled.button`
  padding: 0.8rem 2rem;
  background-color: #e60012;
  color: white;
  border: none;
  border-radius: 4px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  align-self: flex-end;
  
  &:hover {
    background-color: #c5000f;
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const ResultsSection = styled.div`
  margin-top: 3rem;
`;

const ResultsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;
  
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const DealerCard = styled.div`
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  }
`;

const DealerHeader = styled.div`
  background-color: #f5f5f5;
  padding: 1.5rem;
  border-bottom: 1px solid #eee;
`;

const DealerName = styled.h3`
  font-size: 1.2rem;
  color: #333;
  margin-bottom: 0.5rem;
`;

const DealerRegion = styled.span`
  display: inline-block;
  padding: 0.3rem 0.8rem;
  background-color: #e60012;
  color: white;
  font-size: 0.8rem;
  border-radius: 20px;
  font-weight: 500;
`;

const DealerBody = styled.div`
  padding: 1.5rem;
`;

const DealerInfo = styled.div`
  margin-bottom: 1.5rem;
`;

const DealerAddress = styled.p`
  color: #555;
  margin-bottom: 0.5rem;
  line-height: 1.5;
`;

const DealerContact = styled.p`
  color: #555;
  margin-bottom: 0.5rem;
  
  a {
    color: #e60012;
    text-decoration: none;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

const DealerWebsite = styled.p`
  color: #555;
  margin-bottom: 0.5rem;
  
  a {
    color: #e60012;
    text-decoration: none;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

const DealerActions = styled.div`
  margin-top: 1.5rem;
`;

const DealerButton = styled.a`
  display: inline-block;
  width: 100%;
  padding: 0.8rem 1rem;
  text-align: center;
  background-color: transparent;
  color: #e60012;
  border: 1px solid #e60012;
  border-radius: 4px;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: rgba(230, 0, 18, 0.1);
    transform: translateY(-2px);
  }
`;

// Dealership data
const BAIC_DEALERSHIPS = [
  // Gauteng
  {
    region: "Gauteng",
    name: "BAIC Nigel",
    address: "64 Springs Road, Nigel, 1491, Nigel",
    phone: "011 100 5657",
    email: "workshop@baicnigel.co.za",
    website: "www.epsonmotors.co.za",
    map_link: "https://maps.google.com/?q=64+Springs+Road,+Nigel,+1491,+Nigel"
  },
  {
    region: "Gauteng",
    name: "BAIC Pretoria North",
    address: "466 Gerrit Maritz Road, Pretoria North, 0116, Pretoria North",
    phone: "073 786 5814",
    email: "md@squadcars.co.za; adnaan@squadcars.co.za",
    website: "www.scmg.co.za",
    map_link: "https://maps.google.com/?q=466+Gerrit+Maritz+Road,+Pretoria+North,+0116,+Pretoria+North"
  },
  {
    region: "Gauteng",
    name: "BAIC West Rand",
    address: "44 Ontdekkers Road, Princess, Roodepoort, Gauteng, 1724, Roodepoort",
    phone: "011 768 5603",
    email: "jacques@gdpgroup.co.za",
    website: "www.baicwestrand.co.za",
    map_link: "https://maps.google.com/?q=44+Ontdekkers+Road,+Princess,+Roodepoort,+Gauteng,+1724,+Roodepoort"
  },
  {
    region: "Gauteng",
    name: "BAIC Bryanston",
    address: "11 Republic Road, Bordeaux, Randburg, 2194, Bryanston",
    phone: "011 326 1954",
    email: "info@baicbryanston.co.za",
    website: "www.driver1.co.za",
    map_link: "https://maps.google.com/?q=11+Republic+Road,+Bordeaux,+Randburg,+2194,+Bryanston"
  },
  {
    region: "Gauteng",
    name: "BAIC Vaal",
    address: "346 Old Johannesburg Road, De Deur, 1884, Vaal",
    phone: "016 100 4502",
    email: "sales@pristinemotors.co.za",
    website: "www.pristine.co.za",
    map_link: "https://maps.google.com/?q=346+Old+Johannesburg+Road,+De+Deur,+1884,+Vaal"
  },
  {
    region: "Gauteng",
    name: "BAIC Alberton",
    address: "Cnr Voortrekker Road and Eaton Terrace, Alberton, Alberton",
    phone: "010 593 4393",
    email: "sales7a@grp1.co.za",
    website: "",
    map_link: "https://maps.google.com/?q=Cnr+Voortrekker+Road+and+Eaton+Terrace,+Alberton,+Alberton"
  },
  {
    region: "Gauteng",
    name: "BAIC Kempton Park",
    address: "c/o Great North Road & Deodar Street, Pomona AH, 1619, Kempton Park",
    phone: "010 591 2839",
    email: "clayton@mobilisauto.co.za earl@mobilisauto.co.za",
    website: "www.mobilisauto.co.za",
    map_link: "https://maps.google.com/?q=c/o+Great+North+Road+&+Deodar+Street,+Pomona+AH,+1619,+Kempton+Park"
  },
  {
    region: "Gauteng",
    name: "BAIC Northcliff",
    address: "Corner Queens and Beyers Naude Dr, Windsow West, Johannesburg, 2194, Northcliff",
    phone: "011 478 2177",
    email: "Dp@baicnorthcliff.co.za",
    website: "www.mmu-motors.co.za",
    map_link: "https://maps.google.com/?q=Corner+Queens+and+Beyers+Naude+Dr,+Windsow+West,+Johannesburg,+2194,+Northcliff"
  },
  {
    region: "Gauteng",
    name: "BAIC Midrand",
    address: "450 16th Avenue, Midrand, Midrand",
    phone: "087 057 9120",
    email: "manfreddp@grp1.co.za",
    website: "",
    map_link: "https://maps.google.com/?q=450+16th+Avenue,+Midrand,+Midrand"
  },
  {
    region: "Gauteng",
    name: "BAIC Centurion",
    address: "400 West Avenue, Centurion, 0157, Centurion",
    phone: "012 941 9434",
    email: "charmaine@laz.co.za",
    website: "",
    map_link: "https://maps.google.com/?q=400+West+Avenue,+Centurion,+0157,+Centurion"
  },
  {
    region: "Gauteng",
    name: "BAIC Menlyn",
    address: "C/O Frikkie de Beer & Glen Manor, Menlyn, Pretoria, Menlyn",
    phone: "012 368 8000",
    email: "dp@bbmenlyn.co.za",
    website: "",
    map_link: "https://maps.google.com/?q=C/O+Frikkie+de+Beer+&+Glen+Manor,+Menlyn,+Pretoria,+Menlyn"
  },
  {
    region: "Gauteng",
    name: "BAIC Fourways",
    address: "Shop 5 Fourways Junction, 26 White Hills Close, Fourways, Sandton, 2000, Fourways",
    phone: "010 510 5085",
    email: "info@baicfourways.co.za",
    website: "www.driver1.co.za",
    map_link: "https://maps.google.com/?q=Shop+5+Fourways+Junction,+26+White+Hills+Close,+Fourways,+Sandton,+2000,+Fourways"
  },
  {
    region: "Gauteng",
    name: "BAIC Edenvale",
    address: "142 Van Riebeeck Avenue, Edenvale, 1610",
    phone: "010 448 8420",
    email: "sales10a@grp1.co.za",
    website: "",
    map_link: "https://maps.google.com/?q=142+Van+Riebeeck+Avenue,+Edenvale,+1610"
  },
  {
    region: "Gauteng",
    name: "BAIC Springs",
    address: "143 2nd St, Springs, 1559, Springs",
    phone: "010 634 1490",
    email: "workshop@baicnigel.co.za",
    website: "www.springsbaic.co.za",
    map_link: "https://maps.google.com/?q=143+2nd+St,+Springs,+1559,+Springs"
  },
  {
    region: "Gauteng",
    name: "BAIC Boksburg",
    address: "5 Bental Avenue, Jansen Park, Boksburg, Boksburg",
    phone: "010 591 6602",
    email: "info@mobilisauto.co.za",
    website: "",
    map_link: "https://maps.google.com/?q=5+Bental+Avenue,+Jansen+Park,+Boksburg,+Boksburg"
  },
  {
    region: "Gauteng",
    name: "BAIC Hatfield",
    address: "Hatfield corner, 1270 Stanza Bopape street, Hatfield, Pretoria",
    phone: "012 952 0786",
    email: "gani@squadcars.co.za; adnaan@squadcars.co.za",
    website: "www.baicpta.co.za",
    map_link: "https://maps.google.com/?q=Hatfield+corner,+1270+Stanza+Bopape+street,+Hatfield,+Pretoria"
  },
  {
    region: "Gauteng",
    name: "BAIC Rustenburg",
    address: "Korokoro St, Waterval East, Rustenburg, 2999",
    phone: "014 940 5700",
    email: "bart.hettema@supergrp.com",
    website: "https://www.baicrustenburg.co.za/",
    map_link: "https://maps.app.goo.gl/AiPYQfGm38JrZrQN7"
  },
  {
    region: "Gauteng",
    name: "BAIC The Glen",
    address: "2 Letaba Rd, Eastcliff, JHB South",
    phone: "011 405 2800",
    email: "asjothun@motus.co.za",
    website: "www.motusbaic.co.za",
    map_link: "https://maps.app.goo.gl/WGjjUM5ERGmwUeYX6"
  },
  // KZN
  {
    region: "KZN",
    name: "BAIC Ladysmith",
    address: "295 Murchison Street, Ladysmith, 3370, Ladysmith",
    phone: "036 637 7837",
    email: "dp@sntr.co.za",
    website: "www.sntr.co.za",
    map_link: "https://maps.google.com/?q=295+Murchison+Street,+Ladysmith,+3370,+Ladysmith"
  },
  {
    region: "KZN",
    name: "BAIC Pinetown",
    address: "55 Josiah Gumede Road, Pinetown., Pinetown",
    phone: "087 007 7777",
    email: "lauram@alpinemotors.co.za",
    website: "www.alpinemotors.co.za",
    map_link: "https://maps.google.com/?q=55+Josiah+Gumede+Road,+Pinetown.,+Pinetown"
  },
  {
    region: "KZN",
    name: "BAIC Richards Bay",
    address: "26 Dollar Drive, Richards Bay, Richards Bay",
    phone: "035 789 0323",
    email: "Andries@midbay.co.za",
    website: "www.midbay.co.za",
    map_link: "https://maps.google.com/?q=26+Dollar+Drive,+Richards+Bay,+Richards+Bay"
  },
  {
    region: "KZN",
    name: "BAIC South Coast",
    address: "3848 Marine Drive, Margate, 4285, Margate",
    phone: "039 312 8200",
    email: "info@scaudivw.co.za",
    website: "www.baicsouthcoast.co.za",
    map_link: "https://maps.google.com/?q=3848+Marine+Drive,+Margate,+4285,+Margate"
  },
  {
    region: "KZN",
    name: "BAIC Umhlanga",
    address: "15A Meridian Drive, Umhlanga,KwaZulu-Natal, Umhlanga",
    phone: "031 584 9600",
    email: "ravi.naidoo@alpinemotors.co.za",
    website: "www.alpinemotors.co.za",
    map_link: "https://maps.google.com/?q=15A+Meridian+Drive,+Umhlanga,KwaZulu-Natal,+Umhlanga"
  },
  {
    region: "KZN",
    name: "BAIC Durban CBD",
    address: "143 Anton Lembede Street, Durban, Durban CBD",
    phone: "031 368 3977",
    email: "mymurchie@gmail.com",
    website: "www.aksonswheels.co.za",
    map_link: "https://maps.google.com/?q=143+Anton+Lembede+Street,+Durban,+Durban+CBD"
  },
  {
    region: "KZN",
    name: "BAIC Pietermaritzburg",
    address: "1 Chatterton Road, Pietermaritzburg, Pietermaritzburg",
    phone: "033 392 8500",
    email: "yusuf@aksonsicar.co.za",
    website: "",
    map_link: "https://maps.google.com/?q=1+Chatterton+Road,+Pietermaritzburg,+Pietermaritzburg"
  },
  // Western Cape
  {
    region: "Western Cape",
    name: "BAIC Malmesbury",
    address: "22 Bokomo Street, Malmesbury, 7299, Malmesbury",
    phone: "022 482 2981",
    email: "info@baicmalmesbury.co.za",
    website: "",
    map_link: "https://maps.google.com/?q=22+Bokomo+Street,+Malmesbury,+7299,+Malmesbury"
  },
  {
    region: "Western Cape",
    name: "BAIC Brackenfell",
    address: "cnr Paradys & Old Paarl Road, Brackenfell, Western Cape, Western Cape",
    phone: "021 982 4575",
    email: "koos@tata-cape.co.za",
    website: "www.jmccape.co.za",
    map_link: "https://maps.google.com/?q=cnr+Paradys+&+Old+Paarl+Road,+Brackenfell,+Western+Cape,+Western+Cape"
  },
  {
    region: "Western Cape",
    name: "BAIC Plumstead",
    address: "15 Main Road, Plumstead, Plumstead",
    phone: "021 001 4411",
    email: "william@williamsimpson.co.za",
    website: "www.williamsimpson.co.za",
    map_link: "https://maps.google.com/?q=15+Main+Road,+Plumstead,+Plumstead"
  },
  {
    region: "Western Cape",
    name: "BAIC Century City",
    address: "Pod 2, Canal Walk Shopping Centre, Century City, Cape Town, Century City",
    phone: "021 569 2555",
    email: "jason@mekor.co.za",
    website: "",
    map_link: "https://maps.google.com/?q=Pod+2,+Canal+Walk+Shopping+Centre,+Century+City,+Cape+Town,+Century+City"
  },
  {
    region: "Western Cape",
    name: "BAIC Table View",
    address: "Engen Rietvlei, 2 Pentz Drive, Table View, Cape Town, 7441, Table View",
    phone: "082 656 1444",
    email: "keithbrown.cpt@gmail.com",
    website: "",
    map_link: "https://maps.google.com/?q=Engen+Rietvlei,+2+Pentz+Drive,+Table+View,+Cape+Town,+7441,+Table+View"
  },
  {
    region: "Western Cape",
    name: "BAIC Somerset West",
    address: "11 Victoria Street, Somerset West, 7129, Somerset West",
    phone: "021 851 3333",
    email: "",
    website: "",
    map_link: "https://maps.google.com/?q=11+Victoria+Street,+Somerset+West,+7129,+Somerset+West"
  },
  {
    region: "Western Cape",
    name: "BAIC Stellenbosch",
    address: "1 Jan Celliers Road, Stellenbosch Central, Stellenbosch",
    phone: "021 887 6900",
    email: "dpns@grp1.co.za",
    website: "http://www.group1auto.co.za/",
    map_link: "https://maps.google.com/?q=1+Jan+Celliers+Road,+Stellenbosch+Central,+Stellenbosch"
  },
  {
    region: "Western Cape",
    name: "BAIC George",
    address: "Kaaimans Blvd & 4 Knysna Road, George, George",
    phone: "044 813 0600",
    email: "shaun.lo@tavcor.co.za",
    website: "www.tavcormotorgroup.co.za",
    map_link: "https://maps.google.com/?q=Kaaimans+Blvd+&+4+Knysna+Road,+George,+George"
  },
  // Free State
  {
    region: "Free State",
    name: "BAIC Bethlehem",
    address: "Corner of Muller and Commissioner Streets, Bethlehem, 9701, Bethlehem",
    phone: "058 303 3600",
    email: "trevor@scottgroup.co.za",
    website: "www.scottgroup.co.za",
    map_link: "https://maps.google.com/?q=Corner+of+Muller+and+Commissioner+Streets,+Bethlehem,+9701,+Bethlehem"
  },
  {
    region: "Free State",
    name: "BAIC Bloemfontein",
    address: "59 OR Tambo Street, Bloemfontein, 9301, Bloemfontein",
    phone: "051 001 0073",
    email: "vhjohann@mweb.co.za",
    website: "www.usedcarsforsalebloemfontein.co.za",
    map_link: "https://maps.google.com/?q=59+OR+Tambo+Street,+Bloemfontein,+9301,+Bloemfontein"
  },
  {
    region: "Free State",
    name: "BAIC Welkom",
    address: "281 Koppie Alleen Road, ReitzPark, Welkom, 9459, Welkom",
    phone: "057 050 0050",
    email: "service@celsumm.co.za",
    website: "",
    map_link: "https://maps.google.com/?q=281+Koppie+Alleen+Road,+ReitzPark,+Welkom,+9459,+Welkom"
  },
  // Limpopo
  {
    region: "Limpopo",
    name: "BAIC Polokwane",
    address: "Cnr Landros Mare and Rissik Stree, Polokwane, Polokwane",
    phone: "015 297 4823",
    email: "service@bbmazdapol.co.za",
    website: "",
    map_link: "https://maps.google.com/?q=Cnr+Landros+Mare+and+Rissik+Stree,+Polokwane,+Polokwane"
  },
  {
    region: "Limpopo",
    name: "BAIC Tzaneen",
    address: "26 Skirving Street, Tzaneen, Tzaneen",
    phone: "015 307 3740",
    email: "dp@bbtzn.co.za",
    website: "",
    map_link: "https://maps.google.com/?q=26+Skirving+Street,+Tzaneen,+Tzaneen"
  },
  {
    region: "Limpopo",
    name: "BAIC Mount Fuji",
    address: "141 Krogh Street, Louis Trichardt, Louis Trichardt",
    phone: "015 516 0294",
    email: "dp@bbmountfuji.co.za",
    website: "",
    map_link: "https://maps.google.com/?q=141+Krogh+Street,+Louis+Trichardt,+Louis+Trichardt"
  },
  {
    region: "Limpopo",
    name: "BAIC Mokopane",
    address: "19 Thabo Mbeki Drive, Mokopane",
    phone: "015 491 1000/ 084 860 8925",
    email: "",
    website: "www.Baicmokopane.co.za",
    map_link: "https://maps.google.com/?q=19+Thabo+Mbeki+Drive,+Mokopane"
  },
  // Eastern Cape
  {
    region: "Eastern Cape",
    name: "BAIC Port Elizabeth",
    address: "81 Perkins Street, North End, Port Elizabeth, 6001, Port Elizabeth",
    phone: "041 395 8200",
    email: "vinesh.ba@tavcor.co.za",
    website: "https://www.tavcorautosales.co.za/baic/",
    map_link: "https://maps.google.com/?q=81+Perkins+Street,+North+End,+Port+Elizabeth,+6001,+Port+Elizabeth"
  },
  {
    region: "Eastern Cape",
    name: "BAIC East London",
    address: "106 Main Road, Amalinda, East London, East London",
    phone: "043 050 1031",
    email: "nate@natescarsales.co.za",
    website: "www.natescarsales.co.za",
    map_link: "https://maps.google.com/?q=106+Main+Road,+Amalinda,+East+London,+East+London"
  },
  // Mpumalanga
  {
    region: "Mpumalanga",
    name: "BAIC Mbombela",
    address: "6 Naaldekoker Crescent, Riverside, Mbombela, Mbombela",
    phone: "013 756 4444",
    email: "dvstaden@alanhudson.co.za",
    website: "",
    map_link: "https://maps.google.com/?q=6+Naaldekoker+Crescent,+Riverside,+Mbombela,+Mbombela"
  },
  {
    region: "Mpumalanga",
    name: "BAIC Witbank",
    address: "Cnr Clive Blenchman & Mandela Drive, Witbank, 1035, Witbank",
    phone: "013 656 1511",
    email: "paulg@eastvaal.co.za",
    website: "",
    map_link: "https://maps.google.com/?q=Cnr+Clive+Blenchman+&+Mandela+Drive,+Witbank,+1035,+Witbank"
  },
  {
    region: "Mpumalanga",
    name: "BAIC Ermelo",
    address: "20 Kerk Street, Ermelo, 2350, Ermelo",
    phone: "017 492 0166",
    email: "sales@baicermelo.co.za",
    website: "",
    map_link: "https://maps.google.com/?q=20+Kerk+Street,+Ermelo,+2350,+Ermelo"
  },
  // Northern Cape
  {
    region: "Northern Cape",
    name: "BAIC Kimberley",
    address: "59 Pniel Road, Kimberley, Kimberley",
    phone: "053 807 4300",
    email: "reenoc@groupmorgan.co.za",
    website: "",
    map_link: "https://maps.google.com/?q=59+Pniel+Road,+Kimberley,+Kimberley"
  },
  // North West
  {
    region: "North West",
    name: "BAIC Klerksdorp",
    address: "N12 Highway, Stilfontein, North West, Stilfontein",
    phone: "081 062 6741",
    email: "baickldsales@gmail.com",
    website: "www.mmu-motors.co.za",
    map_link: "https://maps.google.com/?q=N12+Highway,+Stilfontein,+North+West,+Stilfontein"
  },
  // Botswana
  {
    region: "Botswana",
    name: "BAIC Botswana Gaborone CML Motors",
    address: "Plot 5664 Kubu Road, Broadhurst Industrial, Gaborone, Gabrone",
    phone: "(+267) 395 2652 / 241 0977",
    email: "akhtar@commercialmotors.co.bw",
    website: "",
    map_link: "https://maps.google.com/?q=Plot+5664+Kubu+Road,+Broadhurst+Industrial,+Gaborone,+Gabrone"
  }
];

// Available regions for filtering
const REGIONS = [
  "All Regions",
  "Gauteng",
  "KZN",
  "Western Cape",
  "Free State",
  "Limpopo",
  "Eastern Cape",
  "Mpumalanga",
  "Northern Cape",
  "North West",
  "Botswana"
];

const FindDealerPage = () => {
  const [selectedRegion, setSelectedRegion] = useState("All Regions");
  const [filteredDealerships, setFilteredDealerships] = useState(BAIC_DEALERSHIPS);
  
  // Filter dealerships when region changes
  useEffect(() => {
    if (selectedRegion === "All Regions") {
      setFilteredDealerships(BAIC_DEALERSHIPS);
    } else {
      const filtered = BAIC_DEALERSHIPS.filter(dealer => dealer.region === selectedRegion);
      setFilteredDealerships(filtered);
    }
  }, [selectedRegion]);
  
  // Handle region change
  const handleRegionChange = (e) => {
    setSelectedRegion(e.target.value);
  };
  
  // Handle search form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Additional search functionality can be added here if needed
  };
  
  return (
    <PageContainer>
      <PageHeader>
        <Title>Find a Dealer</Title>
        <Subtitle>
          Locate your nearest BAIC dealership to explore our range of vehicles, 
          book a test drive, or get expert assistance from our dedicated team.
        </Subtitle>
      </PageHeader>
      
      <SearchSection>
        <SearchForm onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="region">Select Region</Label>
            <Select 
              id="region" 
              value={selectedRegion} 
              onChange={handleRegionChange}
            >
              {REGIONS.map((region, index) => (
                <option key={index} value={region}>{region}</option>
              ))}
            </Select>
          </FormGroup>
          <Button type="submit">Search</Button>
        </SearchForm>
      </SearchSection>
      
      <ResultsSection>
        <ResultsGrid>
          {filteredDealerships.map((dealer, index) => (
            <DealerCard key={index}>
              <DealerHeader>
                <DealerName>{dealer.name}</DealerName>
                <DealerRegion>{dealer.region}</DealerRegion>
              </DealerHeader>
              <DealerBody>
                <DealerInfo>
                  <DealerAddress>{dealer.address}</DealerAddress>
                  <DealerContact>
                    Phone: <a href={`tel:${dealer.phone}`}>{dealer.phone}</a>
                  </DealerContact>
                  {dealer.email && (
                    <DealerContact>
                      Email: <a href={`mailto:${dealer.email}`}>{dealer.email}</a>
                    </DealerContact>
                  )}
                  {dealer.website && (
                    <DealerWebsite>
                      Website: <a href={`https://${dealer.website.replace(/^https?:\/\//, '')}`} target="_blank" rel="noopener noreferrer">
                        {dealer.website}
                      </a>
                    </DealerWebsite>
                  )}
                </DealerInfo>
                <DealerActions>
                  <DealerButton href={dealer.map_link} target="_blank" rel="noopener noreferrer">
                    Get Directions
                  </DealerButton>
                </DealerActions>
              </DealerBody>
            </DealerCard>
          ))}
        </ResultsGrid>
      </ResultsSection>
    </PageContainer>
  );
};

export default FindDealerPage;
