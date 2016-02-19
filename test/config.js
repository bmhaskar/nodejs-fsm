module.exports = {
    graphs: {
        simple: {
            name: "simple",
            states: [
                "initial",
                "requested",
                "lent",
                "returned",
                "lost"
            ],
            transitions: {
                send_request: {
                    from: ["initial", "returned"],
                    to: "requested"
                },
                approve_request: {
                    from: ["requested"],
                    to: "lent"
                },
                return_book: {
                    from: ["lent"],
                    to: "returned"
                },
                lost_book: {
                    from: ["lent"],
                    to: "lost"
                }
            }
        }
    }
};