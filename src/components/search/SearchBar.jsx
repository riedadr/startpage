import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import "./SearchBar.css";
import { searchEngines } from "./searchEngines";

class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: "go",
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({ value: event.target.value });
    }

    render() {
        const checkQuery = (e) => {
            if (e.target.value[e.target.value.length - 1] === ":") {
                let site = e.target.value.slice(0, -1);
                this.setState({ value: site });
                e.target.value = "";
            }
        };

        const startSearch = (e) => {
            e.preventDefault();
            const form = new FormData(e.target);
            const formData = Object.fromEntries(form.entries());

            let site = formData.site;
            let query = formData.query;
            console.log(site, query);

            if (site === "") {
                console.log("sentinel", site);
                window.open("/" + query, "_self");
            } else {
                searchEngines.forEach((item) => {
                    if (item.value === site) {
                        console.log(item.label);
                        window.open(item.url + query, "_blank");
                    }
                });
            }
        };

        return (
            <div className="Searchbar">
                <form
                    className="search-form input-bar flex gap-2 p-3 bg-white dark:bg-slate-800 dark:text-white rounded-full border-2 border-solid border-accent" id={localStorage.blur ? "blurred" : ""}
                    onSubmit={startSearch}
                    autoComplete="off"
                >
                    <select
                        name="site"
                        className="bg-transparent"
                        value={this.state.value}
                        onChange={this.handleChange}
                    >
                        {searchEngines.map((item, index) => {
                            return (
                                <option key={index} value={item.value}>
                                    {item.label}
                                </option>
                            );
                        })}
                    </select>

                    <input
                        className="border-b-2 border-solid border-markup bg-transparent w-full"
                        autoFocus
                        name="query"
                        onChange={checkQuery}
                        type="text"
                        placeholder="Search ..."
                    />
                    <button className="mr-1" type="submit">
                        <FontAwesomeIcon icon={faSearch} />
                    </button>
                </form>
            </div>
        );
    }
}

export default SearchBar;
