"use strict";

class Fsm {

    constructor(config, obj, graphName, state) {
        this.config = config;
        this.obj = obj;
        this.graph = this.config.graphs[graphName];

        if (!this.graph) {
            throw new ReferenceError("Graph not found");
        }
        this.state = state || this.graph.states[0];
    }

    can(transition) {
        return !!this.graph.transitions[transition] &&
            !!this.graph.transitions[transition].from.find((state) => state == this.state);
    }

    apply(transition, before, after) {
        if (!this.can(transition)) throw new Error("This transition can not be applied");
        let to = this.graph.transitions[transition].to;

        let previousState = this.state;

        if (before) {
            before(this.obj, this.state, to);
        }
        this.state = to;
        if (after) {
            after(this.obj, this.state, previousState);
        }
    }

    getNextPossibleTransitions() {
        let transitions = Object.keys(this.graph.transitions);
        return transitions.filter((transition) => transition && this.can(transition));
    }

    getCurrentState() {
        return this.state;
    }
}


module.exports = function (config, obj, graphName, state) {
    return new Fsm(config, obj, graphName, state);
};
