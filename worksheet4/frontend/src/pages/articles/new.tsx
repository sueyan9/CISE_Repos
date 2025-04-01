import {FormEvent, useState} from "react";

import formStyles from "../../styles/Form.module.scss";


const NewDiscussion = () => {

    const [title, setTitle] = useState("");

    const [authors, setAuthors] = useState<string[]>([]);

    const [source, setSource] = useState("");

    const [pubYear, setPubYear] = useState<number>(0);

    const [doi, setDoi] = useState("");

    const [summary, setSummary] = useState("");

    const submitNewArticle = async (event: FormEvent<HTMLFormElement>) => {

        event.preventDefault();

        // Create an object to send to the API
        const articleData = {
            title,
            authors,
            source,
            pubyear: pubYear,
            doi,
            summary,
        };

        try {
            const response = await fetch("http://localhost:3001/api/articles", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(articleData),
            });

            if (response.ok) {
                const newArticle = await response.json();
                console.log("Article successfully created", newArticle);
                // Optionally, reset form after successful submission
                setTitle("");
                setAuthors([]);
                setSource("");
                setPubYear(0);
                setDoi("");
                setSummary("");
            } else {
                console.error("Failed to create article");
            }
        } catch (error) {
            console.error("Error submitting the article:", error);
        }
    };
// Some helper methods for the authors array 


    const addAuthor = () => {

        setAuthors(authors.concat([""]));

    };


    const removeAuthor = (index: number) => {

        setAuthors(authors.filter((_, i) => i !== index));

    };


    const changeAuthor = (index: number, value: string) => {

        setAuthors(
            authors.map((oldValue, i) => {

                return index === i ? value : oldValue;

            })
        );

    };


    // Return the full form


    return (

        <div className="container">

            <h1>New Article</h1>

            <form className={formStyles.form} onSubmit={submitNewArticle}>

                <label htmlFor="title">Title:</label>

                <input

                    className={formStyles.formItem}

                    type="text"

                    name="title"

                    id="title"

                    value={title}

                    onChange={(event) => {

                        setTitle(event.target.value);

                    }}

                />


                <label htmlFor="author">Authors:</label>

                {authors.map((author, index) => {

                    return (

                        <div key={`author ${index}`} className={formStyles.arrayItem}>

                            <input

                                type="text"

                                name="author"

                                value={author}

                                onChange={(event) => changeAuthor(index, event.target.value)}

                                className={formStyles.formItem}

                            />

                            <button

                                onClick={() => removeAuthor(index)}

                                className={formStyles.buttonItem}

                                style={{marginLeft: "3rem"}}

                                type="button"

                            >
                                -

                            </button>

                        </div>

                    );

                })}

                <button

                    onClick={() => addAuthor()}

                    className={formStyles.buttonItem}

                    style={{marginLeft: "auto"}}

                    type="button"

                >

                    +

                </button>


                <label htmlFor="source">Source:</label>

                <input

                    className={formStyles.formItem}

                    type="text"

                    name="source"

                    id="source"

                    value={source}

                    onChange={(event) => {

                        setSource(event.target.value);

                    }}

                />


                <label htmlFor="pubYear">Publication Year:</label>

                <input

                    className={formStyles.formItem}

                    type="number"

                    name="pubYear"

                    id="pubYear"

                    value={pubYear}

                    onChange={(event) => {

                        const val = event.target.value;

                        if (val === "") {

                            setPubYear(0);

                        } else {

                            setPubYear(parseInt(val));

                        }

                    }}

                />


                <label htmlFor="doi">DOI:</label>

                <input

                    className={formStyles.formItem}

                    type="text"

                    name="doi"

                    id="doi"

                    value={doi}

                    onChange={(event) => {

                        setDoi(event.target.value);

                    }}

                />
                <label htmlFor="summary">Summary:</label>

                <textarea

                    className={formStyles.formTextArea}

                    name="summary"

                    value={summary}

                    onChange={(event) => setSummary(event.target.value)}

                />


                <button className={formStyles.formItem} type="submit">

                    Submit

                </button>

            </form>

        </div>

    );

};


export default NewDiscussion; 

 