/*
  Publication database for smshovan.com
  ------------------------------------------------------------
  Plain BibTeX. To add a paper, paste its BibTeX entry below and,
  optionally, add these extra fields:
    topic    = {hpc} | {health} | {bio}   (filter chips)
    selected = {true}                     (shown under "Selected")
    url      = {https://...}              (paper link)
    code     = {https://github.com/...}   (code link)
  Entries are sorted by year automatically.
*/
window.PUBLICATIONS_BIB = String.raw`
@article{shovan2026escherplus,
  topic={hpc},
  selected={true},
  code={https://github.com/SMShovan/ESCHER-GPU},
  title={{ESCHER+}: A GPU-Parallel Data Structure for Dynamic Hypergraphs with Applications to Triad Counting},
  author={Shovan, S M and Khanda, Arindam and Bhowmick, Sanjukta and Das, Sajal K},
  journal={IEEE Transactions on Knowledge and Data Engineering},
  year={2026},
  note={Accepted},
  publisher={IEEE}
}

@inproceedings{shovan2026hyperpath,
  topic={hpc},
  selected={true},
  title={Parallel Shortest Hyperpath Update in Large Dynamic Hypergraphs},
  url={https://www.computer.org/csdl/proceedings-article/sc-w/2026/122100c131/2lkuFZZ37zi},
  author={Khanda, Arindam and Shovan, S M and Bhowmick, Sanjukta and Das, Sajal K},
  booktitle={Proceedings of the SC '26 Workshops of the International Conference for High Performance Computing, Networking, Storage and Analysis (IA3 Workshop)},
  year={2026},
  note={Equal contribution},
  organization={IEEE}
}

@inproceedings{shovan2026dynlp,
  topic={hpc},
  selected={true},
  url={https://arxiv.org/abs/2604.06596},
  code={https://github.com/SMShovan/LabelPropagation-CUDA},
  title={{DynLP}: Parallel Dynamic Batch Update for Label Propagation in Graph-based Semi-Supervised Learning},
  author={Shovan, S M and Khanda, Arindam and Ferdous, S M and Das, Sajal K and Halappanavar, Mahantesh},
  booktitle={Proceedings of the 40th ACM International Conference on Supercomputing (ICS)},
  pages={740--751},
  year={2026},
  organization={ACM},
  eprint={2604.06596},
  archivePrefix={arXiv}
}

@inproceedings{shovan2026escher,
  topic={hpc},
  selected={true},
  url={https://arxiv.org/abs/2512.21009},
  code={https://github.com/SMShovan/ESCHER-GPU},
  title={{ESCHER}: Efficient and Scalable Hypergraph Evolution Representation with Application to Triad Counting},
  author={Shovan, S M and Khanda, Arindam and Bhowmick, Sanjukta and Das, Sajal K},
  booktitle={2026 IEEE International Parallel and Distributed Processing Symposium (IPDPS)},
  pages={377--389},
  year={2026},
  organization={IEEE},
  eprint={2512.21009},
  archivePrefix={arXiv}
}

@inproceedings{tammali2026rescue,
  topic={hpc},
  selected={true},
  title={{RESCUE}: Routing under Evolving Stochastic Congestion and Uncertain Spread in Wildfire Emergencies},
  author={Tammali, Sowjanya and Khanda, Arindam and Satpathy, Anurag and Shovan, S M and Das, Sajal K},
  booktitle={Proceedings of the 27th International Conference on Distributed Computing and Networking (ICDCN)},
  pages={168--172},
  year={2026},
  url={https://doi.org/10.1145/3772290.3772301}
}

@phdthesis{shovan2026dissertation,
  topic={hpc},
  title={Parallel Algorithms and Data Structures for Large-Scale Graph Analytics},
  author={Shovan, S M},
  school={Missouri University of Science and Technology},
  year={2026}
}

@article{shovan2025parallel,
  topic={hpc},
  selected={true},
  code={https://github.com/SMShovan/MOSP-OpenMP},
  title={Parallel Multi Objective Shortest Path Update Algorithm in Large Dynamic Networks},
  author={Shovan, S M and Khanda, Arindam and Das, Sajal K},
  journal={IEEE Transactions on Parallel and Distributed Systems},
  volume={36},
  number={5},
  pages={932--944},
  year={2025},
  publisher={IEEE}
}

@article{arafat2024accurate,
  topic={bio},
  title={Accurate Prediction of Lysine Methylation Sites Using Evolutionary and Structural-Based Information},
  author={Arafat, Md Easin and Ahmad, Md Wakil and Shovan, S M and Haq, Towhid Ul and Islam, Nazrul and Mahmud, Mufti and Kaiser, M Shamim},
  journal={Cognitive Computation},
  volume={16},
  number={3},
  pages={1300--1320},
  year={2024},
  publisher={Springer}
}

@article{gharami2024real,
  topic={health},
  title={Real-time IoT Solutions for Automating Occupational Safety in 3rd World Industries},
  author={Gharami, Kanchon and Islam, Mazharul and Barai, Anirban and Rahman, Md Asifur and Shovan, S M and Srizon, Md Azmain Yakin},
  year={2024}
}

@inproceedings{khanda2023parallel,
  topic={hpc},
  selected={true},
  code={https://github.com/SMShovan/MOSP-OpenMP},
  title={A Parallel Algorithm for Updating a Multi-Objective Shortest Path in Large Dynamic Networks},
  author={Khanda, Arindam and Shovan, S M and Das, Sajal K},
  booktitle={Proceedings of the SC'23 Workshops of the International Conference on High Performance Computing, Network, Storage, and Analysis},
  pages={739--746},
  year={2023}
}

@inproceedings{gharami2023efficient,
  topic={hpc},
  title={An Efficient Natural Merge Sort Incorporating Array Decomposition},
  author={Gharami, Kanchon and Rashid, Kazi Mehrab and Rabbi, Golam and Amin, Farhana and Shatabda, Swakkhar and Shovan, S M and Hasan, Md Al Mehedi},
  booktitle={2023 26th International Conference on Computer and Information Technology (ICCIT)},
  pages={1--6},
  year={2023},
  organization={IEEE}
}

@inproceedings{ferdousee2023propionylation,
  topic={bio},
  title={Propionylation Characterization Ensembling Classifiers on Varied Features},
  author={Ferdousee, Zannatul and Shovan, S M and Sharifujjaman, Md},
  booktitle={2023 26th International Conference on Computer and Information Technology (ICCIT)},
  pages={1--6},
  year={2023},
  organization={IEEE}
}

@inproceedings{shovan2022alz,
  topic={health},
  selected={true},
  title={{Alz-Sense+}: An Auto Time-Synchronized Multi-Class Algorithm for Dementia Detection},
  author={Shovan, S M and Das, Sajal K},
  booktitle={2022 18th International Conference on Mobility, Sensing and Networking (MSN)},
  pages={654--662},
  year={2022},
  organization={IEEE}
}

@article{al2022biomarker,
  topic={health},
  title={Biomarker Identification by Reversing the Learning Mechanism of an Autoencoder and Recursive Feature Elimination},
  author={Al Abir, Fuad and Shovan, S M and Hasan, Md Al Mehedi and Sayeed, Abu and Shin, Jungpil},
  journal={Molecular Omics},
  volume={18},
  number={7},
  pages={652--661},
  year={2022},
  publisher={The Royal Society of Chemistry}
}

@article{ghosh2022most,
  topic={health},
  title={Most Dominant Metabolomic Biomarkers Identification for Lung Cancer},
  author={Ghosh, Utshab Kumar and Al Abir, Fuad and Rifaat, Nahian and Shovan, S M and Sayeed, Abu and Hasan, Md Al Mehedi},
  journal={Informatics in Medicine Unlocked},
  volume={28},
  pages={100824},
  year={2022},
  publisher={Elsevier}
}

@inproceedings{shovan2022enhanced,
  topic={bio},
  title={Enhanced Characterization Performance of Propionylation PTM Utilizing Multiple Feature Fusion},
  author={Shovan, S M and Ahmed, Boshir},
  booktitle={Proceedings of the 2nd International Conference on Computing Advancements},
  pages={1--5},
  year={2022}
}

@inproceedings{mitu2022machine,
  topic={health},
  title={Machine Learning Approach to Predict Liver Disease Effectively},
  author={Mitu, Mostarina and Mondal, Md Nazrul Islam and Shovan, S M},
  booktitle={2022 4th International Conference on Electrical, Computer \& Telecommunication Engineering (ICECTE)},
  pages={127--130},
  year={2022},
  organization={IEEE}
}

@article{ahmed2021computational,
  topic={bio},
  title={Computational Identification of Multiple Lysine PTM Sites by Analyzing the Instance Hardness and Feature Importance},
  author={Ahmed, Sabit and Rahman, Afrida and Hasan, Md Al Mehedi and Ahmad, Shamim and Shovan, S M},
  journal={Scientific Reports},
  year={2021},
  publisher={Nature Portfolio}
}

@inproceedings{islam2021novel,
  topic={health},
  title={A Novel Deep Convolutional Neural Network Model for Detection of Parkinson Disease by Analysing the Spiral Drawing},
  author={Islam, Md Rakibul and Matin, Abdul and Nahiduzzaman, Md and Siddiquee, Md Saifullah and Hasnain, Fahim Md Sifnatul and Shovan, S M and Hasan, Tonmoy},
  booktitle={Proceedings of International Joint Conference on Advances in Computational Intelligence (IJCACI 2020)},
  pages={155--165},
  year={2021},
  organization={Springer Singapore}
}

@inproceedings{shovan2021improved,
  topic={bio},
  title={Improved Prediction of Glutarylation PTM Site Using Evolutionary Features with LightGBM Resolving Data Imbalance Issue},
  author={Shovan, S M and Hasan, Md Al Mehedi and Islam, Md Rabiul},
  booktitle={2021 International Conference on Information and Communication Technology for Sustainable Development (ICICT4SD)},
  pages={141--145},
  year={2021},
  organization={IEEE}
}

@inproceedings{shovan2020accurate,
  topic={bio},
  title={Accurate Prediction of Formylation PTM Site Using Multiple Feature Fusion with LightGBM Resolving Data Imbalance Issue},
  author={Shovan, S M and Hasan, Md Al Mehedi and Islam, Md Rabiul},
  booktitle={2020 23rd International Conference on Computer and Information Technology (ICCIT)},
  pages={1--6},
  year={2020},
  organization={IEEE}
}

@article{arafat2020accurately,
  topic={bio},
  title={Accurately Predicting Glutarylation Sites Using Sequential Bi-Peptide-Based Evolutionary Features},
  author={Arafat, Md Easin and Ahmad, Md Wakil and Shovan, S M and Dehzangi, Abdollah and Dipta, Shubhashis Roy and Hasan, Md Al Mehedi and Taherzadeh, Ghazaleh and Shatabda, Swakkhar and Sharma, Alok},
  journal={Genes},
  volume={11},
  number={9},
  pages={1023},
  year={2020},
  publisher={MDPI}
}

@inproceedings{ahmad2020enhanced,
  topic={bio},
  title={Enhanced Prediction of Lysine Propionylation Sites Using Bi-Peptide Evolutionary Features Resolving Data Imbalance},
  author={Ahmad, Md Wakil and Arafat, Md Easin and Shovan, S M and Uddin, Mahtab and Osama, Omar Faruq and Shatabda, Swakkhar},
  booktitle={2020 IEEE Region 10 Symposium (TENSYMP)},
  pages={1668--1671},
  year={2020},
  organization={IEEE}
}

@inproceedings{abid2020improved,
  topic={bio},
  title={Improved Identification Performance of Lysine Glycation PTM Using PSI-BLAST},
  author={Abid, Husnul and Jenny, Nusrat Jahan and Shovan, S M},
  booktitle={2020 IEEE Region 10 Symposium (TENSYMP)},
  pages={18--21},
  year={2020},
  organization={IEEE}
}

@inproceedings{shovan2019prediction,
  topic={bio},
  title={Prediction of Lysine Glycation PTM Site in Protein Using Peptide Sequence Evolution Based Features},
  author={Shovan, S M and Hasan, Md Al Mehedi},
  booktitle={2019 International Conference on Electrical, Computer and Communication Engineering (ECCE)},
  pages={1--5},
  year={2019},
  organization={IEEE}
}

@inproceedings{ahmad2019improved,
  topic={bio},
  title={Improved Performance of Lysine Glutarylation PTM Using Peptide Evolutionary Features},
  author={Ahmad, Md Wakil and Shovan, S M and Arafat, Md Easin and Sifat, Md Habibur Rahman and Hasan, Md Al Mehedi and Shatabda, Swakkhar},
  booktitle={2019 3rd International Conference on Electrical, Computer \& Telecommunication Engineering (ICECTE)},
  pages={197--200},
  year={2019},
  organization={IEEE}
}

@article{pandey2018algorithms,
  topic={hpc},
  title={Algorithms and Applications of Dynamic Network Analysis using {CANDY}},
  author={Pandey, Aashish and Khanda, Arindam and Shovan, S M and Khan, Ali Y and Norris, Boyana and Das, Sajal K and Bhowmick, Sanjukta},
  year={2018}
}
`;
