import '../../@polymer/polymer/polymer.js';
import { Polymer as Polymer$0 } from '../../@polymer/polymer/lib/legacy/polymer-fn.js';

var currencyList = 
    {
        "ISO_4217": {
            "CcyTbl": {
                "CcyNtry": [
                    {
                        "CcyNm": "Afghani",
                        "CcyMnrUnts": "2",
                        "Ccy": "AFN",
                        "CcyNbr": "971",
                        "CtryNm": "AFGHANISTAN"
                    },
                    {
                        "CcyNm": "Euro",
                        "CcyMnrUnts": "2",
                        "Ccy": "EUR",
                        "CcyNbr": "978",
                        "CtryNm": "ÅLAND ISLANDS"
                    },
                    {
                        "CcyNm": "Lek",
                        "CcyMnrUnts": "2",
                        "Ccy": "ALL",
                        "CcyNbr": "008",
                        "CtryNm": "ALBANIA"
                    },
                    {
                        "CcyNm": "Algerian Dinar",
                        "CcyMnrUnts": "2",
                        "Ccy": "DZD",
                        "CcyNbr": "012",
                        "CtryNm": "ALGERIA"
                    },
                    {
                        "CcyNm": "US Dollar",
                        "CcyMnrUnts": "2",
                        "Ccy": "USD",
                        "CcyNbr": "840",
                        "CtryNm": "AMERICAN SAMOA"
                    },
                    {
                        "CcyNm": "Euro",
                        "CcyMnrUnts": "2",
                        "Ccy": "EUR",
                        "CcyNbr": "978",
                        "CtryNm": "ANDORRA"
                    },
                    {
                        "CcyNm": "Kwanza",
                        "CcyMnrUnts": "2",
                        "Ccy": "AOA",
                        "CcyNbr": "973",
                        "CtryNm": "ANGOLA"
                    },
                    {
                        "CcyNm": "East Caribbean Dollar",
                        "CcyMnrUnts": "2",
                        "Ccy": "XCD",
                        "CcyNbr": "951",
                        "CtryNm": "ANGUILLA"
                    },
                    {
                        "CcyNm": "No universal currency",
                        "CtryNm": "ANTARCTICA"
                    },
                    {
                        "CcyNm": "East Caribbean Dollar",
                        "CcyMnrUnts": "2",
                        "Ccy": "XCD",
                        "CcyNbr": "951",
                        "CtryNm": "ANTIGUA AND BARBUDA"
                    },
                    {
                        "CcyNm": "Argentine Peso",
                        "CcyMnrUnts": "2",
                        "Ccy": "ARS",
                        "CcyNbr": "032",
                        "CtryNm": "ARGENTINA"
                    },
                    {
                        "CcyNm": "Armenian Dram",
                        "CcyMnrUnts": "2",
                        "Ccy": "AMD",
                        "CcyNbr": "051",
                        "CtryNm": "ARMENIA"
                    },
                    {
                        "CcyNm": "Aruban Florin",
                        "CcyMnrUnts": "2",
                        "Ccy": "AWG",
                        "CcyNbr": "533",
                        "CtryNm": "ARUBA"
                    },
                    {
                        "CcyNm": "Australian Dollar",
                        "CcyMnrUnts": "2",
                        "Ccy": "AUD",
                        "CcyNbr": "036",
                        "CtryNm": "AUSTRALIA"
                    },
                    {
                        "CcyNm": "Euro",
                        "CcyMnrUnts": "2",
                        "Ccy": "EUR",
                        "CcyNbr": "978",
                        "CtryNm": "AUSTRIA"
                    },
                    {
                        "CcyNm": "Azerbaijanian Manat",
                        "CcyMnrUnts": "2",
                        "Ccy": "AZN",
                        "CcyNbr": "944",
                        "CtryNm": "AZERBAIJAN"
                    },
                    {
                        "CcyNm": "Bahamian Dollar",
                        "CcyMnrUnts": "2",
                        "Ccy": "BSD",
                        "CcyNbr": "044",
                        "CtryNm": "BAHAMAS (THE)"
                    },
                    {
                        "CcyNm": "Bahraini Dinar",
                        "CcyMnrUnts": "3",
                        "Ccy": "BHD",
                        "CcyNbr": "048",
                        "CtryNm": "BAHRAIN"
                    },
                    {
                        "CcyNm": "Taka",
                        "CcyMnrUnts": "2",
                        "Ccy": "BDT",
                        "CcyNbr": "050",
                        "CtryNm": "BANGLADESH"
                    },
                    {
                        "CcyNm": "Barbados Dollar",
                        "CcyMnrUnts": "2",
                        "Ccy": "BBD",
                        "CcyNbr": "052",
                        "CtryNm": "BARBADOS"
                    },
                    {
                        "CcyNm": "Belarussian Ruble",
                        "CcyMnrUnts": "0",
                        "Ccy": "BYR",
                        "CcyNbr": "974",
                        "CtryNm": "BELARUS"
                    },
                    {
                        "CcyNm": "Euro",
                        "CcyMnrUnts": "2",
                        "Ccy": "EUR",
                        "CcyNbr": "978",
                        "CtryNm": "BELGIUM"
                    },
                    {
                        "CcyNm": "Belize Dollar",
                        "CcyMnrUnts": "2",
                        "Ccy": "BZD",
                        "CcyNbr": "084",
                        "CtryNm": "BELIZE"
                    },
                    {
                        "CcyNm": "CFA Franc BCEAO",
                        "CcyMnrUnts": "0",
                        "Ccy": "XOF",
                        "CcyNbr": "952",
                        "CtryNm": "BENIN"
                    },
                    {
                        "CcyNm": "Bermudian Dollar",
                        "CcyMnrUnts": "2",
                        "Ccy": "BMD",
                        "CcyNbr": "060",
                        "CtryNm": "BERMUDA"
                    },
                    {
                        "CcyNm": "Ngultrum",
                        "CcyMnrUnts": "2",
                        "Ccy": "BTN",
                        "CcyNbr": "064",
                        "CtryNm": "BHUTAN"
                    },
                    {
                        "CcyNm": "Indian Rupee",
                        "CcyMnrUnts": "2",
                        "Ccy": "INR",
                        "CcyNbr": "356",
                        "CtryNm": "BHUTAN"
                    },
                    {
                        "CcyNm": "Boliviano",
                        "CcyMnrUnts": "2",
                        "Ccy": "BOB",
                        "CcyNbr": "068",
                        "CtryNm": "BOLIVIA (PLURINATIONAL STATE OF)"
                    },
                    {
                        "CcyNm": "Mvdol",
                        "CcyMnrUnts": "2",
                        "Ccy": "BOV",
                        "CcyNbr": "984",
                        "CtryNm": "BOLIVIA (PLURINATIONAL STATE OF)"
                    },
                    {
                        "CcyNm": "US Dollar",
                        "CcyMnrUnts": "2",
                        "Ccy": "USD",
                        "CcyNbr": "840",
                        "CtryNm": "BONAIRE, SINT EUSTATIUS AND SABA"
                    },
                    {
                        "CcyNm": "Convertible Mark",
                        "CcyMnrUnts": "2",
                        "Ccy": "BAM",
                        "CcyNbr": "977",
                        "CtryNm": "BOSNIA AND HERZEGOVINA"
                    },
                    {
                        "CcyNm": "Pula",
                        "CcyMnrUnts": "2",
                        "Ccy": "BWP",
                        "CcyNbr": "072",
                        "CtryNm": "BOTSWANA"
                    },
                    {
                        "CcyNm": "Norwegian Krone",
                        "CcyMnrUnts": "2",
                        "Ccy": "NOK",
                        "CcyNbr": "578",
                        "CtryNm": "BOUVET ISLAND"
                    },
                    {
                        "CcyNm": "Brazilian Real",
                        "CcyMnrUnts": "2",
                        "Ccy": "BRL",
                        "CcyNbr": "986",
                        "CtryNm": "BRAZIL"
                    },
                    {
                        "CcyNm": "US Dollar",
                        "CcyMnrUnts": "2",
                        "Ccy": "USD",
                        "CcyNbr": "840",
                        "CtryNm": "BRITISH INDIAN OCEAN TERRITORY (THE)"
                    },
                    {
                        "CcyNm": "Brunei Dollar",
                        "CcyMnrUnts": "2",
                        "Ccy": "BND",
                        "CcyNbr": "096",
                        "CtryNm": "BRUNEI DARUSSALAM"
                    },
                    {
                        "CcyNm": "Bulgarian Lev",
                        "CcyMnrUnts": "2",
                        "Ccy": "BGN",
                        "CcyNbr": "975",
                        "CtryNm": "BULGARIA"
                    },
                    {
                        "CcyNm": "CFA Franc BCEAO",
                        "CcyMnrUnts": "0",
                        "Ccy": "XOF",
                        "CcyNbr": "952",
                        "CtryNm": "BURKINA FASO"
                    },
                    {
                        "CcyNm": "Burundi Franc",
                        "CcyMnrUnts": "0",
                        "Ccy": "BIF",
                        "CcyNbr": "108",
                        "CtryNm": "BURUNDI"
                    },
                    {
                        "CcyNm": "Cabo Verde Escudo",
                        "CcyMnrUnts": "2",
                        "Ccy": "CVE",
                        "CcyNbr": "132",
                        "CtryNm": "CABO VERDE"
                    },
                    {
                        "CcyNm": "Riel",
                        "CcyMnrUnts": "2",
                        "Ccy": "KHR",
                        "CcyNbr": "116",
                        "CtryNm": "CAMBODIA"
                    },
                    {
                        "CcyNm": "CFA Franc BEAC",
                        "CcyMnrUnts": "0",
                        "Ccy": "XAF",
                        "CcyNbr": "950",
                        "CtryNm": "CAMEROON"
                    },
                    {
                        "CcyNm": "Canadian Dollar",
                        "CcyMnrUnts": "2",
                        "Ccy": "CAD",
                        "CcyNbr": "124",
                        "CtryNm": "CANADA"
                    },
                    {
                        "CcyNm": "Cayman Islands Dollar",
                        "CcyMnrUnts": "2",
                        "Ccy": "KYD",
                        "CcyNbr": "136",
                        "CtryNm": "CAYMAN ISLANDS (THE)"
                    },
                    {
                        "CcyNm": "CFA Franc BEAC",
                        "CcyMnrUnts": "0",
                        "Ccy": "XAF",
                        "CcyNbr": "950",
                        "CtryNm": "CENTRAL AFRICAN REPUBLIC (THE)"
                    },
                    {
                        "CcyNm": "CFA Franc BEAC",
                        "CcyMnrUnts": "0",
                        "Ccy": "XAF",
                        "CcyNbr": "950",
                        "CtryNm": "CHAD"
                    },
                    {
                        "CcyNm": "Unidad de Fomento",
                        "CcyMnrUnts": "4",
                        "Ccy": "CLF",
                        "CcyNbr": "990",
                        "CtryNm": "CHILE"
                    },
                    {
                        "CcyNm": "Chilean Peso",
                        "CcyMnrUnts": "0",
                        "Ccy": "CLP",
                        "CcyNbr": "152",
                        "CtryNm": "CHILE"
                    },
                    {
                        "CcyNm": "Yuan Renminbi",
                        "CcyMnrUnts": "2",
                        "Ccy": "CNY",
                        "CcyNbr": "156",
                        "CtryNm": "CHINA"
                    },
                    {
                        "CcyNm": "Australian Dollar",
                        "CcyMnrUnts": "2",
                        "Ccy": "AUD",
                        "CcyNbr": "036",
                        "CtryNm": "CHRISTMAS ISLAND"
                    },
                    {
                        "CcyNm": "Australian Dollar",
                        "CcyMnrUnts": "2",
                        "Ccy": "AUD",
                        "CcyNbr": "036",
                        "CtryNm": "COCOS (KEELING) ISLANDS (THE)"
                    },
                    {
                        "CcyNm": "Colombian Peso",
                        "CcyMnrUnts": "2",
                        "Ccy": "COP",
                        "CcyNbr": "170",
                        "CtryNm": "COLOMBIA"
                    },
                    {
                        "CcyNm": "Unidad de Valor Real",
                        "CcyMnrUnts": "2",
                        "Ccy": "COU",
                        "CcyNbr": "970",
                        "CtryNm": "COLOMBIA"
                    },
                    {
                        "CcyNm": "Comoro Franc",
                        "CcyMnrUnts": "0",
                        "Ccy": "KMF",
                        "CcyNbr": "174",
                        "CtryNm": "COMOROS (THE)"
                    },
                    {
                        "CcyNm": "Congolese Franc",
                        "CcyMnrUnts": "2",
                        "Ccy": "CDF",
                        "CcyNbr": "976",
                        "CtryNm": "CONGO (THE DEMOCRATIC REPUBLIC OF THE)"
                    },
                    {
                        "CcyNm": "CFA Franc BEAC",
                        "CcyMnrUnts": "0",
                        "Ccy": "XAF",
                        "CcyNbr": "950",
                        "CtryNm": "CONGO (THE)"
                    },
                    {
                        "CcyNm": "New Zealand Dollar",
                        "CcyMnrUnts": "2",
                        "Ccy": "NZD",
                        "CcyNbr": "554",
                        "CtryNm": "COOK ISLANDS (THE)"
                    },
                    {
                        "CcyNm": "Costa Rican Colon",
                        "CcyMnrUnts": "2",
                        "Ccy": "CRC",
                        "CcyNbr": "188",
                        "CtryNm": "COSTA RICA"
                    },
                    {
                        "CcyNm": "CFA Franc BCEAO",
                        "CcyMnrUnts": "0",
                        "Ccy": "XOF",
                        "CcyNbr": "952",
                        "CtryNm": "CÔTE D'IVOIRE"
                    },
                    {
                        "CcyNm": "Kuna",
                        "CcyMnrUnts": "2",
                        "Ccy": "HRK",
                        "CcyNbr": "191",
                        "CtryNm": "CROATIA"
                    },
                    {
                        "CcyNm": "Peso Convertible",
                        "CcyMnrUnts": "2",
                        "Ccy": "CUC",
                        "CcyNbr": "931",
                        "CtryNm": "CUBA"
                    },
                    {
                        "CcyNm": "Cuban Peso",
                        "CcyMnrUnts": "2",
                        "Ccy": "CUP",
                        "CcyNbr": "192",
                        "CtryNm": "CUBA"
                    },
                    {
                        "CcyNm": "Netherlands Antillean Guilder",
                        "CcyMnrUnts": "2",
                        "Ccy": "ANG",
                        "CcyNbr": "532",
                        "CtryNm": "CURAÇAO"
                    },
                    {
                        "CcyNm": "Euro",
                        "CcyMnrUnts": "2",
                        "Ccy": "EUR",
                        "CcyNbr": "978",
                        "CtryNm": "CYPRUS"
                    },
                    {
                        "CcyNm": "Czech Koruna",
                        "CcyMnrUnts": "2",
                        "Ccy": "CZK",
                        "CcyNbr": "203",
                        "CtryNm": "CZECH REPUBLIC (THE)"
                    },
                    {
                        "CcyNm": "Danish Krone",
                        "CcyMnrUnts": "2",
                        "Ccy": "DKK",
                        "CcyNbr": "208",
                        "CtryNm": "DENMARK"
                    },
                    {
                        "CcyNm": "Djibouti Franc",
                        "CcyMnrUnts": "0",
                        "Ccy": "DJF",
                        "CcyNbr": "262",
                        "CtryNm": "DJIBOUTI"
                    },
                    {
                        "CcyNm": "East Caribbean Dollar",
                        "CcyMnrUnts": "2",
                        "Ccy": "XCD",
                        "CcyNbr": "951",
                        "CtryNm": "DOMINICA"
                    },
                    {
                        "CcyNm": "Dominican Peso",
                        "CcyMnrUnts": "2",
                        "Ccy": "DOP",
                        "CcyNbr": "214",
                        "CtryNm": "DOMINICAN REPUBLIC (THE)"
                    },
                    {
                        "CcyNm": "US Dollar",
                        "CcyMnrUnts": "2",
                        "Ccy": "USD",
                        "CcyNbr": "840",
                        "CtryNm": "ECUADOR"
                    },
                    {
                        "CcyNm": "Egyptian Pound",
                        "CcyMnrUnts": "2",
                        "Ccy": "EGP",
                        "CcyNbr": "818",
                        "CtryNm": "EGYPT"
                    },
                    {
                        "CcyNm": "El Salvador Colon",
                        "CcyMnrUnts": "2",
                        "Ccy": "SVC",
                        "CcyNbr": "222",
                        "CtryNm": "EL SALVADOR"
                    },
                    {
                        "CcyNm": "US Dollar",
                        "CcyMnrUnts": "2",
                        "Ccy": "USD",
                        "CcyNbr": "840",
                        "CtryNm": "EL SALVADOR"
                    },
                    {
                        "CcyNm": "CFA Franc BEAC",
                        "CcyMnrUnts": "0",
                        "Ccy": "XAF",
                        "CcyNbr": "950",
                        "CtryNm": "EQUATORIAL GUINEA"
                    },
                    {
                        "CcyNm": "Nakfa",
                        "CcyMnrUnts": "2",
                        "Ccy": "ERN",
                        "CcyNbr": "232",
                        "CtryNm": "ERITREA"
                    },
                    {
                        "CcyNm": "Euro",
                        "CcyMnrUnts": "2",
                        "Ccy": "EUR",
                        "CcyNbr": "978",
                        "CtryNm": "ESTONIA"
                    },
                    {
                        "CcyNm": "Ethiopian Birr",
                        "CcyMnrUnts": "2",
                        "Ccy": "ETB",
                        "CcyNbr": "230",
                        "CtryNm": "ETHIOPIA"
                    },
                    {
                        "CcyNm": "Euro",
                        "CcyMnrUnts": "2",
                        "Ccy": "EUR",
                        "CcyNbr": "978",
                        "CtryNm": "EUROPEAN UNION"
                    },
                    {
                        "CcyNm": "Falkland Islands Pound",
                        "CcyMnrUnts": "2",
                        "Ccy": "FKP",
                        "CcyNbr": "238",
                        "CtryNm": "FALKLAND ISLANDS (THE) [MALVINAS]"
                    },
                    {
                        "CcyNm": "Danish Krone",
                        "CcyMnrUnts": "2",
                        "Ccy": "DKK",
                        "CcyNbr": "208",
                        "CtryNm": "FAROE ISLANDS (THE)"
                    },
                    {
                        "CcyNm": "Fiji Dollar",
                        "CcyMnrUnts": "2",
                        "Ccy": "FJD",
                        "CcyNbr": "242",
                        "CtryNm": "FIJI"
                    },
                    {
                        "CcyNm": "Euro",
                        "CcyMnrUnts": "2",
                        "Ccy": "EUR",
                        "CcyNbr": "978",
                        "CtryNm": "FINLAND"
                    },
                    {
                        "CcyNm": "Euro",
                        "CcyMnrUnts": "2",
                        "Ccy": "EUR",
                        "CcyNbr": "978",
                        "CtryNm": "FRANCE"
                    },
                    {
                        "CcyNm": "Euro",
                        "CcyMnrUnts": "2",
                        "Ccy": "EUR",
                        "CcyNbr": "978",
                        "CtryNm": "FRENCH GUIANA"
                    },
                    {
                        "CcyNm": "CFP Franc",
                        "CcyMnrUnts": "0",
                        "Ccy": "XPF",
                        "CcyNbr": "953",
                        "CtryNm": "FRENCH POLYNESIA"
                    },
                    {
                        "CcyNm": "Euro",
                        "CcyMnrUnts": "2",
                        "Ccy": "EUR",
                        "CcyNbr": "978",
                        "CtryNm": "FRENCH SOUTHERN TERRITORIES (THE)"
                    },
                    {
                        "CcyNm": "CFA Franc BEAC",
                        "CcyMnrUnts": "0",
                        "Ccy": "XAF",
                        "CcyNbr": "950",
                        "CtryNm": "GABON"
                    },
                    {
                        "CcyNm": "Dalasi",
                        "CcyMnrUnts": "2",
                        "Ccy": "GMD",
                        "CcyNbr": "270",
                        "CtryNm": "GAMBIA (THE)"
                    },
                    {
                        "CcyNm": "Lari",
                        "CcyMnrUnts": "2",
                        "Ccy": "GEL",
                        "CcyNbr": "981",
                        "CtryNm": "GEORGIA"
                    },
                    {
                        "CcyNm": "Euro",
                        "CcyMnrUnts": "2",
                        "Ccy": "EUR",
                        "CcyNbr": "978",
                        "CtryNm": "GERMANY"
                    },
                    {
                        "CcyNm": "Ghana Cedi",
                        "CcyMnrUnts": "2",
                        "Ccy": "GHS",
                        "CcyNbr": "936",
                        "CtryNm": "GHANA"
                    },
                    {
                        "CcyNm": "Gibraltar Pound",
                        "CcyMnrUnts": "2",
                        "Ccy": "GIP",
                        "CcyNbr": "292",
                        "CtryNm": "GIBRALTAR"
                    },
                    {
                        "CcyNm": "Euro",
                        "CcyMnrUnts": "2",
                        "Ccy": "EUR",
                        "CcyNbr": "978",
                        "CtryNm": "GREECE"
                    },
                    {
                        "CcyNm": "Danish Krone",
                        "CcyMnrUnts": "2",
                        "Ccy": "DKK",
                        "CcyNbr": "208",
                        "CtryNm": "GREENLAND"
                    },
                    {
                        "CcyNm": "East Caribbean Dollar",
                        "CcyMnrUnts": "2",
                        "Ccy": "XCD",
                        "CcyNbr": "951",
                        "CtryNm": "GRENADA"
                    },
                    {
                        "CcyNm": "Euro",
                        "CcyMnrUnts": "2",
                        "Ccy": "EUR",
                        "CcyNbr": "978",
                        "CtryNm": "GUADELOUPE"
                    },
                    {
                        "CcyNm": "US Dollar",
                        "CcyMnrUnts": "2",
                        "Ccy": "USD",
                        "CcyNbr": "840",
                        "CtryNm": "GUAM"
                    },
                    {
                        "CcyNm": "Quetzal",
                        "CcyMnrUnts": "2",
                        "Ccy": "GTQ",
                        "CcyNbr": "320",
                        "CtryNm": "GUATEMALA"
                    },
                    {
                        "CcyNm": "Pound Sterling",
                        "CcyMnrUnts": "2",
                        "Ccy": "GBP",
                        "CcyNbr": "826",
                        "CtryNm": "GUERNSEY"
                    },
                    {
                        "CcyNm": "Guinea Franc",
                        "CcyMnrUnts": "0",
                        "Ccy": "GNF",
                        "CcyNbr": "324",
                        "CtryNm": "GUINEA"
                    },
                    {
                        "CcyNm": "CFA Franc BCEAO",
                        "CcyMnrUnts": "0",
                        "Ccy": "XOF",
                        "CcyNbr": "952",
                        "CtryNm": "GUINEA-BISSAU"
                    },
                    {
                        "CcyNm": "Guyana Dollar",
                        "CcyMnrUnts": "2",
                        "Ccy": "GYD",
                        "CcyNbr": "328",
                        "CtryNm": "GUYANA"
                    },
                    {
                        "CcyNm": "Gourde",
                        "CcyMnrUnts": "2",
                        "Ccy": "HTG",
                        "CcyNbr": "332",
                        "CtryNm": "HAITI"
                    },
                    {
                        "CcyNm": "US Dollar",
                        "CcyMnrUnts": "2",
                        "Ccy": "USD",
                        "CcyNbr": "840",
                        "CtryNm": "HAITI"
                    },
                    {
                        "CcyNm": "Australian Dollar",
                        "CcyMnrUnts": "2",
                        "Ccy": "AUD",
                        "CcyNbr": "036",
                        "CtryNm": "HEARD ISLAND AND McDONALD ISLANDS"
                    },
                    {
                        "CcyNm": "Euro",
                        "CcyMnrUnts": "2",
                        "Ccy": "EUR",
                        "CcyNbr": "978",
                        "CtryNm": "HOLY SEE (THE)"
                    },
                    {
                        "CcyNm": "Lempira",
                        "CcyMnrUnts": "2",
                        "Ccy": "HNL",
                        "CcyNbr": "340",
                        "CtryNm": "HONDURAS"
                    },
                    {
                        "CcyNm": "Hong Kong Dollar",
                        "CcyMnrUnts": "2",
                        "Ccy": "HKD",
                        "CcyNbr": "344",
                        "CtryNm": "HONG KONG"
                    },
                    {
                        "CcyNm": "Forint",
                        "CcyMnrUnts": "2",
                        "Ccy": "HUF",
                        "CcyNbr": "348",
                        "CtryNm": "HUNGARY"
                    },
                    {
                        "CcyNm": "Iceland Krona",
                        "CcyMnrUnts": "0",
                        "Ccy": "ISK",
                        "CcyNbr": "352",
                        "CtryNm": "ICELAND"
                    },
                    {
                        "CcyNm": "Indian Rupee",
                        "CcyMnrUnts": "2",
                        "Ccy": "INR",
                        "CcyNbr": "356",
                        "CtryNm": "INDIA"
                    },
                    {
                        "CcyNm": "Rupiah",
                        "CcyMnrUnts": "2",
                        "Ccy": "IDR",
                        "CcyNbr": "360",
                        "CtryNm": "INDONESIA"
                    },
                    {
                        "CcyNm": "SDR (Special Drawing Right)",
                        "CcyMnrUnts": "N.A.",
                        "Ccy": "XDR",
                        "CcyNbr": "960",
                        "CtryNm": "INTERNATIONAL MONETARY FUND (IMF) "
                    },
                    {
                        "CcyNm": "Iranian Rial",
                        "CcyMnrUnts": "2",
                        "Ccy": "IRR",
                        "CcyNbr": "364",
                        "CtryNm": "IRAN (ISLAMIC REPUBLIC OF)"
                    },
                    {
                        "CcyNm": "Iraqi Dinar",
                        "CcyMnrUnts": "3",
                        "Ccy": "IQD",
                        "CcyNbr": "368",
                        "CtryNm": "IRAQ"
                    },
                    {
                        "CcyNm": "Euro",
                        "CcyMnrUnts": "2",
                        "Ccy": "EUR",
                        "CcyNbr": "978",
                        "CtryNm": "IRELAND"
                    },
                    {
                        "CcyNm": "Pound Sterling",
                        "CcyMnrUnts": "2",
                        "Ccy": "GBP",
                        "CcyNbr": "826",
                        "CtryNm": "ISLE OF MAN"
                    },
                    {
                        "CcyNm": "New Israeli Sheqel",
                        "CcyMnrUnts": "2",
                        "Ccy": "ILS",
                        "CcyNbr": "376",
                        "CtryNm": "ISRAEL"
                    },
                    {
                        "CcyNm": "Euro",
                        "CcyMnrUnts": "2",
                        "Ccy": "EUR",
                        "CcyNbr": "978",
                        "CtryNm": "ITALY"
                    },
                    {
                        "CcyNm": "Jamaican Dollar",
                        "CcyMnrUnts": "2",
                        "Ccy": "JMD",
                        "CcyNbr": "388",
                        "CtryNm": "JAMAICA"
                    },
                    {
                        "CcyNm": "Yen",
                        "CcyMnrUnts": "0",
                        "Ccy": "JPY",
                        "CcyNbr": "392",
                        "CtryNm": "JAPAN"
                    },
                    {
                        "CcyNm": "Pound Sterling",
                        "CcyMnrUnts": "2",
                        "Ccy": "GBP",
                        "CcyNbr": "826",
                        "CtryNm": "JERSEY"
                    },
                    {
                        "CcyNm": "Jordanian Dinar",
                        "CcyMnrUnts": "3",
                        "Ccy": "JOD",
                        "CcyNbr": "400",
                        "CtryNm": "JORDAN"
                    },
                    {
                        "CcyNm": "Tenge",
                        "CcyMnrUnts": "2",
                        "Ccy": "KZT",
                        "CcyNbr": "398",
                        "CtryNm": "KAZAKHSTAN"
                    },
                    {
                        "CcyNm": "Kenyan Shilling",
                        "CcyMnrUnts": "2",
                        "Ccy": "KES",
                        "CcyNbr": "404",
                        "CtryNm": "KENYA"
                    },
                    {
                        "CcyNm": "Australian Dollar",
                        "CcyMnrUnts": "2",
                        "Ccy": "AUD",
                        "CcyNbr": "036",
                        "CtryNm": "KIRIBATI"
                    },
                    {
                        "CcyNm": "North Korean Won",
                        "CcyMnrUnts": "2",
                        "Ccy": "KPW",
                        "CcyNbr": "408",
                        "CtryNm": "KOREA (THE DEMOCRATIC PEOPLE’S REPUBLIC OF)"
                    },
                    {
                        "CcyNm": "Won",
                        "CcyMnrUnts": "0",
                        "Ccy": "KRW",
                        "CcyNbr": "410",
                        "CtryNm": "KOREA (THE REPUBLIC OF)"
                    },
                    {
                        "CcyNm": "Kuwaiti Dinar",
                        "CcyMnrUnts": "3",
                        "Ccy": "KWD",
                        "CcyNbr": "414",
                        "CtryNm": "KUWAIT"
                    },
                    {
                        "CcyNm": "Som",
                        "CcyMnrUnts": "2",
                        "Ccy": "KGS",
                        "CcyNbr": "417",
                        "CtryNm": "KYRGYZSTAN"
                    },
                    {
                        "CcyNm": "Kip",
                        "CcyMnrUnts": "2",
                        "Ccy": "LAK",
                        "CcyNbr": "418",
                        "CtryNm": "LAO PEOPLE’S DEMOCRATIC REPUBLIC (THE)"
                    },
                    {
                        "CcyNm": "Euro",
                        "CcyMnrUnts": "2",
                        "Ccy": "EUR",
                        "CcyNbr": "978",
                        "CtryNm": "LATVIA"
                    },
                    {
                        "CcyNm": "Lebanese Pound",
                        "CcyMnrUnts": "2",
                        "Ccy": "LBP",
                        "CcyNbr": "422",
                        "CtryNm": "LEBANON"
                    },
                    {
                        "CcyNm": "Loti",
                        "CcyMnrUnts": "2",
                        "Ccy": "LSL",
                        "CcyNbr": "426",
                        "CtryNm": "LESOTHO"
                    },
                    {
                        "CcyNm": "Rand",
                        "CcyMnrUnts": "2",
                        "Ccy": "ZAR",
                        "CcyNbr": "710",
                        "CtryNm": "LESOTHO"
                    },
                    {
                        "CcyNm": "Liberian Dollar",
                        "CcyMnrUnts": "2",
                        "Ccy": "LRD",
                        "CcyNbr": "430",
                        "CtryNm": "LIBERIA"
                    },
                    {
                        "CcyNm": "Libyan Dinar",
                        "CcyMnrUnts": "3",
                        "Ccy": "LYD",
                        "CcyNbr": "434",
                        "CtryNm": "LIBYA"
                    },
                    {
                        "CcyNm": "Swiss Franc",
                        "CcyMnrUnts": "2",
                        "Ccy": "CHF",
                        "CcyNbr": "756",
                        "CtryNm": "LIECHTENSTEIN"
                    },
                    {
                        "CcyNm": "Euro",
                        "CcyMnrUnts": "2",
                        "Ccy": "EUR",
                        "CcyNbr": "978",
                        "CtryNm": "LITHUANIA"
                    },
                    {
                        "CcyNm": "Euro",
                        "CcyMnrUnts": "2",
                        "Ccy": "EUR",
                        "CcyNbr": "978",
                        "CtryNm": "LUXEMBOURG"
                    },
                    {
                        "CcyNm": "Pataca",
                        "CcyMnrUnts": "2",
                        "Ccy": "MOP",
                        "CcyNbr": "446",
                        "CtryNm": "MACAO"
                    },
                    {
                        "CcyNm": "Denar",
                        "CcyMnrUnts": "2",
                        "Ccy": "MKD",
                        "CcyNbr": "807",
                        "CtryNm": "MACEDONIA (THE FORMER YUGOSLAV REPUBLIC OF)"
                    },
                    {
                        "CcyNm": "Malagasy Ariary",
                        "CcyMnrUnts": "2",
                        "Ccy": "MGA",
                        "CcyNbr": "969",
                        "CtryNm": "MADAGASCAR"
                    },
                    {
                        "CcyNm": "Kwacha",
                        "CcyMnrUnts": "2",
                        "Ccy": "MWK",
                        "CcyNbr": "454",
                        "CtryNm": "MALAWI"
                    },
                    {
                        "CcyNm": "Malaysian Ringgit",
                        "CcyMnrUnts": "2",
                        "Ccy": "MYR",
                        "CcyNbr": "458",
                        "CtryNm": "MALAYSIA"
                    },
                    {
                        "CcyNm": "Rufiyaa",
                        "CcyMnrUnts": "2",
                        "Ccy": "MVR",
                        "CcyNbr": "462",
                        "CtryNm": "MALDIVES"
                    },
                    {
                        "CcyNm": "CFA Franc BCEAO",
                        "CcyMnrUnts": "0",
                        "Ccy": "XOF",
                        "CcyNbr": "952",
                        "CtryNm": "MALI"
                    },
                    {
                        "CcyNm": "Euro",
                        "CcyMnrUnts": "2",
                        "Ccy": "EUR",
                        "CcyNbr": "978",
                        "CtryNm": "MALTA"
                    },
                    {
                        "CcyNm": "US Dollar",
                        "CcyMnrUnts": "2",
                        "Ccy": "USD",
                        "CcyNbr": "840",
                        "CtryNm": "MARSHALL ISLANDS (THE)"
                    },
                    {
                        "CcyNm": "Euro",
                        "CcyMnrUnts": "2",
                        "Ccy": "EUR",
                        "CcyNbr": "978",
                        "CtryNm": "MARTINIQUE"
                    },
                    {
                        "CcyNm": "Ouguiya",
                        "CcyMnrUnts": "2",
                        "Ccy": "MRO",
                        "CcyNbr": "478",
                        "CtryNm": "MAURITANIA"
                    },
                    {
                        "CcyNm": "Mauritius Rupee",
                        "CcyMnrUnts": "2",
                        "Ccy": "MUR",
                        "CcyNbr": "480",
                        "CtryNm": "MAURITIUS"
                    },
                    {
                        "CcyNm": "Euro",
                        "CcyMnrUnts": "2",
                        "Ccy": "EUR",
                        "CcyNbr": "978",
                        "CtryNm": "MAYOTTE"
                    },
                    {
                        "CcyNm": "ADB Unit of Account",
                        "CcyMnrUnts": "N.A.",
                        "Ccy": "XUA",
                        "CcyNbr": "965",
                        "CtryNm": "MEMBER COUNTRIES OF THE AFRICAN DEVELOPMENT BANK GROUP"
                    },
                    {
                        "CcyNm": "Mexican Peso",
                        "CcyMnrUnts": "2",
                        "Ccy": "MXN",
                        "CcyNbr": "484",
                        "CtryNm": "MEXICO"
                    },
                    {
                        "CcyNm": "Mexican Unidad de Inversion (UDI)",
                        "CcyMnrUnts": "2",
                        "Ccy": "MXV",
                        "CcyNbr": "979",
                        "CtryNm": "MEXICO"
                    },
                    {
                        "CcyNm": "US Dollar",
                        "CcyMnrUnts": "2",
                        "Ccy": "USD",
                        "CcyNbr": "840",
                        "CtryNm": "MICRONESIA (FEDERATED STATES OF)"
                    },
                    {
                        "CcyNm": "Moldovan Leu",
                        "CcyMnrUnts": "2",
                        "Ccy": "MDL",
                        "CcyNbr": "498",
                        "CtryNm": "MOLDOVA (THE REPUBLIC OF)"
                    },
                    {
                        "CcyNm": "Euro",
                        "CcyMnrUnts": "2",
                        "Ccy": "EUR",
                        "CcyNbr": "978",
                        "CtryNm": "MONACO"
                    },
                    {
                        "CcyNm": "Tugrik",
                        "CcyMnrUnts": "2",
                        "Ccy": "MNT",
                        "CcyNbr": "496",
                        "CtryNm": "MONGOLIA"
                    },
                    {
                        "CcyNm": "Euro",
                        "CcyMnrUnts": "2",
                        "Ccy": "EUR",
                        "CcyNbr": "978",
                        "CtryNm": "MONTENEGRO"
                    },
                    {
                        "CcyNm": "East Caribbean Dollar",
                        "CcyMnrUnts": "2",
                        "Ccy": "XCD",
                        "CcyNbr": "951",
                        "CtryNm": "MONTSERRAT"
                    },
                    {
                        "CcyNm": "Moroccan Dirham",
                        "CcyMnrUnts": "2",
                        "Ccy": "MAD",
                        "CcyNbr": "504",
                        "CtryNm": "MOROCCO"
                    },
                    {
                        "CcyNm": "Mozambique Metical",
                        "CcyMnrUnts": "2",
                        "Ccy": "MZN",
                        "CcyNbr": "943",
                        "CtryNm": "MOZAMBIQUE"
                    },
                    {
                        "CcyNm": "Kyat",
                        "CcyMnrUnts": "2",
                        "Ccy": "MMK",
                        "CcyNbr": "104",
                        "CtryNm": "MYANMAR"
                    },
                    {
                        "CcyNm": "Namibia Dollar",
                        "CcyMnrUnts": "2",
                        "Ccy": "NAD",
                        "CcyNbr": "516",
                        "CtryNm": "NAMIBIA"
                    },
                    {
                        "CcyNm": "Rand",
                        "CcyMnrUnts": "2",
                        "Ccy": "ZAR",
                        "CcyNbr": "710",
                        "CtryNm": "NAMIBIA"
                    },
                    {
                        "CcyNm": "Australian Dollar",
                        "CcyMnrUnts": "2",
                        "Ccy": "AUD",
                        "CcyNbr": "036",
                        "CtryNm": "NAURU"
                    },
                    {
                        "CcyNm": "Nepalese Rupee",
                        "CcyMnrUnts": "2",
                        "Ccy": "NPR",
                        "CcyNbr": "524",
                        "CtryNm": "NEPAL"
                    },
                    {
                        "CcyNm": "Euro",
                        "CcyMnrUnts": "2",
                        "Ccy": "EUR",
                        "CcyNbr": "978",
                        "CtryNm": "NETHERLANDS (THE)"
                    },
                    {
                        "CcyNm": "CFP Franc",
                        "CcyMnrUnts": "0",
                        "Ccy": "XPF",
                        "CcyNbr": "953",
                        "CtryNm": "NEW CALEDONIA"
                    },
                    {
                        "CcyNm": "New Zealand Dollar",
                        "CcyMnrUnts": "2",
                        "Ccy": "NZD",
                        "CcyNbr": "554",
                        "CtryNm": "NEW ZEALAND"
                    },
                    {
                        "CcyNm": "Cordoba Oro",
                        "CcyMnrUnts": "2",
                        "Ccy": "NIO",
                        "CcyNbr": "558",
                        "CtryNm": "NICARAGUA"
                    },
                    {
                        "CcyNm": "CFA Franc BCEAO",
                        "CcyMnrUnts": "0",
                        "Ccy": "XOF",
                        "CcyNbr": "952",
                        "CtryNm": "NIGER (THE)"
                    },
                    {
                        "CcyNm": "Naira",
                        "CcyMnrUnts": "2",
                        "Ccy": "NGN",
                        "CcyNbr": "566",
                        "CtryNm": "NIGERIA"
                    },
                    {
                        "CcyNm": "New Zealand Dollar",
                        "CcyMnrUnts": "2",
                        "Ccy": "NZD",
                        "CcyNbr": "554",
                        "CtryNm": "NIUE"
                    },
                    {
                        "CcyNm": "Australian Dollar",
                        "CcyMnrUnts": "2",
                        "Ccy": "AUD",
                        "CcyNbr": "036",
                        "CtryNm": "NORFOLK ISLAND"
                    },
                    {
                        "CcyNm": "US Dollar",
                        "CcyMnrUnts": "2",
                        "Ccy": "USD",
                        "CcyNbr": "840",
                        "CtryNm": "NORTHERN MARIANA ISLANDS (THE)"
                    },
                    {
                        "CcyNm": "Norwegian Krone",
                        "CcyMnrUnts": "2",
                        "Ccy": "NOK",
                        "CcyNbr": "578",
                        "CtryNm": "NORWAY"
                    },
                    {
                        "CcyNm": "Rial Omani",
                        "CcyMnrUnts": "3",
                        "Ccy": "OMR",
                        "CcyNbr": "512",
                        "CtryNm": "OMAN"
                    },
                    {
                        "CcyNm": "Pakistan Rupee",
                        "CcyMnrUnts": "2",
                        "Ccy": "PKR",
                        "CcyNbr": "586",
                        "CtryNm": "PAKISTAN"
                    },
                    {
                        "CcyNm": "US Dollar",
                        "CcyMnrUnts": "2",
                        "Ccy": "USD",
                        "CcyNbr": "840",
                        "CtryNm": "PALAU"
                    },
                    {
                        "CcyNm": "No universal currency",
                        "CtryNm": "PALESTINE, STATE OF"
                    },
                    {
                        "CcyNm": "Balboa",
                        "CcyMnrUnts": "2",
                        "Ccy": "PAB",
                        "CcyNbr": "590",
                        "CtryNm": "PANAMA"
                    },
                    {
                        "CcyNm": "US Dollar",
                        "CcyMnrUnts": "2",
                        "Ccy": "USD",
                        "CcyNbr": "840",
                        "CtryNm": "PANAMA"
                    },
                    {
                        "CcyNm": "Kina",
                        "CcyMnrUnts": "2",
                        "Ccy": "PGK",
                        "CcyNbr": "598",
                        "CtryNm": "PAPUA NEW GUINEA"
                    },
                    {
                        "CcyNm": "Guarani",
                        "CcyMnrUnts": "0",
                        "Ccy": "PYG",
                        "CcyNbr": "600",
                        "CtryNm": "PARAGUAY"
                    },
                    {
                        "CcyNm": "Nuevo Sol",
                        "CcyMnrUnts": "2",
                        "Ccy": "PEN",
                        "CcyNbr": "604",
                        "CtryNm": "PERU"
                    },
                    {
                        "CcyNm": "Philippine Peso",
                        "CcyMnrUnts": "2",
                        "Ccy": "PHP",
                        "CcyNbr": "608",
                        "CtryNm": "PHILIPPINES (THE)"
                    },
                    {
                        "CcyNm": "New Zealand Dollar",
                        "CcyMnrUnts": "2",
                        "Ccy": "NZD",
                        "CcyNbr": "554",
                        "CtryNm": "PITCAIRN"
                    },
                    {
                        "CcyNm": "Zloty",
                        "CcyMnrUnts": "2",
                        "Ccy": "PLN",
                        "CcyNbr": "985",
                        "CtryNm": "POLAND"
                    },
                    {
                        "CcyNm": "Euro",
                        "CcyMnrUnts": "2",
                        "Ccy": "EUR",
                        "CcyNbr": "978",
                        "CtryNm": "PORTUGAL"
                    },
                    {
                        "CcyNm": "US Dollar",
                        "CcyMnrUnts": "2",
                        "Ccy": "USD",
                        "CcyNbr": "840",
                        "CtryNm": "PUERTO RICO"
                    },
                    {
                        "CcyNm": "Qatari Rial",
                        "CcyMnrUnts": "2",
                        "Ccy": "QAR",
                        "CcyNbr": "634",
                        "CtryNm": "QATAR"
                    },
                    {
                        "CcyNm": "Euro",
                        "CcyMnrUnts": "2",
                        "Ccy": "EUR",
                        "CcyNbr": "978",
                        "CtryNm": "RÉUNION"
                    },
                    {
                        "CcyNm": "Romanian Leu",
                        "CcyMnrUnts": "2",
                        "Ccy": "RON",
                        "CcyNbr": "946",
                        "CtryNm": "ROMANIA"
                    },
                    {
                        "CcyNm": "Russian Ruble",
                        "CcyMnrUnts": "2",
                        "Ccy": "RUB",
                        "CcyNbr": "643",
                        "CtryNm": "RUSSIAN FEDERATION (THE)"
                    },
                    {
                        "CcyNm": "Rwanda Franc",
                        "CcyMnrUnts": "0",
                        "Ccy": "RWF",
                        "CcyNbr": "646",
                        "CtryNm": "RWANDA"
                    },
                    {
                        "CcyNm": "Euro",
                        "CcyMnrUnts": "2",
                        "Ccy": "EUR",
                        "CcyNbr": "978",
                        "CtryNm": "SAINT BARTHÉLEMY"
                    },
                    {
                        "CcyNm": "Saint Helena Pound",
                        "CcyMnrUnts": "2",
                        "Ccy": "SHP",
                        "CcyNbr": "654",
                        "CtryNm": "SAINT HELENA, ASCENSION AND TRISTAN DA CUNHA"
                    },
                    {
                        "CcyNm": "East Caribbean Dollar",
                        "CcyMnrUnts": "2",
                        "Ccy": "XCD",
                        "CcyNbr": "951",
                        "CtryNm": "SAINT KITTS AND NEVIS"
                    },
                    {
                        "CcyNm": "East Caribbean Dollar",
                        "CcyMnrUnts": "2",
                        "Ccy": "XCD",
                        "CcyNbr": "951",
                        "CtryNm": "SAINT LUCIA"
                    },
                    {
                        "CcyNm": "Euro",
                        "CcyMnrUnts": "2",
                        "Ccy": "EUR",
                        "CcyNbr": "978",
                        "CtryNm": "SAINT MARTIN (FRENCH PART)"
                    },
                    {
                        "CcyNm": "Euro",
                        "CcyMnrUnts": "2",
                        "Ccy": "EUR",
                        "CcyNbr": "978",
                        "CtryNm": "SAINT PIERRE AND MIQUELON"
                    },
                    {
                        "CcyNm": "East Caribbean Dollar",
                        "CcyMnrUnts": "2",
                        "Ccy": "XCD",
                        "CcyNbr": "951",
                        "CtryNm": "SAINT VINCENT AND THE GRENADINES"
                    },
                    {
                        "CcyNm": "Tala",
                        "CcyMnrUnts": "2",
                        "Ccy": "WST",
                        "CcyNbr": "882",
                        "CtryNm": "SAMOA"
                    },
                    {
                        "CcyNm": "Euro",
                        "CcyMnrUnts": "2",
                        "Ccy": "EUR",
                        "CcyNbr": "978",
                        "CtryNm": "SAN MARINO"
                    },
                    {
                        "CcyNm": "Dobra",
                        "CcyMnrUnts": "2",
                        "Ccy": "STD",
                        "CcyNbr": "678",
                        "CtryNm": "SAO TOME AND PRINCIPE"
                    },
                    {
                        "CcyNm": "Saudi Riyal",
                        "CcyMnrUnts": "2",
                        "Ccy": "SAR",
                        "CcyNbr": "682",
                        "CtryNm": "SAUDI ARABIA"
                    },
                    {
                        "CcyNm": "CFA Franc BCEAO",
                        "CcyMnrUnts": "0",
                        "Ccy": "XOF",
                        "CcyNbr": "952",
                        "CtryNm": "SENEGAL"
                    },
                    {
                        "CcyNm": "Serbian Dinar",
                        "CcyMnrUnts": "2",
                        "Ccy": "RSD",
                        "CcyNbr": "941",
                        "CtryNm": "SERBIA"
                    },
                    {
                        "CcyNm": "Seychelles Rupee",
                        "CcyMnrUnts": "2",
                        "Ccy": "SCR",
                        "CcyNbr": "690",
                        "CtryNm": "SEYCHELLES"
                    },
                    {
                        "CcyNm": "Leone",
                        "CcyMnrUnts": "2",
                        "Ccy": "SLL",
                        "CcyNbr": "694",
                        "CtryNm": "SIERRA LEONE"
                    },
                    {
                        "CcyNm": "Singapore Dollar",
                        "CcyMnrUnts": "2",
                        "Ccy": "SGD",
                        "CcyNbr": "702",
                        "CtryNm": "SINGAPORE"
                    },
                    {
                        "CcyNm": "Netherlands Antillean Guilder",
                        "CcyMnrUnts": "2",
                        "Ccy": "ANG",
                        "CcyNbr": "532",
                        "CtryNm": "SINT MAARTEN (DUTCH PART)"
                    },
                    {
                        "CcyNm": "Sucre",
                        "CcyMnrUnts": "N.A.",
                        "Ccy": "XSU",
                        "CcyNbr": "994",
                        "CtryNm": "SISTEMA UNITARIO DE COMPENSACION REGIONAL DE PAGOS \"SUCRE\""
                    },
                    {
                        "CcyNm": "Euro",
                        "CcyMnrUnts": "2",
                        "Ccy": "EUR",
                        "CcyNbr": "978",
                        "CtryNm": "SLOVAKIA"
                    },
                    {
                        "CcyNm": "Euro",
                        "CcyMnrUnts": "2",
                        "Ccy": "EUR",
                        "CcyNbr": "978",
                        "CtryNm": "SLOVENIA"
                    },
                    {
                        "CcyNm": "Solomon Islands Dollar",
                        "CcyMnrUnts": "2",
                        "Ccy": "SBD",
                        "CcyNbr": "090",
                        "CtryNm": "SOLOMON ISLANDS"
                    },
                    {
                        "CcyNm": "Somali Shilling",
                        "CcyMnrUnts": "2",
                        "Ccy": "SOS",
                        "CcyNbr": "706",
                        "CtryNm": "SOMALIA"
                    },
                    {
                        "CcyNm": "Rand",
                        "CcyMnrUnts": "2",
                        "Ccy": "ZAR",
                        "CcyNbr": "710",
                        "CtryNm": "SOUTH AFRICA"
                    },
                    {
                        "CcyNm": "No universal currency",
                        "CtryNm": "SOUTH GEORGIA AND THE SOUTH SANDWICH ISLANDS"
                    },
                    {
                        "CcyNm": "South Sudanese Pound",
                        "CcyMnrUnts": "2",
                        "Ccy": "SSP",
                        "CcyNbr": "728",
                        "CtryNm": "SOUTH SUDAN"
                    },
                    {
                        "CcyNm": "Euro",
                        "CcyMnrUnts": "2",
                        "Ccy": "EUR",
                        "CcyNbr": "978",
                        "CtryNm": "SPAIN"
                    },
                    {
                        "CcyNm": "Sri Lanka Rupee",
                        "CcyMnrUnts": "2",
                        "Ccy": "LKR",
                        "CcyNbr": "144",
                        "CtryNm": "SRI LANKA"
                    },
                    {
                        "CcyNm": "Sudanese Pound",
                        "CcyMnrUnts": "2",
                        "Ccy": "SDG",
                        "CcyNbr": "938",
                        "CtryNm": "SUDAN (THE)"
                    },
                    {
                        "CcyNm": "Surinam Dollar",
                        "CcyMnrUnts": "2",
                        "Ccy": "SRD",
                        "CcyNbr": "968",
                        "CtryNm": "SURINAME"
                    },
                    {
                        "CcyNm": "Norwegian Krone",
                        "CcyMnrUnts": "2",
                        "Ccy": "NOK",
                        "CcyNbr": "578",
                        "CtryNm": "SVALBARD AND JAN MAYEN"
                    },
                    {
                        "CcyNm": "Lilangeni",
                        "CcyMnrUnts": "2",
                        "Ccy": "SZL",
                        "CcyNbr": "748",
                        "CtryNm": "SWAZILAND"
                    },
                    {
                        "CcyNm": "Swedish Krona",
                        "CcyMnrUnts": "2",
                        "Ccy": "SEK",
                        "CcyNbr": "752",
                        "CtryNm": "SWEDEN"
                    },
                    {
                        "CcyNm": "WIR Euro",
                        "CcyMnrUnts": "2",
                        "Ccy": "CHE",
                        "CcyNbr": "947",
                        "CtryNm": "SWITZERLAND"
                    },
                    {
                        "CcyNm": "Swiss Franc",
                        "CcyMnrUnts": "2",
                        "Ccy": "CHF",
                        "CcyNbr": "756",
                        "CtryNm": "SWITZERLAND"
                    },
                    {
                        "CcyNm": "WIR Franc",
                        "CcyMnrUnts": "2",
                        "Ccy": "CHW",
                        "CcyNbr": "948",
                        "CtryNm": "SWITZERLAND"
                    },
                    {
                        "CcyNm": "Syrian Pound",
                        "CcyMnrUnts": "2",
                        "Ccy": "SYP",
                        "CcyNbr": "760",
                        "CtryNm": "SYRIAN ARAB REPUBLIC"
                    },
                    {
                        "CcyNm": "New Taiwan Dollar",
                        "CcyMnrUnts": "2",
                        "Ccy": "TWD",
                        "CcyNbr": "901",
                        "CtryNm": "TAIWAN (PROVINCE OF CHINA)"
                    },
                    {
                        "CcyNm": "Somoni",
                        "CcyMnrUnts": "2",
                        "Ccy": "TJS",
                        "CcyNbr": "972",
                        "CtryNm": "TAJIKISTAN"
                    },
                    {
                        "CcyNm": "Tanzanian Shilling",
                        "CcyMnrUnts": "2",
                        "Ccy": "TZS",
                        "CcyNbr": "834",
                        "CtryNm": "TANZANIA, UNITED REPUBLIC OF"
                    },
                    {
                        "CcyNm": "Baht",
                        "CcyMnrUnts": "2",
                        "Ccy": "THB",
                        "CcyNbr": "764",
                        "CtryNm": "THAILAND"
                    },
                    {
                        "CcyNm": "US Dollar",
                        "CcyMnrUnts": "2",
                        "Ccy": "USD",
                        "CcyNbr": "840",
                        "CtryNm": "TIMOR-LESTE"
                    },
                    {
                        "CcyNm": "CFA Franc BCEAO",
                        "CcyMnrUnts": "0",
                        "Ccy": "XOF",
                        "CcyNbr": "952",
                        "CtryNm": "TOGO"
                    },
                    {
                        "CcyNm": "New Zealand Dollar",
                        "CcyMnrUnts": "2",
                        "Ccy": "NZD",
                        "CcyNbr": "554",
                        "CtryNm": "TOKELAU"
                    },
                    {
                        "CcyNm": "Pa’anga",
                        "CcyMnrUnts": "2",
                        "Ccy": "TOP",
                        "CcyNbr": "776",
                        "CtryNm": "TONGA"
                    },
                    {
                        "CcyNm": "Trinidad and Tobago Dollar",
                        "CcyMnrUnts": "2",
                        "Ccy": "TTD",
                        "CcyNbr": "780",
                        "CtryNm": "TRINIDAD AND TOBAGO"
                    },
                    {
                        "CcyNm": "Tunisian Dinar",
                        "CcyMnrUnts": "3",
                        "Ccy": "TND",
                        "CcyNbr": "788",
                        "CtryNm": "TUNISIA"
                    },
                    {
                        "CcyNm": "Turkish Lira",
                        "CcyMnrUnts": "2",
                        "Ccy": "TRY",
                        "CcyNbr": "949",
                        "CtryNm": "TURKEY"
                    },
                    {
                        "CcyNm": "Turkmenistan New Manat",
                        "CcyMnrUnts": "2",
                        "Ccy": "TMT",
                        "CcyNbr": "934",
                        "CtryNm": "TURKMENISTAN"
                    },
                    {
                        "CcyNm": "US Dollar",
                        "CcyMnrUnts": "2",
                        "Ccy": "USD",
                        "CcyNbr": "840",
                        "CtryNm": "TURKS AND CAICOS ISLANDS (THE)"
                    },
                    {
                        "CcyNm": "Australian Dollar",
                        "CcyMnrUnts": "2",
                        "Ccy": "AUD",
                        "CcyNbr": "036",
                        "CtryNm": "TUVALU"
                    },
                    {
                        "CcyNm": "Uganda Shilling",
                        "CcyMnrUnts": "0",
                        "Ccy": "UGX",
                        "CcyNbr": "800",
                        "CtryNm": "UGANDA"
                    },
                    {
                        "CcyNm": "Hryvnia",
                        "CcyMnrUnts": "2",
                        "Ccy": "UAH",
                        "CcyNbr": "980",
                        "CtryNm": "UKRAINE"
                    },
                    {
                        "CcyNm": "UAE Dirham",
                        "CcyMnrUnts": "2",
                        "Ccy": "AED",
                        "CcyNbr": "784",
                        "CtryNm": "UNITED ARAB EMIRATES (THE)"
                    },
                    {
                        "CcyNm": "Pound Sterling",
                        "CcyMnrUnts": "2",
                        "Ccy": "GBP",
                        "CcyNbr": "826",
                        "CtryNm": "UNITED KINGDOM OF GREAT BRITAIN AND NORTHERN IRELAND (THE)"
                    },
                    {
                        "CcyNm": "US Dollar",
                        "CcyMnrUnts": "2",
                        "Ccy": "USD",
                        "CcyNbr": "840",
                        "CtryNm": "UNITED STATES MINOR OUTLYING ISLANDS (THE)"
                    },
                    {
                        "CcyNm": "US Dollar",
                        "CcyMnrUnts": "2",
                        "Ccy": "USD",
                        "CcyNbr": "840",
                        "CtryNm": "UNITED STATES OF AMERICA (THE)"
                    },
                    {
                        "CcyNm": "US Dollar (Next day)",
                        "CcyMnrUnts": "2",
                        "Ccy": "USN",
                        "CcyNbr": "997",
                        "CtryNm": "UNITED STATES OF AMERICA (THE)"
                    },
                    {
                        "CcyNm": "Uruguay Peso en Unidades Indexadas (URUIURUI)",
                        "CcyMnrUnts": "0",
                        "Ccy": "UYI",
                        "CcyNbr": "940",
                        "CtryNm": "URUGUAY"
                    },
                    {
                        "CcyNm": "Peso Uruguayo",
                        "CcyMnrUnts": "2",
                        "Ccy": "UYU",
                        "CcyNbr": "858",
                        "CtryNm": "URUGUAY"
                    },
                    {
                        "CcyNm": "Uzbekistan Sum",
                        "CcyMnrUnts": "2",
                        "Ccy": "UZS",
                        "CcyNbr": "860",
                        "CtryNm": "UZBEKISTAN"
                    },
                    {
                        "CcyNm": "Vatu",
                        "CcyMnrUnts": "0",
                        "Ccy": "VUV",
                        "CcyNbr": "548",
                        "CtryNm": "VANUATU"
                    },
                    {
                        "CcyNm": "Bolivar",
                        "CcyMnrUnts": "2",
                        "Ccy": "VEF",
                        "CcyNbr": "937",
                        "CtryNm": "VENEZUELA (BOLIVARIAN REPUBLIC OF)"
                    },
                    {
                        "CcyNm": "Dong",
                        "CcyMnrUnts": "0",
                        "Ccy": "VND",
                        "CcyNbr": "704",
                        "CtryNm": "VIET NAM"
                    },
                    {
                        "CcyNm": "US Dollar",
                        "CcyMnrUnts": "2",
                        "Ccy": "USD",
                        "CcyNbr": "840",
                        "CtryNm": "VIRGIN ISLANDS (BRITISH)"
                    },
                    {
                        "CcyNm": "US Dollar",
                        "CcyMnrUnts": "2",
                        "Ccy": "USD",
                        "CcyNbr": "840",
                        "CtryNm": "VIRGIN ISLANDS (U.S.)"
                    },
                    {
                        "CcyNm": "CFP Franc",
                        "CcyMnrUnts": "0",
                        "Ccy": "XPF",
                        "CcyNbr": "953",
                        "CtryNm": "WALLIS AND FUTUNA"
                    },
                    {
                        "CcyNm": "Moroccan Dirham",
                        "CcyMnrUnts": "2",
                        "Ccy": "MAD",
                        "CcyNbr": "504",
                        "CtryNm": "WESTERN SAHARA"
                    },
                    {
                        "CcyNm": "Yemeni Rial",
                        "CcyMnrUnts": "2",
                        "Ccy": "YER",
                        "CcyNbr": "886",
                        "CtryNm": "YEMEN"
                    },
                    {
                        "CcyNm": "Zambian Kwacha",
                        "CcyMnrUnts": "2",
                        "Ccy": "ZMW",
                        "CcyNbr": "967",
                        "CtryNm": "ZAMBIA"
                    },
                    {
                        "CcyNm": "Zimbabwe Dollar",
                        "CcyMnrUnts": "2",
                        "Ccy": "ZWL",
                        "CcyNbr": "932",
                        "CtryNm": "ZIMBABWE"
                    },
                    {
                        "CcyNm": "Bond Markets Unit European Composite Unit (EURCO)",
                        "CcyMnrUnts": "N.A.",
                        "Ccy": "XBA",
                        "CcyNbr": "955",
                        "CtryNm": "ZZ01_Bond Markets Unit European_EURCO"
                    },
                    {
                        "CcyNm": "Bond Markets Unit European Monetary Unit (E.M.U.-6)",
                        "CcyMnrUnts": "N.A.",
                        "Ccy": "XBB",
                        "CcyNbr": "956",
                        "CtryNm": "ZZ02_Bond Markets Unit European_EMU-6"
                    },
                    {
                        "CcyNm": "Bond Markets Unit European Unit of Account 9 (E.U.A.-9)",
                        "CcyMnrUnts": "N.A.",
                        "Ccy": "XBC",
                        "CcyNbr": "957",
                        "CtryNm": "ZZ03_Bond Markets Unit European_EUA-9"
                    },
                    {
                        "CcyNm": "Bond Markets Unit European Unit of Account 17 (E.U.A.-17)",
                        "CcyMnrUnts": "N.A.",
                        "Ccy": "XBD",
                        "CcyNbr": "958",
                        "CtryNm": "ZZ04_Bond Markets Unit European_EUA-17"
                    },
                    {
                        "CcyNm": "Codes specifically reserved for testing purposes",
                        "CcyMnrUnts": "N.A.",
                        "Ccy": "XTS",
                        "CcyNbr": "963",
                        "CtryNm": "ZZ06_Testing_Code"
                    },
                    {
                        "CcyNm": "The codes assigned for transactions where no currency is involved",
                        "CcyMnrUnts": "N.A.",
                        "Ccy": "XXX",
                        "CcyNbr": "999",
                        "CtryNm": "ZZ07_No_Currency"
                    },
                    {
                        "CcyNm": "Gold",
                        "CcyMnrUnts": "N.A.",
                        "Ccy": "XAU",
                        "CcyNbr": "959",
                        "CtryNm": "ZZ08_Gold"
                    },
                    {
                        "CcyNm": "Palladium",
                        "CcyMnrUnts": "N.A.",
                        "Ccy": "XPD",
                        "CcyNbr": "964",
                        "CtryNm": "ZZ09_Palladium"
                    },
                    {
                        "CcyNm": "Platinum",
                        "CcyMnrUnts": "N.A.",
                        "Ccy": "XPT",
                        "CcyNbr": "962",
                        "CtryNm": "ZZ10_Platinum"
                    },
                    {
                        "CcyNm": "Silver",
                        "CcyMnrUnts": "N.A.",
                        "Ccy": "XAG",
                        "CcyNbr": "961",
                        "CtryNm": "ZZ11_Silver"
                    }
                ]
            }
        }
    };

Polymer$0({
  _template: Polymer.html`

`,

  is: 'currency-list',

  properties: {
      raw: {
          type: Object,
          value: currencyList
      },
      labelList: {
          type: Array,
          computed: '_generateLabelList(raw)'
      }
  },

  created: function () {
      console.log(this.is + ' created');
  },

  _generateLabelList: function (raw) {
      var list = [];
      var rawList = raw.ISO_4217.CcyTbl.CcyNtry;
      var rawMap = {};
      for (var entry in rawList) {
          var item = rawList[entry];
          if (rawMap[item.Ccy]) {
              continue;
          }
          list.push({ 
              value: item.Ccy, 
              label: item.Ccy + ' (' + item.CcyNm + ')'
          });
          rawMap[item.Ccy] = true;
      }
      return list;
  }
});
